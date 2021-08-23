// Copyright 2021 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Foundation
import BraveShared
import BraveUI

class NoPreviewTableViewController: UITableViewController {
    
    private let requiresAuthentication: Bool
    
    
    // MARK: Lifecycle
    
    init(requiresAuthentication: Bool = false) {
        self.requiresAuthentication = requiresAuthentication
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        guard requiresAuthentication, let appDelegate = (UIApplication.shared.delegate as? AppDelegate) else {
            return
        }

        if Preferences.Privacy.lockWithPasscode.value {
            appDelegate.windowProtection?.presentAuthenticationForViewController()
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        NotificationCenter.default.do {
            $0.addObserver(self, selector: #selector(removeBackgroundedBlur),
                           name: UIApplication.willEnterForegroundNotification, object: nil)
            $0.addObserver(self, selector: #selector(removeBackgroundedBlur),
                           name: UIApplication.didBecomeActiveNotification, object: nil)
            $0.addObserver(self, selector: #selector(blurContents),
                           name: UIApplication.willResignActiveNotification, object: nil)
            $0.addObserver(self, selector: #selector(blurContents),
                           name: UIApplication.didEnterBackgroundNotification, object: nil)
        }
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    // MARK: Private
    
    private var blurredSnapshotView: UIView?

    @objc private func blurContents() {
        if blurredSnapshotView == nil {
            blurredSnapshotView = createBlurredContentView()
        }
    }

    @objc private func removeBackgroundedBlur() {
        blurredSnapshotView?.removeFromSuperview()
        blurredSnapshotView = nil
    }

    private func createBlurredContentView() -> UIView? {
        guard let snapshot = view.screenshot() else {
            return nil
        }
        
        let blurContentView = UIView(frame: view.frame)
        view.addSubview(blurContentView)
        blurContentView.snp.makeConstraints { $0.edges.equalToSuperview() }

        // Snapshot View
        let snapshotImageView = UIImageView(image: snapshot)
        blurContentView.addSubview(snapshotImageView)
        snapshotImageView.snp.makeConstraints { $0.edges.equalToSuperview() }
        
        // Blur Visual Effect View
        let blurVisualEffectView = UIVisualEffectView(effect: UIBlurEffect(style: .systemUltraThinMaterialDark))

        blurContentView.addSubview(blurVisualEffectView)
        blurVisualEffectView.snp.makeConstraints { $0.edges.equalToSuperview() }
        
        view.layoutIfNeeded()

        return blurContentView
    }
}
