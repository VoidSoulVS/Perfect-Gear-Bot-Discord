/**
 * Este arquivo inicializa o bot do Discord.
 * -------------------------------------------------
 * Etapas principais:
 * 1. Carrega variáveis de ambiente usando dotenv (como o token do bot).
 * 2. Importa o eventHandler, responsável por registrar e gerenciar eventos do bot.
 * 3. Importa as classes necessárias da biblioteca discord.js.
 * 4. Cria uma instância do cliente do Discord, configurando os intents (permissões de eventos).
 * 5. Executa o eventHandler para vincular os eventos ao cliente.
 * 6. Faz login no Discord usando o token armazenado em variáveis de ambiente.
 */

require('dotenv').config();
const eventHandler = require('./handlers/eventHandler');
const { Client, GatewayIntentBits } = require('discord.js');

/**
 * Criação do cliente do Discord
 * -------------------------------------------------
 * O objeto client representa a conexão com o Discord.
 * Os "intents" definem quais eventos o bot terá acesso.
 * Neste caso:
 * - Guilds: eventos relacionados a servidores.
 * - GuildMessages: eventos relacionados a mensagens enviadas em servidores.
 */
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
	],
});

/**
 * Registro dos eventos
 * -------------------------------------------------
 * O eventHandler é chamado passando o client.
 * Ele deve conter a lógica para lidar com eventos como:
 * - Quando o bot fica online (ready).
 * - Quando mensagens são recebidas.
 * - Outros eventos personalizados.
 */
eventHandler(client);

/**
 * Login no Discord
 * -------------------------------------------------
 * Usa o token armazenado em variáveis de ambiente (.env).
 * Esse token autentica o bot e permite que ele se conecte à API do Discord.
 */
client.login(process.env.DISCORD_TOKEN);
