import { digitarMensagem, continuarTexto, escolherProva } from "../utilidades/utils.js";
import { useMontarProvas } from "../utilidades/hookProvas.js";
import Interludio from "./Interludio.js";

// Dia que o jogador vai escolher fazer as provas de agua e terra
export default async (jogador) => {
  const { agua, terra, Prova } = useMontarProvas();
  console.clear();

  await digitarMensagem(
    `Depois de um primeiro dia emocionante na Academia de Magia, ${jogador.nome} é convocado para sua primeira prova. O Mestre dos Elementos, Gandor, é um feiticeiro experiente e vai guiar você neste dia`
  );
  continuarTexto();

  const provas = {
    agua: new Prova(agua),
    terra: new Prova(terra),
  };

  await escolherProva(jogador, provas);

  await Interludio(jogador);

  await digitarMensagem(
    `Após terminar o seu primeiro dia de atividades, ${jogador.nome} retorna ao seu dormitório para finalizar o dia de treino.`
  );
  continuarTexto()
};
