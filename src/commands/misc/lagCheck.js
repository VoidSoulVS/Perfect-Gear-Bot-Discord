const cooldowns = new Map();

module.exports = {
	name: 'lag_check',
	description: 'A latency show!',
	// devOnly: yes,
	// testOnly: Boolean,

	callback: async (client, interaction) => {
		const now = Date.now();
		const playerLatency = now - interaction.createdTimestamp;
		const botLatency = client.ws.ping;
		const userId = interaction.user.id;
		const cooldown = 5;
		const expiresAt = cooldowns.get(userId) || 0;

		if (now < expiresAt) {
			const timeLeft = Math.ceil((expiresAt - now) / 2000);
			/* flags: 1 << 6 === 64 -> mensagem efêmera */
			return interaction.reply({ content: `⏳ Aguarde ${timeLeft}s antes de usar o comando novamente.`, flags: 1 << 6 });
		}

		// registra cooldown e remove após expirar
		cooldowns.set(userId, now + cooldown * 2000);
		setTimeout(() => cooldowns.delete(userId), cooldown * 2000);


		// responde rápido e depois edita mostrando as latências
		const msg = await interaction.reply('### Loading.');
		await new Promise(t => setTimeout(t, 1000));
		await interaction.editReply('### Loading..');
		await new Promise(t => setTimeout(t, 1000));
		await interaction.editReply('### Loading...');
		await msg.delete();
		await interaction.followUp(`>>> ### 🐌 Lag Check \n### * Bot Latency: ${botLatency}ms \n### * ${interaction.user.toString()} Latency: ${playerLatency}ms`);
	},
};