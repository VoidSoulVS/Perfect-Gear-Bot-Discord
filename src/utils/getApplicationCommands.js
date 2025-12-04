/**
 * Este módulo exporta uma função assíncrona que obtém os comandos de aplicação
 * (application commands) de um cliente do Discord.
 *
 * -------------------------------------------------
 * Parâmetros:
 * - client: instância do cliente do Discord (normalmente "new Client()").
 * - guildId: opcional, ID de uma guild (servidor). Se fornecido, busca os comandos
 *   específicos daquela guild. Se não for fornecido, busca os comandos globais da aplicação.
 *
 * Funcionamento:
 * 1. Cria uma variável para armazenar os comandos.
 * 2. Se um guildId for passado:
 *    - Busca a guild correspondente usando client.guilds.fetch.
 *    - Define applicationCommands como os comandos dessa guild.
 * 3. Caso contrário:
 *    - Define applicationCommands como os comandos globais da aplicação.
 * 4. Faz o fetch() dos comandos para garantir que estão atualizados.
 * 5. Retorna a lista de applicationCommands.
 */

module.exports = async (client, guildId) => {
	let applicationCommands;

	// Se foi passado um guildId, busca os comandos específicos da guild
	if (guildId) {
		const guild = await client.guilds.fetch(guildId);
		applicationCommands = guild.commands;
	}
	// Caso contrário, pega os comandos globais da aplicação
	else {
		applicationCommands = await client.application.commands;
	}

	// Atualiza os comandos (faz o fetch para garantir dados atuais)
	await applicationCommands.fetch();

	// Retorna os comandos obtidos
	return applicationCommands;
};