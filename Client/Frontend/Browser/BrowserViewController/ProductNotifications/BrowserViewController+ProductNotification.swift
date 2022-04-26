// Copyright 2020 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import BraveShared
import BraveUI
import Shared
import Data

private let log = Logger.browserLogger

// MARK: - ProductNotification

extension BrowserViewController {
  
  enum OnboardingAdBlockTracker: String, CaseIterable {
    case google
    case facebook
    case amazon
  }

  // MARK: Internal

  @objc func updateShieldNotifications() {
    // Adding slight delay here for 2 reasons
    // First the content Blocker stats will be updated in current tab
    // after receiving notification from Global Stats
    // Second the popover notification will be shown after page loaded
    DispatchQueue.main.asyncAfter(deadline: .now() + 1) { [weak self] in
      guard let self = self else { return }

      self.presentOnboardingAdblockNotifications()
      self.presentEducationalProductNotifications()
    }
  }

  private func presentOnboardingAdblockNotifications() {
    if Preferences.DebugFlag.skipEduPopups == true { return }

    var isAboutHomeUrl = false
    if let selectedTab = tabManager.selectedTab,
      let url = selectedTab.url,
      let internalURL = InternalURL(url) {
      isAboutHomeUrl = internalURL.isAboutHomeURL
    }

    guard let selectedTab = tabManager.selectedTab,
      !Preferences.General.onboardingAdblockPopoverShown.value,
      !benchmarkNotificationPresented,
      !Preferences.AppState.backgroundedCleanly.value,
      Preferences.General.isNewRetentionUser.value == true,
      !topToolbar.inOverlayMode,
      !isTabTrayActive,
      selectedTab.webView?.scrollView.isDragging == false,
      isAboutHomeUrl == false
    else {
      return
    }

    guard let onboardingList = OnboardingDisconnectList.loadFromFile() else {
      log.error("CANNOT LOAD ONBOARDING DISCONNECT LIST")
      return
    }

    var trackers = [String: [String]]()
    let urls = selectedTab.contentBlocker.blockedRequests

    for entity in onboardingList.entities {
      for url in urls {
        let domain = url.baseDomain ?? url.host ?? url.schemelessAbsoluteString
        let resources = entity.value.resources.filter({ $0 == domain })

        if !resources.isEmpty {
          trackers[entity.key] = resources
        } else {
          trackers[domain] = [domain]
        }
      }
    }

    if !trackers.isEmpty, let url = selectedTab.url {
      let domain = url.baseDomain ?? url.host ?? url.schemelessAbsoluteString
      
      let firstTracker = trackers.popFirst()
      let trackerCount = ((firstTracker?.value.count ?? 0) - 1) + trackers.reduce(0, { res, values in
          res + values.value.count
      })
      
      if trackerCount >= 10, !url.isSearchEngineURL {
        let displayTrackers = fetchBigTechAdBlockTrackers(trackers: trackers)
        
        notifyTrackersBlocked(domain: domain, displayTrackers: displayTrackers, trackerCount: trackerCount)
        Preferences.General.onboardingAdblockPopoverShown.value = true
      }
    }
  }
  
  private func fetchBigTechAdBlockTrackers(trackers: [String: [String]]) -> [OnboardingAdBlockTracker] {
    var existingBigTechTrackers: [OnboardingAdBlockTracker] = []
    
    for adBlockTracker in OnboardingAdBlockTracker.allCases {
      let bigTechTrackerKey = trackers.first(where: { return $0.key.lowercased().contains(adBlockTracker.rawValue) })
      
      if bigTechTrackerKey != nil {
        existingBigTechTrackers.append(adBlockTracker)
      }
    }
    
    return existingBigTechTrackers
  }

  private func presentEducationalProductNotifications() {
    if Preferences.DebugFlag.skipEduPopups == true { return }

    var isAboutHomeUrl = false
    if let selectedTab = tabManager.selectedTab,
      let url = selectedTab.url,
      let internalURL = InternalURL(url) {
      isAboutHomeUrl = internalURL.isAboutHomeURL
    }

    guard let selectedTab = tabManager.selectedTab,
      presentedViewController == nil,
      !benchmarkNotificationPresented,
      !isOnboardingOrFullScreenCalloutPresented,
      !Preferences.AppState.backgroundedCleanly.value,
      !topToolbar.inOverlayMode,
      !isTabTrayActive,
      selectedTab.webView?.scrollView.isDragging == false,
      isAboutHomeUrl == false
    else {
      return
    }

    // Data Saved Pop-Over only exist in JP locale
    if Locale.current.regionCode == "JP" {
      if !benchmarkNotificationPresented,
        !Preferences.ProductNotificationBenchmarks.showingSpecificDataSavedEnabled.value {
        guard let currentURL = selectedTab.url,
          DataSaved.get(with: currentURL.absoluteString) == nil,
          let domainFetchedSiteSavings = benchmarkBlockingDataSource?.fetchDomainFetchedSiteSavings(currentURL)
        else {
          return
        }

        notifyDomainSpecificDataSaved(domainFetchedSiteSavings)

        DataSaved.insert(
          savedUrl: currentURL.absoluteString,
          amount: domainFetchedSiteSavings)
        return
      }
    }
  }

  private func notifyDomainSpecificDataSaved(_ dataSaved: String) {
    let shareTrackersViewController = ShareTrackersController(trackingType: .domainSpecificDataSaved(dataSaved: dataSaved))
    dismiss(animated: true)

    shareTrackersViewController.actionHandler = { [weak self] action in
      guard let self = self, action == .dontShowAgainTapped else { return }

      Preferences.ProductNotificationBenchmarks.showingSpecificDataSavedEnabled.value = true
      self.dismiss(animated: true)
    }

    showBenchmarkNotificationPopover(controller: shareTrackersViewController)
  }

  private func showBenchmarkNotificationPopover(controller: (UIViewController & PopoverContentComponent)) {
    benchmarkNotificationPresented = true

    let popover = PopoverController(contentController: controller, contentSizeBehavior: .autoLayout)
    popover.addsConvenientDismissalMargins = false
    popover.present(from: topToolbar.locationView.shieldsButton, on: self)

    let pulseAnimation = RadialPulsingAnimation(ringCount: 3)
    pulseAnimation.present(
      icon: topToolbar.locationView.shieldsButton.imageView?.image,
      from: topToolbar.locationView.shieldsButton,
      on: popover,
      browser: self)
    popover.popoverDidDismiss = { _ in
      pulseAnimation.removeFromSuperview()
    }
  }
}
