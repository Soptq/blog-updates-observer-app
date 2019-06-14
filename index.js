// Git Data API use case example
// See: https://developer.github.com/v3/git/ to learn more

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
require('./const')
const request = require('request')

var addeds, nameArr, month, day
var requestUrl

module.exports = app => {
  app.on('push', async context => {
    // Code was pushed to the repo, what should we do with it?
    var commits = context.payload['commits']
    for (var i = 0; i < commits.length; ++i) {
      addeds = commits[i]['added']
      for (var j = 0; j < addeds.length; ++j) {
        if (addeds[j].indexOf('_posts') !== -1) {
          nameArr = addeds[j].split('/')[1].split('.')[0].split('-')
          month = nameArr[1].length === 2 ? nameArr[1] : '0' + nameArr[1]
          day = nameArr[2].length === 2 ? nameArr[2] : '0' + nameArr[2]
          requestUrl = `https://api.soptq.me/counter/updateViews.php?t=/${nameArr[0]}/${month}/${day}/${nameArr[3]}/&id=0&pp=${global.PWD}`
          request.post(
            requestUrl,
            { json: { key: 'value' } },
            function (error, response, body) {
              if (!error && response.statusCode === 200) {
                app.log(body)
              }
            }
          )
        }
      }
    }
  })
}
