import readline from "readline-sync";
import Feiticeiro from "./classes/Feiticeiro.js";
import PrimeiraFase from "./fases/Primeira.js";
import SegundaFase from "./fases/Segunda.js";
import TeceiraFase from "./fases/Terceira.js";

import { introducao, digitarMensagem } from "./utilidades/utils.js";
import { useMontarProvas } from "./utilidades/hookProvas.js";

const { agua, terra, ar, fogo, Prova } = useMontarProvas();
const provas = {
  agua: new Prova(agua),
  terra: new Prova(terra),
  fogo: new Prova(fogo),
  ar: new Prova(ar),
};

// Função principal para iniciar o jogo
async function iniciarJogo() {
  await introducao();

  // Criar o personagem principal
  const nome = readline.question(
    "Digite o nome do seu aprendiz de feiticeiro: "
  );
  const mainCharacter = new Feiticeiro(nome);

  // Iniciar a primeira fase
  await PrimeiraFase(mainCharacter);

  // Segundo dia
  await SegundaFase(mainCharacter);

  //Terceiro dia
  await TeceiraFase(mainCharacter);

  //Tentar ver se quer retornar às provas anteriores
  await digitarMensagem(
    `Após termina suas provas, ${mainCharacter.nome} é abordado por Gandor, o Mestre dos Elementos, que o faz a seguinte pergunta:`
  );
  const escolha = readline.question(
    `\nHa alguma prova que você queira fazer para adquirir mais experiencia? ('s' ou 'n')\n`
  );
  if (escolha.toLowerCase() === "s") {
    await escolherProva(jogador, provas);
  }

  // Finalizar o jogo
  await digitarMensagem(
    `\nApós uma longa jornada de teino, ${mainCharacter.nome} chega ao seu dormitório.\nObrigado por jogar!\n`
  );

  await digitarMensagem(
    "Crédito: Lucas Fernandes - 2024\ngithub.com/Lucascfer/",
    50
  );
  process.exit();
}

iniciarJogo();