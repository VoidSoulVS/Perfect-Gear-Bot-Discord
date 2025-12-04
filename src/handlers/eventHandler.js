/**
 * Este módulo é responsável por carregar e registrar automaticamente
 * os eventos do bot do Discord.
 *
 * -------------------------------------------------
 * Funcionamento:
 * 1. Busca todas as pastas dentro de "events" (cada pasta representa um tipo de evento).
 * 2. Para cada pasta de evento:
 *    - Obtém todos os arquivos de funções associados a esse evento.
 *    - Ordena os arquivos para garantir uma ordem consistente de execução.
 *    - Extrai o nome do evento a partir do nome da pasta.
 * 3. Registra o evento no cliente do Discord:
 *    - Quando o evento ocorrer, percorre todos os arquivos da pasta.
 *    - Carrega cada arquivo (require) e executa a função exportada,
 *      passando o client e o argumento do evento.
 * 4. Dessa forma, cada evento pode ter múltiplos "handlers" organizados em arquivos separados.
 */

const path = require('path');
const getAllFiles = require('../utils/getAllFIles');

module.exports = (client) => {
	// Busca todas as pastas de eventos dentro da pasta "events"
	const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

	// Percorre cada pasta de evento
	for (const eventFolder of eventFolders) {
		// Obtém todos os arquivos dentro da pasta do evento
		const eventFiles = getAllFiles(eventFolder);

		// Ordena os arquivos para manter consistência na execução
		eventFiles.sort((a, b) => a > b);

		// Extrai o nome do evento a partir do nome da pasta
		const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

		/**
     * Registro do evento no cliente
     * -------------------------------------------------
     * Quando o evento ocorrer:
     * - Percorre todos os arquivos da pasta correspondente.
     * - Carrega cada arquivo como uma função.
     * - Executa a função passando o client e o argumento do evento.
     */
		client.on(eventName, async (arg) => {
			for (const eventFile of eventFiles) {
				const eventFunction = require(eventFile);
				await eventFunction(client, arg);
			}
		});
	}
};
