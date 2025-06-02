const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Da informacion acerca del usuario.'),
	async execute(interaction) {
		await interaction.reply(
			`Comando ejecutado por ${interaction.user.username}, quien se unio el ${interaction.member.joinedAt}.`,
		);
	},
};
