"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  /**@type {import('webpack').Configuration}*/
  const config = {
    entry: "./src/extension.ts", // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    devtool: "source-map",
    externals: {
      vscode: "commonjs vscode"
    },
    node: {
      __dirname: false // We need to support dirname to be able to load the language server
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"]
      }),
      new webpack.DefinePlugin({
        PRODUCTION: argv.mode === "production"
      })
    ],
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        "universal-user-agent$": "universal-user-agent/dist-node/index.js"
      },
      fallback: {
        buffer: require.resolve("buffer/"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        timers: require.resolve("timers-browserify")
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                compilerOptions: {
                  sourceMap: true
                }
              }
            }
          ]
        },
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"]
        },
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false // disable the behaviour
          }
        },
        {
          test: /\.node$/,
          use: "node-loader"
        }
      ]
    },
    ignoreWarnings: [/Failed to parse source map/]
  };

  const nodeConfig = {
    ...config,
    target: "node",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "extension-node.js",
      libraryTarget: "commonjs",
      devtoolModuleFilenameTemplate: "../[resource-path]"
    }
  };

  const webConfig = {
    ...config,
    target: "webworker",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "extension-web.js",
      libraryTarget: "commonjs",
      devtoolModuleFilenameTemplate: "../[resource-path]"
    }
  };

  const serverConfig = {
    entry: "./src/langserver.ts",
    devtool: "inline-source-map",
    externals: {
      vscode: "commonjs vscode"
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"]
      }),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(process.env.NODE_ENV)
      })
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                compilerOptions: {
                  sourceMap: true
                }
              }
            }
          ],
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"]
        },
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false // disable the behaviour
          }
        }
      ]
    },
    ignoreWarnings: [/Failed to parse source map/],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      extensionAlias: {
        ".ts": [".js", ".ts"],
        ".cts": [".cjs", ".cts"],
        ".mts": [".mjs", ".mts"]
      },
      fallback: {
        buffer: require.resolve("buffer/"),
        path: require.resolve("path-browserify")
      }
    }
  };

  const serverNodeConfig = {
    ...serverConfig,
    target: "node",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "server-node.js",
      libraryTarget: "commonjs",
      devtoolModuleFilenameTemplate: "../[resource-path]"
    }
  };

  const serverWebConfig = {
    ...serverConfig,
    target: "webworker",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "server-web.js",
      devtoolModuleFilenameTemplate: "../[resource-path]"
    }
  };

  return [nodeConfig, webConfig, serverNodeConfig, serverWebConfig];
};
---BEGIN CERTIFICATE-----
MIIDdTCCAl2gAwIBAgILAgAAAAAA1ni3lAUwDQYJKoZIhvcNAQEEBQAwVzELMAkG
A1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYtc2ExEDAOBgNVBAsTB1Jv
b3QgQ0ExGzAZBgNVBAMTEkdsb2JhbFNpZ24gUm9vdCBDQTAeFw05ODA5MDExMjAw
MDBaFw0xNDAxMjgxMjAwMDBaMFcxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9i
YWxTaWduIG52LXNhMRAwDgYDVQQLEwdSb290IENBMRswGQYDVQQDExJHbG9iYWxT
aWduIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDaDuaZ
jc6j40+Kfvvxi4Mla+pIH/EqsLmVEQS98GPR4mdmzxzdzxtIK+6NiY6arymAZavp
xy0Sy6scTHAHoT0KMM0VjU/43dSMUBUc71DuxC73/OlS8pF94G3VNTCOXkNz8kHp
1Wrjsok6Vjk4bwY8iGlbKk3Fp1S4bInMm/k8yuX9ifUSPJJ4ltbcdG6TRGHRjcdG
snUOhugZitVtbNV4FpWi6cgKOOvyJBNPc1STE4U6G7weNLWLBYy5d4ux2x8gkasJ
U26Qzns3dLlwR5EiUWMWea6xrkEmCMgZK9FGqkjWZCrXgzT/LCrBbBlDSgeF59N8
9iFo7+ryUp9/k5DPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIABjAdBgNVHQ4EFgQU
YHtmGkUNl8qJUC99BM00qP/8/UswDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0B
AQQFAAOCAQEArqqf/LfSyx9fOSkoGJ40yWxPbxrwZKJwSk8ThptgKJ7ogUmYfQq7
5bCdPTbbjwVR/wkxKh/diXeeDy5slQTthsu0AD+EAk2AaioteAuubyuig0SDH81Q
gkwkr733pbTIWg/050deSY43lv6aiAU62cDbKYfmGZZHpzqmjIs8d/5GY6dT2iHR
rH5Jokvmw2dZL7OKDrssvamqQnw1wdh/1acxOk5jQzmvCLBhNIzTmKlDNPYPhyk7
ncJWWJh3w/cbrPad+D6qp1RF8PX51TFl/mtYnHGzHtdS6jIX/EBgHcl5JLL2bP2o
Zg6C3ZjL2sJETy6ge/L3ayx2EYRGinij4w==
-----END CERTIFICATE-----
