module.exports = {
  reject: [
    // globby v12+ does not import correctly in typescript + babel setup
    // https://github.com/sindresorhus/globby/issues/193
    'globby',
  ],
}
