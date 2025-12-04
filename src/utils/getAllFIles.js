/**
 * Este módulo exporta uma função que lista arquivos ou pastas dentro de um diretório.
 * -------------------------------------------------
 * Parâmetros:
 * - directory: caminho da pasta que será lida.
 * - foldersOnly: booleano que define se devem ser retornadas apenas pastas (true) ou apenas arquivos (false).
 *
 * Funcionamento:
 * 1. Cria uma lista vazia para armazenar os nomes dos arquivos/pastas.
 * 2. Lê o conteúdo do diretório usando fs.readdirSync, que retorna objetos com informações sobre cada item.
 * 3. Para cada item encontrado:
 *    - Monta o caminho completo usando path.join.
 *    - Se foldersOnly for true, adiciona apenas pastas.
 *    - Se for false, adiciona apenas arquivos.
 * 4. Retorna a lista final com os caminhos.
 */

const fs = require('fs');
const path = require('path');

module.exports = (directory, foldersOnly = false) => {
	// Lista que vai armazenar os caminhos dos arquivos ou pastas
	const fileNames = [];

	// Lê o diretório e retorna uma lista de objetos representando arquivos/pastas
	const files = fs.readdirSync(directory, { withFileTypes: true });

	// Percorre cada item encontrado no diretório
	for (const file of files) {
		// Cria o caminho completo do item (diretório + nome do arquivo/pasta)
		const filePath = path.join(directory, file.name);

		// Se a função foi chamada para listar apenas pastas
		if (foldersOnly) {
			if (file.isDirectory()) {
				fileNames.push(filePath);
			}
		}
		// Caso contrário, lista apenas arquivos
		else if (file.isFile()) {
			fileNames.push(filePath);
		}
	}

	// Retorna a lista final com os caminhos encontrados
	return fileNames;
};