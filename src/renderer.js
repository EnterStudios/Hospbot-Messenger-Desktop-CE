// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var botui = new BotUI('hosbpot-ui');

function init() {
    botui.message
      .bot({
        delay: 700,
        content: 'What would you like to do?'
      })
      .then(function () {
        return botui.action.button({
          delay: 1000,
          action: [{
            text: 'Talk to Hospbot',
            value: 'talk'
          }, {
            text: 'Check eHOSP',
            value: 'check'
          }]
        })
    }).then(function (res) {
      if(res.value == 'check') {
        botui.message.bot({
            delay: 1200,
            content: "Check eHOSP"
        }).then(init);
      } else {
        botui.message.bot({
          delay: 1200,
          content: "Hello from Hospbot"
        }).then(init);
      }
    });
}

init();
