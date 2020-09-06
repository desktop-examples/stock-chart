const webpack = require("webpack");
const { merge } = require("webpack-merge");
const config = require("./webpack.common.js");
const OfflinePlugin = require("offline-plugin");
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge({
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                    mangle: true,
                    output: {
                        comments: false,
                    },
                    warnings: false,
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true
                        }
                    }],
                },
            })
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: "production",
        })
    ]
}, config, {
        output: {
            publicPath: "/stock-chart/",
        },
        plugins: [
            new OfflinePlugin({
                autoUpdate: true,
                cacheMaps: [{
                    match: function (_) {
                        return new URL("/", location);
                    },
                    requestTypes: ["same-origin"]
                }],
                ServiceWorker: {
                    events: true,
                    minify: true,
                    navigateFallbackURL: "/",
                },
            })
        ]
    });
