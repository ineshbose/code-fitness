module.exports = {
  plugins: [
    ['github', { auth: process.env.GITHUB_TOKEN }],
    ['wakatime', { credentials: process.env.WAKATIME_CREDENTIALS }],
  ],
};
