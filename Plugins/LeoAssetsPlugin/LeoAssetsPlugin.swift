// Copyright 2023 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import PackagePlugin
import Foundation

/// Creates an asset catalog filled with Brave's Leo SF Symbols
@main
struct LeoAssetsPlugin: BuildToolPlugin {
  
  func createBuildCommands(context: PluginContext, target: Target) async throws -> [Command] {
    // Check to make sure we have pulled down the icons correctly
    let fileManager = FileManager.default
    if !fileManager.fileExists(atPath: "./node_modules/leo-sf-symbols") {
      Diagnostics.error("Leo SF Symbols not found: \(FileManager.default.currentDirectoryPath)")
      return []
    }
    
    // Check to make sure the plugin is being used correctly in SPM
    guard let target = target as? SourceModuleTarget else {
      Diagnostics.error("Attempted to use `LeoAssetsPlugin` on an unsupported module target")
      return []
    }
    
    let assetCatalogs = Array(target.sourceFiles(withSuffix: "xcassets").map(\.path))
    if assetCatalogs.isEmpty {
      Diagnostics.error("No asset catalogs found in the target")
      return []
    }
    
    let outputDirectory = context.pluginWorkDirectory.appending(subpath: "LeoAssets.xcassets")
    
    Diagnostics.remark("📦 Leo asset catalog: \(outputDirectory.string)")
    
    return [
      .buildCommand(
        displayName: "Create Asset Catalog",
        executable: try context.tool(named: "LeoAssetCatalogGenerator").path,
        arguments: assetCatalogs + [outputDirectory.string],
        inputFiles: assetCatalogs + [context.package.directory.appending("node_modules/leo-sf-symbols/package.json")],
        outputFiles: [outputDirectory]
      ),
    ]
  }
}
