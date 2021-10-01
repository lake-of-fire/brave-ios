// Copyright 2021 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import Foundation
import BraveCore

#if DEBUG

extension WalletStore {
  static var previewStore: WalletStore {
    .init(
      keyringController: TestKeyringController(),
      rpcController: TestEthJsonRpcController(),
      walletService: TestBraveWalletService(),
      assetRatioController: TestAssetRatioController(),
      swapController: TestSwapController(),
      tokenRegistry: TestTokenRegistry(),
      transactionController: TestEthTxController()
    )
  }
}

extension NetworkStore {
  static var previewStore: NetworkStore {
    .init(
      rpcController: TestEthJsonRpcController()
    )
  }
}

extension KeyringStore {
  static var previewStore: KeyringStore {
    .init(keyringController: TestKeyringController())
  }
  static var previewStoreWithWalletCreated: KeyringStore {
    let store = KeyringStore(keyringController: TestKeyringController())
    store.createWallet(password: "password")
    return store
  }
}

class TestAssetRatioController: BraveWalletAssetRatioController {
  private let assets: [String: BraveWallet.AssetPrice] = [
    "eth": .init(fromAsset: "eth", toAsset: "usd", price: "3059.99", assetTimeframeChange: "-57.23"),
    "bat": .init(fromAsset: "bat", toAsset: "usd", price: "0.627699", assetTimeframeChange: "-0.019865"),
  ]
  func price(_ fromAssets: [String], toAssets: [String], timeframe: BraveWallet.AssetPriceTimeframe, completion: @escaping (Bool, [BraveWallet.AssetPrice]) -> Void) {
    let prices = assets.filter { (key, value) in
      fromAssets.contains(where: { key == $0 })
    }
    completion(!prices.isEmpty, Array(prices.values))
  }
  func priceHistory(_ asset: String, timeframe: BraveWallet.AssetPriceTimeframe, completion: @escaping (Bool, [BraveWallet.AssetTimePrice]) -> Void) {
//    completion(true, assets)
  }
}

class TestSwapController: BraveWalletSwapController {
  func priceQuote(_ params: BraveWallet.SwapParams, completion: @escaping (Bool, BraveWallet.SwapResponse) -> Void) {
    completion(false, .init())
  }
  func transactionPayload(_ params: BraveWallet.SwapParams, completion: @escaping (Bool, BraveWallet.SwapResponse) -> Void) {
    completion(false, .init())
  }
}

class TestEthTxController: BraveWalletEthTxController {
  func addUnapprovedTransaction(_ txData: BraveWallet.TxData, from: String, completion: @escaping (Bool, String, String) -> Void) {
  }
  
  func addUnapproved1559Transaction(_ txData: BraveWallet.TxData1559, from: String, completion: @escaping (Bool, String, String) -> Void) {
  }
  
  func approveTransaction(_ txMetaId: String, completion: @escaping (Bool) -> Void) {
  }

  func rejectTransaction(_ txMetaId: String, completion: @escaping (Bool) -> Void) {
  }
  
  func setGasPriceAndLimitForUnapprovedTransaction(_ txMetaId: String, gasPrice: String, gasLimit: String, completion: @escaping (Bool) -> Void) {
  }
  
  func makeErc20TransferData(_ toAddress: String, amount: String, completion: @escaping (Bool, [NSNumber]) -> Void) {
  }
  
  func makeErc20ApproveData(_ spenderAddress: String, amount: String, completion: @escaping (Bool, [NSNumber]) -> Void) {
  }
  
  func allTransactionInfo(_ from: String, completion: @escaping ([BraveWallet.TransactionInfo]) -> Void) {
  }
  
  func add(_ observer: BraveWalletEthTxControllerObserver) {
  }
}

#endif