/**
 * Este módulo exporta uma função que carrega todos os comandos locais
 * organizados em categorias de arquivos/pastas.
 *
 * -------------------------------------------------
 * Parâmetros:
 * - exceptions: lista de nomes de comandos que devem ser ignorados.
 *
 * Funcionamento:
 * 1. Cria uma lista vazia para armazenar os comandos carregados.
 * 2. Usa a função getAllFiles para obter todas as categorias de comandos
 *    (cada categoria é uma pasta dentro de "commands").
 * 3. Para cada categoria encontrada:
 *    - Obtém todos os arquivos de comandos dentro dela.
 *    - Para cada arquivo:
 *      - Faz o require do arquivo para carregar o objeto do comando.
 *      - Se o nome do comando estiver na lista de exceções, ignora.
 *      - Caso contrário, adiciona o comando à lista localCommands.
 * 4. Retorna a lista final com todos os comandos carregados.
 */

const path = require('path');
const getAllFiles = require('./getAllFIles');

module.exports = (exceptions = []) => {
	const localCommands = [];

	// Busca todas as categorias de comandos (pastas dentro de "commands")
	const commandCategories = getAllFiles(
		path.join(__dirname, '..', 'commands'),
		true,
	);

	// Percorre cada categoria encontrada
	for (const commandCategory of commandCategories) {
		// Busca todos os arquivos de comandos dentro da categoria
		const commandFiles = getAllFiles(commandCategory);

		// Percorre cada arquivo de comando
		for (const commandFile of commandFiles) {
			// Carrega o objeto do comando
			const commandObject = require(commandFile);

			// Se o comando estiver na lista de exceções, ignora
			if (exceptions.includes(commandObject.name)) {
				continue;
			}

			// Adiciona o comando à lista final
			localCommands.push(commandObject);
		}
	}

	// Retorna todos os comandos carregados
	return localCommands;
};
