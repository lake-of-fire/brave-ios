// Copyright 2021 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import UIKit
import Shared
import BraveShared
import Storage
import Data

private let log = Logger.browserLogger

class LoginInfoViewController: NoPreviewTableViewController {
    
    // MARK: UX
    
    struct UX {
        static let headerHeight: CGFloat = 44
    }
    
    // MARK: Constants
    
    struct Constants {
        static let saveLoginsRowIdentifier = "saveLoginsRowIdentifier"
        static let showInMenuRowIdentifier = "showInMenuRowIdentifier"
    }
    
    // MARK: Section
    
    enum Section: Int, CaseIterable {
        case options
        case savedLogins
    }
    
    // MARK: OptionsType
    
    enum OptionsType: Int, CaseIterable {
        case suggestions
        case recentSearches
    }
    
    // MARK: Private
    
    private let profile: Profile
    private var loginEntries = [Login]()
    private var isFetchingLoginEntries: Bool = false
    private var searchLoginTimer: Timer?

    private let searchController = UISearchController(searchResultsController: nil)
    
    // MARK: Lifecycle
    
    init(profile: Profile) {
        self.profile = profile
        super.init(requiresAuthentication: true)
        
        fetchLoginInfo()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        navigationItem.title = "Logins & Passwords"

        tableView.do {
            $0.accessibilityIdentifier = "Logins Passwords List"
            $0.allowsSelectionDuringEditing = true
            $0.registerHeaderFooter(SettingsTableSectionHeaderFooterView.self)
            $0.register(UITableViewCell.self, forCellReuseIdentifier: Constants.saveLoginsRowIdentifier)
            $0.register(UITableViewCell.self, forCellReuseIdentifier: Constants.showInMenuRowIdentifier)
            $0.register(TwoLineTableViewCell.self)
        }
        
        searchController.do {
            $0.searchBar.autocapitalizationType = .none
            $0.searchResultsUpdater = self
            $0.obscuresBackgroundDuringPresentation = false
            $0.searchBar.placeholder = "Filter"
            $0.delegate = self
            $0.hidesNavigationBarDuringPresentation = true
        }

        navigationItem.hidesSearchBarWhenScrolling = false
        navigationItem.searchController = searchController
        definesPresentationContext = true

        // Insert Done button if being presented outside of the Settings Nav stack
        if navigationController?.viewControllers.first === self {
            navigationItem.leftBarButtonItem =
                UIBarButtonItem(title: Strings.settingsSearchDoneButton, style: .done, target: self, action: #selector(dismissAnimated))
        }
        
        self.navigationItem.rightBarButtonItem = editButtonItem

        let footer = SettingsTableSectionHeaderFooterView(frame: CGRect(width: tableView.bounds.width, height: UX.headerHeight))
        tableView.tableFooterView = footer
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        tableView.endEditing(true)
    }
    
    // MARK: Internal
    
    private func fetchLoginInfo(_ searchQuery: String? = nil) {
        guard !isFetchingLoginEntries else {
            return
        }
        
        isFetchingLoginEntries = true
        
        if let query = searchQuery {
            profile.logins.getLoginsForQuery(query) >>== { [weak self] results in
                self?.reloadEntries(results: results)
            }
        } else {
            profile.logins.getAllLogins() >>== { [weak self] results in
                self?.reloadEntries(results: results)
            }
        }
    }
    
    private func reloadEntries(results: Cursor<Login>) {
        loginEntries = results.asArray()
        DispatchQueue.main.async {
            self.tableView.reloadData()
            self.isFetchingLoginEntries = false
        }
    }
}

// MARK: TableViewDataSource - TableViewDelegate

extension LoginInfoViewController {
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return Section.allCases.count
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == Section.options.rawValue {
            return OptionsType.allCases.count
        } else {
            return loginEntries.count
        }
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        if indexPath.section == Section.options.rawValue, searchController.isActive || tableView.isEditing {
            return 0
        }
        return UITableView.automaticDimension
    }
    
    override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        if section == Section.savedLogins.rawValue {
            return UX.headerHeight
        }
        
