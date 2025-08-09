const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('guide')
        .setNameLocalizations({
            'es-ES': 'guia',
        })
        .setDescription('Search discordjs.guide!')
        .setDescriptionLocalizations({
            'es-ES': 'Busca en la guia de Discord js!',
        })
        .addStringOption(option =>
            option.setName('query')
                .setDescriptionLocalizations({
                    'es-ES': 'consulta',
                })
                .setDescription('Phrase to search for')
                .setDescriptionLocalizations({
                    'es-ES': 'Frase a buscar',
                })
                .setAutocomplete(true),
        )
        .addStringOption(option =>
            option.setName('version')
                .setDescription('Version to search in')
                .setDescriptionLocalizations({
                    'es-ES': 'Version donde buscar',
                })
                .setAutocomplete(true)),

    async autocomplete(interaction) {
        const currentValue = interaction.options.getFocused(true);
        let choices;
        if (currentValue.name === 'query') {
            choices = ['Popular Topics: Threads',
            'Sharding: Getting started',
            'Library: Voice Connections',
            'Interactions: Replying to slash commands',
            'Popular Topics: Embed preview'];
        }
        if (currentValue.name === 'version') {
            choices = ['v9', 'v11', 'v12', 'v13', 'v14'];
        }
        const filterdChoices = choices.filter(choice => choice.startsWith(currentValue.value));

        await interaction.respond(
            filterdChoices.map(choice => ({ name: choice, value: choice })),
        );
    },

    async execute(interaction) {
        const query = interaction.options.getString('query');
        const version = interaction.options.getString('version');

        interaction.reply(`You selected the query: ${query}\nWith the version: ${version}`);
    },
};