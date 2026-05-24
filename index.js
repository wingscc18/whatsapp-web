const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');
const { spawnSync } = require('child_process');
const config = require('./config');
const { loadCommands } = require('./handlers/commands');
const { loadEvents } = require('./handlers/events');

const sessionPath = path.isAbsolute(config.sessionPath)
    ? config.sessionPath
    : path.resolve(__dirname, config.sessionPath);

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: config.clientId,
        dataPath: sessionPath,
        rmMaxRetries: 5
    }),
    puppeteer: config.puppeteer
});

const commands = loadCommands(path.join(__dirname, 'commands'));
loadEvents(client, path.join(__dirname, 'events'), { commands, config, qrcode });

client.initialize().catch(error => {
    console.error('Error al iniciar el cliente:', error);
    process.exit(1);
});

let isShuttingDown = false;

function closeBrowserSilently() {
    const browserProcess = client.pupBrowser && client.pupBrowser.process();

    if (!browserProcess || !browserProcess.pid) {
        return;
    }

    if (process.platform === 'win32') {
        spawnSync('taskkill', ['/PID', String(browserProcess.pid), '/T', '/F'], {
            stdio: 'ignore'
        });
        return;
    }

    browserProcess.kill('SIGTERM');
}

function shutdown() {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;
    console.log('Cliente detenido. La sesion queda guardada.');
    closeBrowserSilently();
    process.exit(0);
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
