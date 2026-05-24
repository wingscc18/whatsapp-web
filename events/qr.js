module.exports = {
    name: 'qr',
    execute(client, context, qr) {
        context.qrcode.generate(qr, { small: context.config.qr.small });
    }
};
