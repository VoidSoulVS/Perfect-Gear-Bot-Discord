const { EmbedBuilder } = require('discord.js');

const newGame = new EmbedBuilder()
	.setTitle('Novo Jogo')
	.setDescription('Clique em "Iniciar" para começar o jogo.')
	.setColor(0x0099ff)
	.setTimestamp();

module.exports = { newGame };