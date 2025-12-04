/**
 * Este módulo sincroniza os comandos locais com os comandos registrados na aplicação do Discord.
 * -------------------------------------------------
 * Objetivo:
 * - Garantir que os comandos definidos localmente estejam refletidos corretamente no servidor de teste.
 * - Atualizar, criar ou excluir comandos conforme necessário.
 *
 * Fluxo geral:
 * 1. Carrega os comandos locais definidos no projeto.
 * 2. Obtém os comandos já registrados na aplicação (no servidor de teste).
 * 3. Para cada comando local:
 *    - Verifica se já existe um comando com o mesmo nome na aplicação.
 *    - Se existir:
 *        a) Se estiver marcado como "deleted", remove o comando da aplicação.
 *        b) Se for diferente do existente, edita/atualiza o comando.
 *    - Se não existir:
 *        a) Se estiver marcado como "deleted", ignora.
 *        b) Caso contrário, cria o comando na aplicação.
 * 4. Exibe mensagens no console para acompanhar o processo.
 */

require('dotenv').config();
const { GUILD_ID: testServer } = process.env;
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
	try {
		// Carrega todos os comandos locais definidos no projeto
		const localCommands = getLocalCommands();

		// Obtém os comandos já registrados na aplicação (no servidor de teste)
		const applicationCommands = await getApplicationCommands(client, testServer);

		// Percorre cada comando local
		for (const localCommand of localCommands) {
			const { name, description, options } = localCommand;

			// Procura se já existe um comando registrado com o mesmo nome
			const existingCommand = await applicationCommands.cache.find(
				(cmd) => cmd.name === name,
			);

			// Caso o comando já exista na aplicação
			if (existingCommand) {
				// Se o comando local está marcado como "deleted", remove da aplicação
				if (localCommand.deleted) {
					await applicationCommands.delete(existingCommand.id);
					console.log(`🗑 Deleted command "${name}".`);
					continue;
				}

				// Se o comando é diferente do existente, atualiza/edita
				if (areCommandsDifferent(existingCommand, localCommand)) {
					await applicationCommands.edit(existingCommand.id, {
						description,
						options,
					});

					console.log(`🔁 Edited command "${name}".`);
				}
			}
			// Caso o comando não exista na aplicação
			else {
				// Se está marcado como "deleted", apenas ignora
				if (localCommand.deleted) {
					console.log(
						`⏩ Skipping registering command "${name}" as it's set to delete.`,
					);
					continue;
				}

				// Caso contrário, cria o comando na aplicação
				await applicationCommands.create({
					name,
					description,
					options,
				});

				console.log(`👍 Registered command "${name}."`);
			}
		}
	} catch (error) {
		// Captura e exibe qualquer erro que ocorrer durante o processo
		console.log(`There was an error: ${error}`);
	}
};
