const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "client-one",
        dataPath: path.join(__dirname + "./.wwebjs_auth/")
    })
})

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente listo!');
});


client.on('message', message => {

    if (message.body === '!ping') {
        client.sendMessage(message.from, 'pong');
    }

});

client.initialize();