        return .zero
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        if indexPath.section == Section.options.rawValue {
            var cell: UITableViewCell?
            switch indexPath.item {
                case OptionsType.suggestions.rawValue:
                    let toggle = UISwitch().then {
                        $0.addTarget(self, action: #selector(didToggleSaveLogins), for: .valueChanged)
                        $0.isOn = Preferences.General.saveLogins.value
                    }
                    
                    cell = tableView.dequeueReusableCell(withIdentifier: Constants.saveLoginsRowIdentifier, for: indexPath).then {
                        $0.textLabel?.text = Strings.saveLogins
                        $0.accessoryView = toggle
                        $0.selectionStyle = .none
                    }
                case OptionsType.recentSearches.rawValue:
                    let toggle = UISwitch().then {
                        $0.addTarget(self, action: #selector(didToggleShowInsideApplicationMenu), for: .valueChanged)
                        $0.isOn = Preferences.General.showPasswordsInApplicationMenu.value
                    }
                    
                    cell = tableView.dequeueReusableCell(withIdentifier: Constants.showInMenuRowIdentifier, for: indexPath).then {
                        $0.textLabel?.text = "Show in Application Menu"
                        $0.accessoryView = toggle
                        $0.selectionStyle = .none
                    }
                default:
                    // Should not happen.
                    break
            }
            
            guard let currentCell = cell else { return UITableViewCell() }
            currentCell.separatorInset = .zero

            return currentCell

        } else {
            let loginInfo = loginEntries[indexPath.item]
            
            let cell = tableView.dequeueReusableCell(for: indexPath) as TwoLineTableViewCell
            
            cell.do {
                $0.selectionStyle = .none
                $0.accessoryType = .disclosureIndicator

                $0.setLines(loginInfo.hostname, detailText: loginInfo.username)
                $0.imageView?.contentMode = .scaleAspectFit
                $0.imageView?.image = FaviconFetcher.defaultFaviconImage
                $0.imageView?.layer.borderColor = BraveUX.faviconBorderColor.cgColor
                $0.imageView?.layer.borderWidth = BraveUX.faviconBorderWidth
                $0.imageView?.layer.cornerRadius = 6
                $0.imageView?.layer.cornerCurve = .continuous
                $0.imageView?.layer.masksToBounds = true
            }
                      
            if let loginHostnameURL = URL(string: loginInfo.hostname) {
                let domain = Domain.getOrCreate(forUrl: loginHostnameURL, persistent: true)
                
                cell.imageView?.loadFavicon(
                    for: loginHostnameURL,
                    domain: domain,
                    fallbackMonogramCharacter: loginHostnameURL.baseDomain?.first,
                    shouldClearMonogramFavIcon: false,
                    cachedOnly: true)
            } else {
                cell.imageView?.clearMonogramFavicon()
                cell.imageView?.image = FaviconFetcher.defaultFaviconImage
            }
            
            return cell
        }
    }
    
    override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let headerView = tableView.dequeueReusableHeaderFooter() as SettingsTableSectionHeaderFooterView
        headerView.titleLabel.text = "Saved Logins"
        
        return headerView
    }

    override func tableView(_ tableView: UITableView, willSelectRowAt indexPath: IndexPath) -> IndexPath? {
        if indexPath.section == Section.savedLogins.rawValue, let loginEntry = loginEntries[safe: indexPath.row] {
            let loginDetailsViewController = LoginDetailsViewController(profile: profile, loginEntry: loginEntry)
            navigationController?.pushViewController(loginDetailsViewController, animated: true)
        }
        
        return nil
    }

    // Determine whether to show delete button in edit mode
    override func tableView(_ tableView: UITableView, editingStyleForRowAt indexPath: IndexPath) -> UITableViewCell.EditingStyle {
        guard indexPath.section == Section.savedLogins.rawValue else {
            return .none
        }
        
        return .delete
    }

    // Determine whether to indent while in edit mode for deletion
    override func tableView(_ tableView: UITableView, shouldIndentWhileEditingRowAt indexPath: IndexPath) -> Bool {
        return indexPath.section == Section.savedLogins.rawValue
    }

    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            guard let loginItem = loginEntries[safe: indexPath.row] else { return }
            
            let success = profile.logins.removeLoginByGUID(loginItem.guid)
            
            success.upon { result in
                if result.isSuccess {
                    self.fetchLoginInfo()
                } else {
                    log.error("Error while deleting a login entry")
                }
            }
        }
    }
    
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        return indexPath.section == Section.savedLogins.rawValue
    }
}

// MARK: - Actions

extension LoginInfoViewController {
    
    @objc func didToggleSaveLogins(_ toggle: UISwitch) {
        Preferences.General.saveLogins.value = toggle.isOn
    }
    
    @objc func didToggleShowInsideApplicationMenu(_ toggle: UISwitch) {
        Preferences.General.showPasswordsInApplicationMenu.value = toggle.isOn
    }

    @objc func dismissAnimated() {
        self.dismiss(animated: true, completion: nil)
    }
}

// MARK: UISearchResultUpdating

extension LoginInfoViewController: UISearchResultsUpdating {
    
    func updateSearchResults(for searchController: UISearchController) {
        guard let query = searchController.searchBar.text else { return }

        if searchLoginTimer != nil {
            searchLoginTimer?.invalidate()
            searchLoginTimer = nil
        }
        
        // Reschedule the search result fetch: in 0.05 second bot to overload the database fetch
        searchLoginTimer =
            Timer.scheduledTimer(timeInterval: 0.1, target: self, selector: #selector(fetchSearchResults(timer:)), userInfo: query, repeats: false)
    }
    
    @objc private func fetchSearchResults(timer: Timer) {
        guard let query = timer.userInfo as? String else {
            return
        }
        
        fetchLoginInfo(query)
    }
}

// MARK: UISearchControllerDelegate

extension LoginInfoViewController: UISearchControllerDelegate {
    
    func willPresentSearchController(_ searchController: UISearchController) {
        tableView.reloadData()
    }
    
    func willDismissSearchController(_ searchController: UISearchController) {
        tableView.reloadData()
    }
}
