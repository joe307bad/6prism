const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sixprism",
    projectName: "backups",
    webpackConfigEnv,
    argv
  });

  // remove unused-webpack-plugin
  defaultConfig.plugins.splice(2, 1)

  return defaultConfig;
};
