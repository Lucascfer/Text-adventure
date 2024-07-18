import readline from "readline-sync";
import { digitarMensagem } from "../utilidades/utils.js";

// 'classes\Prova.js' determina as habilidades que terão nas provas
export default class Prova {
  constructor(detalhes) {
    this.nome = detalhes.nome;
    this.descricao = detalhes.descricao;
    this.ambientacao = detalhes.ambientacao;
    this.provas = Array.isArray(detalhes.provas) ? detalhes.provas : [];
  }

  async iniciar(jogador) {
    let acoesRestantes = this.provas.filter(
      (prova) => !jogador.habilidades.some((h) => h.nome === prova.habilidade)
    ); // habilidades que ainda não foram aprendidas
    let tentativas = {}; // tentativas de aprender uma habilidade

    // Verifica se o jogador aprendeu todas as habilidades da prova
    if (acoesRestantes.length === 0) {
      await digitarMensagem(
        "\nParabéns! Você aprendeu todas as habilidades dessa prova.\n"
      );
      return;
    }

    await digitarMensagem(`\nVocê está prestes a iniciar a ${this.nome}.\n`);
    await digitarMensagem(`${this.descricao}\n`);

    while (acoesRestantes.length > 0) {
      const acoes = acoesRestantes
        .map((prova, index) => `${index + 1}. ${prova.nome}`)
        .join("\n");
      const escolha = readline.question(
        `\nEscolha sua acao (ou digite 0 para sair):\n${acoes}\n`
      );

      if (escolha === "0") {
        console.clear();
        await digitarMensagem("\nVocê decidiu sair da prova.\n");
        break;
      }

      const indiceEscolhido = parseInt(escolha) - 1;

      if (indiceEscolhido >= 0 && indiceEscolhido < acoesRestantes.length) {
        const provaEscolhida = acoesRestantes[indiceEscolhido];

        if (
          jogador.personalidades.includes(
            provaEscolhida.personalidadeNecessaria
          )
        ) {
          console.clear();
          await digitarMensagem(
            `\n${jogador.nome} usou ${provaEscolhida.nome} com sucesso!\n`
          );
          jogador.aprenderHabilidade(provaEscolhida.habilidade, "mestre");
          acoesRestantes.splice(indiceEscolhido, 1); // Remove a ação escolhida das ações restantes
        } else {
          console.clear();
          if (!tentativas[provaEscolhida.nome]) {
            tentativas[provaEscolhida.nome] = 1;
          } else {
            tentativas[provaEscolhida.nome]++;
          }

          const d20 = Math.ceil(Math.random() * 20); // RNG de jogos
        
          if (
            tentativas[provaEscolhida.nome] == 5 ||
            (tentativas[provaEscolhida.nome] > 1 &&
              d20 % tentativas[provaEscolhida.nome] == 0)
          ) {
            // Verifica se o jogador tentou a ação 5 vezes ou se ele tentou mais de uma vez e o resultado foi 0
            await digitarMensagem(
              `\nVocê tevem dificuldade em executar o feitiço. Mas consegui usar ${provaEscolhida.nome}.\n`
            );
            jogador.aprenderHabilidade(provaEscolhida.habilidade);
            acoesRestantes.splice(indiceEscolhido, 1);
          } else {
            await digitarMensagem(
              `\nA sua personalidade interferiu na prova, você teve dificuldade em executar o feitiço.\n`
            );
          }
        }
      } else {
        await digitarMensagem(`\nAção inválida. Tente novamente.`);
      }
    }
  }
}
