const { SlashCommandBuilder, ChannelType, MessageFlags } = require('discord.js');

// Este es un comando para aprender los tipos de
// parametros que un usuario puede ingresar en un comando
module.exports = {
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Responde con los que coloques en el input')
    .setDescriptionLocalizations({
        'en-US': 'The bot says what you put in the input',
    })
    
    // Parametro input texto
    .addStringOption(option => 
        option.setName('input')
            .setDescriptionLocalizations({
                'es-ES': 'entrada',
            })
            .setDescription('El mensaje que el bot respondera')
            .setDescriptionLocalizations({
                'en-US': 'The message the bot will say',
            })
            .setRequired(true)
            .setMaxLength(2000),
    )

    // Parametro input channel
    .addChannelOption(option => 
        option.setName('channel')
            .setNameLocalizations({
                'es-ES': 'canal',
            })
            .setDescription('El canal donde se enviara el mensaje')
            .setDescriptionLocalizations({
                'en-US': 'The channel where the message will be send',
            })
            // Limita a seleccionar solo canales de texto
            .addChannelTypes(ChannelType.GuildText),
    )

    // Parametro input boolean
    .addBooleanOption(option => 
        option.setName('ephemeral')
            .setDescription('Quieres que el mensaje solo se envie a ti?')
            .setDescriptionLocalizations({
                'en-US': 'Do you want message only for you?',
            }),
    )
    
    // Parametro input texto con opciones estrictas (como un select)
    .addStringOption(option => 
        option.setName('choice')
            .setNameLocalizations({
                'es-ES': 'eleccion',
            })
            .setDescription('Selecciona una de las opciones')
            .setDescriptionLocalizations({
                'en-US': 'Select one of the options',
            })
            .addChoices(
                { name: 'Opcion 1', name_localizations: { 'en-US': 'Option 1' }, value: '1' },
                { name: 'Opcion 2', name_localizations: { 'en-US': 'Option 2' }, value: '2' },
                { name: 'Opcion 3', name_localizations: { 'en-US': 'Option 3' }, value: '3' },
            ),
    ),

    async execute(interaction) {
        const msg = interaction.options.getString('input');
        // Esta variable se usara despues
        // const channel = interaction.options.getChannel('channel');
        const ephemeral = interaction.options.getBoolean('ephemeral');
        const choice = interaction.options.getString('choice');
        await interaction.reply({
            content: `${msg}\nMessage sent by ${interaction.user.username}\nAnd you selected Option ${choice}`,
            flags: ephemeral ? MessageFlags.Ephemeral : null,
        });
    },
};
    