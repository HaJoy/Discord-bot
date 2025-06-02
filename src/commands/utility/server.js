const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Da informacion acerca del server'),
	async execute(interaction) {
		await interaction.reply(
			`Este server es ${interaction.guild.name} y tiene ${interaction.guild.memberCount} miembros.`,
		);
	},
};
