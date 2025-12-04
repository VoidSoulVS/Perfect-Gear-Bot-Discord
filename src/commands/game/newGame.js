const { newGame } = require('../../embeds/newGame');
const { components } = require('../../components/game/newGameButtons');

module.exports = {
	name: 'newgame',
	description: 's!',
	// devOnly: yes,
	testOnly: true,
	// options: Object[],
	// deleted: Boolean,

	callback: (client, interaction) => {
		interaction.reply({ embeds: [newGame], components });
	},
};