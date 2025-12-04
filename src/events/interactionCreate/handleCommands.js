/**
 * Este módulo é responsável por lidar com interações de comandos de barra (slash commands).
 * -------------------------------------------------
 * Objetivo:
 * - Validar se o comando existe localmente.
 * - Restringir comandos a desenvolvedores ou a um servidor de teste, se configurado.
 * - Verificar permissões necessárias do usuário e do bot.
 * - Executar o comando se todas as condições forem atendidas.
 */

require('dotenv').config();
const { GUILD_ID: testServer } = process.env;
const { DEVS_ID: devs } = process.env;
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
	// Ignora interações que não sejam comandos de barra
	if (!interaction.isChatInputCommand()) return;

	// Carrega todos os comandos locais definidos no projeto
	const localCommands = getLocalCommands();

	try {
		// Procura o comando correspondente ao nome digitado pelo usuário
		const commandObject = localCommands.find(
			(cmd) => cmd.name === interaction.commandName,
		);

		// Se não encontrar o comando, encerra
		if (!commandObject) return;

		/**
     * Restrição: Comando apenas para desenvolvedores
     * -------------------------------------------------
     * Se o comando estiver marcado como "devOnly",
     * verifica se o usuário que executou está na lista de devs.
     * Caso contrário, responde com mensagem de bloqueio.
     */
		if (commandObject.devOnly) {
			if (!devs.includes(interaction.member.id)) {
				interaction.reply({
					content: 'Only developers are allowed to run this command.',
					ephemeral: true,
				});
				return;
			}
		}

		/**
     * Restrição: Comando apenas para servidor de teste
     * -------------------------------------------------
     * Se o comando estiver marcado como "testOnly",
     * verifica se a guild atual corresponde ao servidor de teste.
     * Caso contrário, responde com mensagem de bloqueio.
     */
		if (commandObject.testOnly) {
			if (!(interaction.guild.id === testServer)) {
				interaction.reply({
					content: 'This command cannot be ran here.',
					ephemeral: true,
				});
				return;
			}
		}

		/**
     * Verificação: Permissões do usuário
     * -------------------------------------------------
     * Se o comando exigir permissões específicas,
     * percorre cada uma e verifica se o usuário possui.
     * Caso falte alguma, responde com mensagem de bloqueio.
     */
		if (commandObject.permissionsRequired?.length) {
			for (const permission of commandObject.permissionsRequired) {
				if (!interaction.member.permissions.has(permission)) {
					interaction.reply({
						content: 'Not enough permissions.',
						ephemeral: true,
					});
					return;
				}
			}
		}

		/**
     * Verificação: Permissões do bot
     * -------------------------------------------------
     * Se o comando exigir permissões específicas para o bot,
     * percorre cada uma e verifica se o bot possui.
     * Caso falte alguma, responde com mensagem de bloqueio.
     */
		if (commandObject.botPermissions?.length) {
			for (const permission of commandObject.botPermissions) {
				const bot = interaction.guild.members.me;

				if (!bot.permissions.has(permission)) {
					interaction.reply({
						content: 'I don\'t have enough permissions.',
						ephemeral: true,
					});
					return;
				}
			}
		}

		/**
     * Execução do comando
     * -------------------------------------------------
     * Se todas as verificações passarem,
     * chama a função callback do comando passando o client e a interação.
     */
		await commandObject.callback(client, interaction);
	} catch (error) {
		// Captura e exibe qualquer erro que ocorrer durante a execução
		console.log(`There was an error running this command: ${error}`);
	}
};
