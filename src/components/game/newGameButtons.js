const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const newGameRow = new ActionRowBuilder().addComponents(
	new ButtonBuilder()
		.setCustomId('new_game')
		.setLabel('Iniciar')
		.setStyle(ButtonStyle.Primary),
);

module.exports = { components: [newGameRow] };