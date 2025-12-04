/**
 * Esta função exportada compara dois comandos (um já existente e um local).
 * O objetivo é verificar se houve alguma diferença entre eles,
 * seja na descrição, nas opções ou nas escolhas dessas opções.
 * Caso haja qualquer diferença, retorna true. Caso contrário, retorna false.
 */
module.exports = (existingCommand, localCommand) => {

	/**
   * Função auxiliar: areChoicesDifferent
   * -------------------------------------------------
   * Recebe duas listas de "choices" (escolhas) e verifica se são diferentes.
   * - Percorre cada escolha local.
   * - Procura uma escolha equivalente no comando existente.
   * - Se não encontrar ou se o valor for diferente, retorna true.
   * - Caso contrário, retorna false (não há diferenças).
   */
	const areChoicesDifferent = (existingChoices, localChoices) => {
		for (const localChoice of localChoices) {
			const existingChoice = existingChoices?.find(
				(choice) => choice.name === localChoice.name,
			);

			if (!existingChoice) {
				return true;
			}

			if (localChoice.value !== existingChoice.value) {
				return true;
			}
		}
		return false;
	};

	/**
   * Função auxiliar: areOptionsDifferent
   * -------------------------------------------------
   * Recebe duas listas de "options" (parâmetros do comando) e verifica se são diferentes.
   * - Percorre cada opção local.
   * - Procura uma opção equivalente no comando existente.
   * - Se não encontrar, retorna true.
   * - Se encontrar, compara propriedades importantes:
   *   descrição, tipo, obrigatoriedade, quantidade de choices e conteúdo das choices.
   * - Se qualquer uma dessas propriedades for diferente, retorna true.
   * - Caso contrário, retorna false.
   */
	const areOptionsDifferent = (existingOptions, localOptions) => {
		for (const localOption of localOptions) {
			const existingOption = existingOptions?.find(
				(option) => option.name === localOption.name,
			);

			if (!existingOption) {
				return true;
			}

			if (
				localOption.description !== existingOption.description ||
        localOption.type !== existingOption.type ||
        (localOption.required || false) !== existingOption.required ||
        (localOption.choices?.length || 0) !==
          (existingOption.choices?.length || 0) ||
        areChoicesDifferent(
        	localOption.choices || [],
        	existingOption.choices || [],
        )
			) {
				return true;
			}
		}
		return false;
	};

	/**
   * Comparação principal
   * -------------------------------------------------
   * Aqui é feita a verificação geral entre os dois comandos:
   * - Se a descrição for diferente.
   * - Se o número de opções for diferente.
   * - Se as opções em si forem diferentes (usando a função auxiliar).
   * Caso qualquer uma dessas condições seja verdadeira, retorna true.
   * Se não houver diferenças, retorna false.
   */
	if (
		existingCommand.description !== localCommand.description ||
    existingCommand.options?.length !== (localCommand.options?.length || 0) ||
    areOptionsDifferent(existingCommand.options, localCommand.options || [])
	) {
		return true;
	}

	return false;
};