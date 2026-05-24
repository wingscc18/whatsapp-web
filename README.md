# WhatsApp Web Bot

Bot basico para WhatsApp Web construido con Node.js y `whatsapp-web.js`.

## Requisitos

- Node.js 18 o superior
- npm
- Una cuenta de WhatsApp activa

## Instalacion

```powershell
npm install
```

## Ejecucion

```powershell
npm start
```

La primera vez se mostrara un codigo QR en la terminal. Escanealo desde WhatsApp para vincular la sesion.

Despues del primer inicio, la sesion queda guardada localmente en `.wwebjs_auth/`. Si cierras la terminal y vuelves a ejecutar el proyecto, no deberias volver a escanear el QR mientras el dispositivo siga vinculado en WhatsApp.

## Comandos disponibles

| Comando | Respuesta |
| --- | --- |
| `!ping` | `pong` |

## Estructura

```text
.
|-- commands/
|   `-- ping.js
|-- events/
|   |-- authenticated.js
|   |-- authFailure.js
|   |-- disconnected.js
|   |-- message.js
|   |-- messageCreate.js
|   |-- qr.js
|   `-- ready.js
|-- handlers/
|   |-- commandRunner.js
|   |-- commands.js
|   `-- events.js
|-- config.js
`-- index.js
```

Los comandos viven en `commands/` y los eventos de WhatsApp en `events/`. Los handlers cargan automaticamente los archivos `.js` de esas carpetas.

## Configuracion

La configuracion principal esta en `config.js`.

```js
module.exports = {
    prefix: '!',
    clientId: process.env.WHATSAPP_CLIENT_ID || 'client-one',
    sessionPath: process.env.WHATSAPP_SESSION_PATH || '.wwebjs_auth',
    qr: {
        small: true
    },
    commands: {
        allowOwnMessages: true
    }
};
```

Para cambiar el prefijo de comandos, edita `prefix`.

`allowOwnMessages` permite ejecutar comandos escritos desde la misma cuenta vinculada. Si lo desactivas, el bot solo respondera comandos recibidos desde otros usuarios.

El QR se muestra con `small: true`, que es el formato mas compacto disponible en `qrcode-terminal`. Si aun se ve grande en VS Code, reduce el zoom o el tamano de fuente de la terminal.

## Agregar comandos

Crea un archivo en `commands/` con este formato:

```js
module.exports = {
    name: 'hola',
    async execute(client, message) {
        await message.reply('Hola!');
    }
};
```

El comando anterior se ejecuta enviando `!hola`.

## Agregar eventos

Crea un archivo en `events/` con este formato:

```js
module.exports = {
    name: 'ready',
    execute() {
        console.log('Cliente listo!');
    }
};
```

El campo `name` debe coincidir con el nombre del evento de `whatsapp-web.js`.

## Chats soportados

- Privados: si la cuenta vinculada recibe el mensaje.
- Grupos: si la cuenta vinculada pertenece al grupo.
- Comunidades: funciona en grupos normales dentro de comunidades donde la cuenta pueda leer/escribir.

No depende de que el bot sea administrador, pero si WhatsApp limita escritura o lectura en un chat, el bot tambien queda limitado.

## Configuracion opcional

Puedes cambiar el identificador local del cliente sin modificar el codigo.

PowerShell:

```powershell
$env:WHATSAPP_CLIENT_ID="client-one"
npm start
```

Linux/macOS:

```bash
WHATSAPP_CLIENT_ID=client-one npm start
```

Tambien puedes guardar la sesion en una ruta personalizada.

PowerShell:

```powershell
$env:WHATSAPP_SESSION_PATH="C:\ruta\a\.wwebjs_auth"
npm start
```

Linux/macOS:

```bash
WHATSAPP_SESSION_PATH="/ruta/a/.wwebjs_auth" npm start
```

## Archivos privados

No subas al repositorio:

- `node_modules/`
- `.env` y variantes
- `.wwebjs_auth/`
- `.wwebjs_cache/`
- logs

Estos archivos pueden contener dependencias locales, datos de sesion o informacion sensible.

## Notas

- Este proyecto usa `LocalAuth` para mantener la sesion activa entre ejecuciones.
- Si cierras sesion desde WhatsApp o eliminas `.wwebjs_auth/`, tendras que escanear el QR otra vez.
- Usa este proyecto respetando los terminos de WhatsApp y evitando automatizaciones abusivas.
