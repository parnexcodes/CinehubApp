module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      "allowlist": null,
      "blacklist": null, // DEPRECATED
      "whitelist": null, // DEPRECATED
      "safe": false,
      "allowUndefined": false,
      "verbose": false
    }]
  ]
};
