const { Events, MessageFlags, Collection } = require('discord.js');

// Escuchar cuando se ejecute un comando slash
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Interrumpir el proceso si es un comando diferente a slash
        if (!interaction.isChatInputCommand()) return;

        // Obtener la instancia del comando por su nombre en la coleccion client.commands
        const command = interaction.client.commands.get(interaction.commandName);

        // Si no existe el comando informar por consola
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        const { cooldowns } = interaction.client;

        // command.data.name == nombre de usario que uso el comando
        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        // Comprobar cooldown
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1_000);
                return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, flags: MessageFlags.Ephemeral });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

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
    },
};