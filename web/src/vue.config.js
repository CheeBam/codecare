module.exports = {
  lintOnSave: 'error',
  devServer: {
    headers: {
      'X-Frame-Options': [
        'ALLOW-FROM https://www.messenger.com/',
        'ALLOW-FROM https://www.facebook.com/',
        'ALLOW-FROM https://www.facebook.com/home.php',
        'ALLOW-FROM https://www.google.com/',
        'ALLOW-FROM https://accounts.google.com/',
      ],
    },
    allowedHosts: [
      '.test',
      '.io'
    ]
  }
};
