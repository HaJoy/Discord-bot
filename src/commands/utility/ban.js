const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banear a un usuario')
        .setDescriptionLocalizations({
            'en-US': 'Ban a user',
        })

        .addUserOption(option => 
            option.setName('target')
                .setNameLocalizations({
                    'es-ES': 'objetivo',
                })
                .setDescription('El usuario a banear')
                .setDescriptionLocalizations({
                    'en-US': 'The user to ban',
                })
                .setRequired(true),
        )

        .addStringOption(option => 
            option.setName('reason')
                .setNameLocalizations({
                    'es-ES': 'razon',
                })
                .setDescription('Razon del baneo')
                .setDescriptionLocalizations({
                    'en-US': 'Reason for banning',
                }),
        )

        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setContexts(InteractionContextType.Guild),

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
        await interaction.guild.members.ban(target);

    },

};