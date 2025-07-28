const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Crear una nueva coleccion de comandos
client.commands = new Collection();

// Crear coleccion de cooldowns
client.cooldowns = new Collection();

// Leyendo los archivso de los comandos
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Iterar en cada carpeta dentro de commands
for (const folder of commandFolders) {
	// Construir la ruta de la carpeta actual
	const commandsPath = path.join(foldersPath, folder);
	// Recoger todos los archivos .js de esa ruta (la carpeta)
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Iterar en cada archivo (comando) de la carpeta actual
	for (const file of commandFiles) {
		// Construir la ruta del archivo en la iteracion
		const filePath = path.join(commandsPath, file);
		// Instanciar ese archivo
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Cargar los archivos de la carpeta events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(process.env.TOKEN);