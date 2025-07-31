const { SlashCommandBuilder, ChannelType } = require('discord.js');

// Este es un comando para aprender los tipos de
// parametros que un usuario puede ingresar en un comando
const data = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Responde con los que coloques en el input')
    
    // Parametro input texto
    .addStringOption(option => {
        option.setName('input')
            .setDescription('El mensaje que el bot respondera')
            .setRequired(true)
            .setMaxLength(2000);
    })

    // Parametro input channel
    .addChannelOption(option => {
        option.setName('channel')
            .setDescription('El canal donde se enviara el mensaje')
            // Limita a seleccionar solo canales de texto
            .addChannelTypes(ChannelType.GuildText);
    })

    // Parametro input boolean
    .addBooleanOption(option => {
        option.setName('ephemeral')
            .setDescription('Quieres que el mensaje solo se envie a ti?');
    })
    
    // Parametro input texto con opciones estrictas (como un select)
    .addStringOption(option => {
        option.setName('eleccion')
            .setDescription('Selecciona una de las opciones')
            .addChoices(
                { name: 'Opcion 1', value: 1 },
                { name: 'Opcion 2', value: 2 },
                { name: 'Opcion 3', value: 3 },
            );
    });
    