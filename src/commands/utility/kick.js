const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user')
        .setDescriptionLocalizations({
            'es-ES': 'Expulsa a un usuario',
        })

        .addUserOption(option =>
            option.setName('target')
                .setNameLocalizations({
                    'es-ES': 'objetivo',
                })
                .setDescription('The user to kick')
                .setDescriptionLocalizations({
                    'es-ES': 'El usuario a expulsar',
                })
                .setRequired(true),
        )

        .addStringOption(option =>
            option.setName('reason')
                .setNameLocalizations({
                    'es-ES': 'razon',
                })
                .setDescription('Reason for kick')
                .setDescriptionLocalizations({
                    'es-ES': 'Razon de expulsion',
                }),
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setContexts(InteractionContextType.Guild),

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

        await interaction.reply(`Kicking ${target.username} for reason: ${reason}`);
        await target.kick(reason);
    },
};