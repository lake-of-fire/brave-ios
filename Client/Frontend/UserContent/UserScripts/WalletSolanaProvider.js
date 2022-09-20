// Copyright 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

(function($Object) {
  if (window.isSecureContext) {
    function post(method, payload, completion) {
      return new Promise((resolve, reject) => {
        webkit.messageHandlers.$<handler>.postMessage({
          "securitytoken": "$<security_token>",
          "method": method,
          "args": JSON.stringify(payload)
        })
        .then(
            (result) => {
              if (completion == undefined) {
                resolve(result);
              } else {
                completion(result, resolve);
              }
            },
            (errorJSON) => {
              /* remove `Error: ` prefix. errorJSON=`Error: {code: 1, errorMessage: "Internal error"}` */
              const errorJSONString = new String(errorJSON);
              const errorJSONStringSliced = errorJSONString.slice(errorJSONString.indexOf('{'));
              try {
                reject(JSON.parse(errorJSONStringSliced))
              } catch(e) {
                reject(errorJSON)
              }
            }
          )
      })
    }
    /* <solanaWeb3.Transaction> ->
      {transaction: <solanaWeb3.Transaction>,
       serializedMessage: <base58 encoded string>,
       signatures: [{publicKey: <base58 encoded string>, signature: <Buffer>}]} */
    function convertTransaction(transaction) {
      const serializedMessage = transaction.serializeMessage();
      const signatures = transaction.signatures;
      function convertSignaturePubkeyPair(signaturePubkeyPair) {
        const obj = new Object();
        obj.publicKey = signaturePubkeyPair.publicKey.toBase58();
        obj.signature = signaturePubkeyPair.signature;
        return obj;
      }
      const signaturesMapped = signatures.map(convertSignaturePubkeyPair);
      const object = new Object();
      object.transaction = transaction;
      object.serializedMessage = serializedMessage;
      object.signatures = signaturesMapped;
      return object;
    }
    const provider = {
      value: {
        /* Properties */
        isPhantom: true,
        isBraveWallet: true,
        isConnected: false,
        publicKey: null,
        /* Methods */
        connect: function(payload) { /* -> {publicKey: solanaWeb3.PublicKey} */
          function completion(publicKey, resolve) {
            /* convert `<base58 encoded string>` -> `{publicKey: <solanaWeb3.PublicKey>}` */
            const result = new Object();
            result.publicKey = window._brave_solana.createPublickey(publicKey);
            resolve(result);
          }
          return post('connect', payload, completion)
        },
        disconnect: function(payload) { /* -> Promise<{}> */
          return post('disconnect', payload)
        },
        signAndSendTransaction: function(...payload) { /* -> Promise<{publicKey: <base58 encoded string>, signature: <base58 encoded string>}> */
          const object = convertTransaction(payload[0]);
          object.sendOptions = payload[1];
          return post('signAndSendTransaction', object)
        },
        signMessage: function(...payload) { /* -> Promise{publicKey: <solanaWeb3.PublicKey>, signature: <Uint8Array>}> */
          function completion(result, resolve) {
            /* convert `{publicKey: <base58 encoded string>, signature: <[UInt8]>}}` ->
             `{publicKey: <solanaWeb3.PublicKey>, signature: <Uint8Array>}` */
            const parsed = JSON.parse(result);
            const publicKey = parsed["publicKey"]; /* base58 encoded pubkey */
            const signature = parsed["signature"]; /* array of uint8 */
            const obj = new Object();
            obj.publicKey = window._brave_solana.createPublickey(publicKey);
            obj.signature = new Uint8Array(signature);
            resolve(obj);
          }
          return post('signMessage', payload, completion)
        },
        request: function(args) /* -> Promise<unknown> */  {
          if (args["method"] == 'connect') {
            function completion(publicKey, resolve) {
              /* convert `<base58 encoded string>` -> `{publicKey: <solanaWeb3.PublicKey>}` */
              const result = new Object();
              result.publicKey = window._brave_solana.createPublickey(publicKey);
              resolve(result);
            }
            return post('request', args, completion)
          }
          return post('request', args)
        },
        /* Deprecated */
        signTransaction: function(transaction) { /* -> Promise<solanaWeb3.Transaction> */
          const object = convertTransaction(transaction);
          function completion(serializedTx, resolve) {
            /* Convert `<[UInt8]>` -> `solanaWeb3.Transaction` */
            const result = window._brave_solana.createTransaction(serializedTx);
            resolve(result);
          }
          return post('signTransaction', object, completion)
        },
        /* Deprecated */
        signAllTransactions: function(transactions) { /* -> Promise<[solanaWeb3.Transaction]> */
          const objects = transactions.map(convertTransaction);
          function completion(serializedTxs, resolve) {
            /* Convert `<[[UInt8]]>` -> `[<solanaWeb3.Transaction>]` */
            const result = serializedTxs.map(window._brave_solana.createTransaction);
            resolve(result);
          }
          return post('signAllTransactions', objects, completion)
        },
      }
    }
    $Object.defineProperty(window, 'solana', provider);
    $Object.defineProperty(window, 'braveSolana', provider);
    $Object.defineProperty(window, '_brave_solana', {
      value: {},
      writable: false
    });
  }
})(Object);