/**
 * Este arquivo registra comandos de barra (slash commands) em um servidor do Discord.
 * -------------------------------------------------
 * Etapas principais:
 * 1. Carrega variáveis de ambiente usando dotenv (como token, clientId e guildId).
 * 2. Define os comandos que serão registrados (ex.: ping, initialGear).
 * 3. Cria uma instância da API REST do Discord com o token do bot.
 * 4. Executa uma função assíncrona que envia os comandos para o Discord.
 * 5. Exibe mensagens no console para confirmar sucesso ou mostrar erros.
 */

require('dotenv').config();
const { REST, Routes } = require('discord.js');

/**
 * Lista de comandos que serão registrados
 * -------------------------------------------------
 * Cada comando precisa de:
 * - name: nome do comando (como será digitado no Discord).
 * - description: descrição que aparece para o usuário.
 */
const commands = [
	{
		name: 'lag_check',
		description: 'Replies with Connection Review!',
	},
	{
		name: 'newGame',
		description: 'Replies with Connection Review!',
	},
];

/**
 * Configuração da API REST
 * -------------------------------------------------
 * Cria uma instância da classe REST, define a versão da API (10)
 * e aplica o token do bot para autenticação.
 */
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

/**
 * Registro dos comandos
 * -------------------------------------------------
 * Função autoexecutável assíncrona:
 * - Exibe mensagem inicial no console.
 * - Usa rest.put() para enviar os comandos para a guild específica.
 * - Se tudo der certo, exibe mensagem de sucesso.
 * - Se houver erro, mostra no console.
 */
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
