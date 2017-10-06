// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var botui = new BotUI('hosbpot-ui');
var request = require("request");

var firstLoop = true;

function loop() {
    botui.action.text({ // show 'text' action
        action: {
            placeholder: 'Your message ...'
        }
    })
    .then(function (res) {
        msgFromHospbot = botui.message.bot({
            delay: 200,
            loading: true
        }).then(function (index) {
            msgFromHospbot = index;
            sendMessage(res.value);
        });
    });
}

function sendMessage(msg) {
    var options = {
        method: 'POST',
        url: 'http://hospbot.azurewebsites.net/api/v1/ehosp_webhookA32D7FCAAF7B912B8224EEC441DC9',
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        formData: {
            message: msg
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        // Display message from Hospbot
        botui.message.update(msgFromHospbot, {
            content: body
        })
        .then(loop);
    });
}


if (firstLoop) {
    botui.message.bot({
        delay: 700,
        content: 'What would you like to do?'
    })
    .then(function () {
        return botui.action.button({
            delay: 1000,
            action: [
                {
                    text: 'Talk to Hospbot',
                    value: 'talk'
                }, 
                {
                    text: 'Check eHOSP',
                    value: 'check'
                }
            ]
        })
    })
    .then(function (res) {
        if(res.value == 'check') {
            botui.message.bot({
                delay: 1200,
                content: "Check eHOSP"
            }).then(loop);
        } else {
            botui.action.text({ // show 'text' action
                action: {
                    placeholder: 'Your message ...'
                }
            })
            .then(function (res) {
                msgFromHospbot = botui.message.bot({
                    delay: 200,
                    loading: true
                }).then(function (index) {
                    msgFromHospbot = index;
                    sendMessage(res.value);
                });
            })
        }
    });
    firstLoop = false;
} else {
    loop();
}
