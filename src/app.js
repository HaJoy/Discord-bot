const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Crear una nueva coleccion de comandos
client.commands = new Collection();

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

// Escuchar cuando se ejecute un comando slash
client.on(Events.InteractionCreate, async interaction => {

	// Interrumpir el proceso si es un comando diferente a slash
	if (!interaction.isChatInputCommand()) return;

	// Obtener la instancia del comando por su nombre en la coleccion client.commands
	const command = interaction.client.commands.get(interaction.commandName);

	// Si no existe el comando informar por consola
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	// Intentar ejecutar el execute del respectivo comando
	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			// Si el bot ya respondio, continuar con otro mensaje informando al usuario del error
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
		else {
			// Si no, responder informando del error
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
	console.log(interaction);
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);