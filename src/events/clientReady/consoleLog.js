/**
 * Este módulo define um handler para o evento "ready" do bot do Discord.
 * -------------------------------------------------
 * Funcionamento:
 * - Quando o cliente (bot) estiver pronto e conectado ao Discord,
 *   o código será executado.
 * - Ele acessa o objeto client e imprime no console o nome do usuário do bot,
 *   confirmando que está online.
 *
 * Uso típico:
 * - Esse arquivo geralmente fica dentro da pasta "events/ready.js".
 * - É carregado pelo eventHandler principal, que registra todos os eventos.
 * - Serve como feedback visual para o desenvolvedor, mostrando que o bot iniciou corretamente.
 */

module.exports = (client) => {
	console.log(`${client.user.username} is online in ${client.uptime} miliseconds.`);
};
