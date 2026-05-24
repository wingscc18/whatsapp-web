module.exports = {
    prefix: '!',
    clientId: process.env.WHATSAPP_CLIENT_ID || 'client-one',
    sessionPath: process.env.WHATSAPP_SESSION_PATH || '.wwebjs_auth',
    qr: {
        small: true
    },
    commands: {
        allowOwnMessages: true
    },
    puppeteer: {
        headless: true,
        handleSIGINT: false,
        handleSIGTERM: false,
        handleSIGHUP: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    }
};
