module.exports.autoreload = {
  active: true,
  usePolling: false,
  overrideMigrateSetting : false,
  dirs: [
    "api/models",
    "api/controllers",
    "api/helpers",
    "config/locales"
  ],
  ignored: [
    // Ignore all files with .ts extension
    "**.ts"
  ]
};
 