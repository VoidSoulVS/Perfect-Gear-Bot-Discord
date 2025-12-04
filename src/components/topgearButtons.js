const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createTopGearButtons() {
	const startButton = new ButtonBuilder()
		.setCustomId('start_game')
		.setLabel('Start Game')
		.setStyle(ButtonStyle.Primary);

	const rulesButton = new ButtonBuilder()
		.setCustomId('game_rules')
		.setLabel('Game Rules')
		.setStyle(ButtonStyle.Secondary);

	const leaderboardButton = new ButtonBuilder()
		.setCustomId('leaderboard')
		.setLabel('Leaderboard')
		.setStyle(ButtonStyle.Success);

	return new ActionRowBuilder().addComponents(startButton, rulesButton, leaderboardButton);
}

module.exports = createTopGearButtons;