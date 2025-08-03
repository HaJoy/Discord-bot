const { SlashCommandBuilder } = require('discord.js');

// Este comando da la informacion del usuario o del
// servidor, como se desee. Aqui se aprende sobre los
// subcomandos y locales para los nombres y descripciones
module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setNameLocalizations({
        'en-US': 'info',
    })
    .setDescription('Muestra la informacion del usuario o del server')
    .setDescriptionLocalizations({
        'en-US': 'Shows information about a user or a server',
    })
    
    // Subcomando para usuarios
    .addSubcommand(subcommand => 
        subcommand.setName('user')
            .setNameLocalizations({
                'es-ES': 'usuario',
            })
            .setDescription('Informacion de un usuario')
            .setDescriptionLocalizations({
                'en-US': 'Info about a user',
            })
            .addUserOption(option => 
                option.setName('target')
                    .setNameLocalizations({
                        'es-ES': 'objetivo',
                    })
                    .setDescription('El usuario')
                    .setDescriptionLocalizations({
                        'en-US': 'The user',
                    }),
            ),
    )

    // Subcomando para servidor
    .addSubcommand(subcommand => 
        subcommand.setName('server')
            .setNameLocalizations({
                'es-ES': 'servidor',
            })
            .setDescription('Informacion sobre el servidor')
            .setDescriptionLocalizations({
                'en-US': 'Info about the server',
            }),
    ),

    async execute(interaction) {
        // Controlar el flujo segun el subcomando seleccionado
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');

            if (user) {
                await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
            } else {
                await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
            }
        } else if (interaction.options.getSubcommand() === 'server') {
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
        }
    },
};