import { digitarMensagem, continuarTexto } from "./utils.js";
import { useMontarProvas } from "./hookProvas.js";

// 'fases/Fases.js' Apresenta a Prova e instancia a classe Prova
export default async (jogador, provaEscolhida) => {
  const { nome: jogadorNome } = jogador;
  const { Prova } = useMontarProvas();

  // Introdução à fase
  await digitarMensagem(
    `\nBem-vindo à ${provaEscolhida.nome}, ${jogadorNome}.\n${provaEscolhida.descricao}\n`
  );

  // Descrição do ambiente
  await digitarMensagem(`${provaEscolhida.ambientacao}`);
  continuarTexto();

  // Descrição dos desafios
  let provasRestantes = provaEscolhida.provas.filter(
    (prova) => !jogador.habilidades.some((h) => h.nome === prova.habilidade)
  ); // Mostra apenas as provas que ainda não foram aprendidas
  for (const prova of provasRestantes) {
    await digitarMensagem(`Desafio: ${prova.nome}\n${prova.descricao}\n`);
  }

  // Iniciar as prova
  const exame = new Prova(provaEscolhida);
  await exame.iniciar(jogador);
};
