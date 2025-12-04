/* const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// Dados de exemplo (substitua pelos seus itens)
const items = Array.from({ length: 18 }, (_, i) => ({
	name: `Item ${i + 1}`,
	desc: `Descrição do item ${i + 1}`,
}));

const PAGE_SIZE = 5;

function renderPage(page) {
	const totalPages = Math.ceil(items.length / PAGE_SIZE);
	const start = page * PAGE_SIZE;
	const pageItems = items.slice(start, start + PAGE_SIZE);

	// Botões para cada item da página (máx 5)
	const itemButtons = pageItems.map((it, idx) =>
		new ButtonBuilder()
			.setCustomId(`item_${start + idx}`)
			.setLabel(`${start + idx + 1}. ${it.name}`)
			.setStyle(ButtonStyle.Secondary),
	);

	const rowItems = new ActionRowBuilder().addComponents(...itemButtons);

	// Botões de navegação
	const prev = new ButtonBuilder()
		.setCustomId('nav_prev')
		.setLabel('⬅️ Anterior')
		.setStyle(ButtonStyle.Primary)
		.setDisabled(page <= 0);

	const next = new ButtonBuilder()
		.setCustomId('nav_next')
		.setLabel('Próximo ➡️')
		.setStyle(ButtonStyle.Primary)
		.setDisabled(page >= totalPages - 1);

	const close = new ButtonBuilder()
		.setCustomId('nav_close')
		.setLabel('Fechar ❌')
		.setStyle(ButtonStyle.Danger);

	const rowNav = new ActionRowBuilder().addComponents(prev, next, close);

	return {
		content: `Lista — página ${page + 1}/${totalPages}`,
		components: [rowItems, rowNav],
	};
}

client.once('ready', () => {
	console.log(`Logado como ${client.user.tag}`);
});

// Commando simples por mensagem: !listar
client.on('messageCreate', async (message) => {
	if (message.author.bot) return;
	if (message.content !== '!listar') return;

	let currentPage = 0;
	const sent = await message.channel.send(renderPage(currentPage));

	const collector = sent.createMessageComponentCollector({
		componentType: ComponentType.Button,
		time: 120_000,
	});

	collector.on('collect', async (interaction) => {
		// restrição: só quem pediu pode usar (opcional)
		if (interaction.user.id !== message.author.id) {
			return interaction.reply({ content: 'Este menu não é seu.', ephemeral: true });
		}

		const id = interaction.customId;

		if (id.startsWith('item_')) {
			const index = Number(id.split('_')[1]);
			const it = items[index];
			if (!it) return interaction.reply({ content: 'Item não encontrado.', ephemeral: true });
			return interaction.reply({ content: `**${it.name}**\n${it.desc}`, ephemeral: true });
		}

		if (id === 'nav_prev') {
			if (currentPage > 0) currentPage--;
			return interaction.update(renderPage(currentPage));
		}

		if (id === 'nav_next') {
			const maxPage = Math.ceil(items.length / PAGE_SIZE) - 1;
			if (currentPage < maxPage) currentPage++;
			return interaction.update(renderPage(currentPage));
		}

		if (id === 'nav_close') {
			// desabilita todos os botões
			const disabled = sent.components.map(row =>
				ActionRowBuilder.from(row).addComponents(
					...row.components.map(c => c.setDisabled(true)),
				),
			);
			await interaction.update({ content: 'Menu fechado.', components: disabled });
			collector.stop();
		}
	});

	collector.on('end', async () => {
		// ao terminar por timeout, desabilita tudo
		try {
			const disabled = sent.components.map(row =>
				ActionRowBuilder.from(row).addComponents(
					...row.components.map(c => c.setDisabled(true)),
				),
			);
			await sent.edit({ components: disabled });
		} catch (e) {
			// ignorar errors de edição
		}
	});
});

client.login(process.env.DISCORD_TOKEN || 'SEU_TOKEN_AQUI'); */
