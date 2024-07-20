import { digitarMensagem, continuarTexto, escolherProva } from "../utilidades/utils.js";
import { useMontarProvas } from "../utilidades/hookProvas.js";

// Dia que o jogador vai escolher fazer as provas de ar e fogo
export default async (jogador) => {
  const { ar, fogo, Prova } = useMontarProvas();

  await digitarMensagem(
    `Após passar pelo primeiro dia de provas e uma noite de sono, ${jogador.nome} agora se prepara para enfrentar os desafios dos elementos restantes. Gandor, o Mestre dos Elementos, está novamente presente para guiá-lo através dessas provas.`
  );

  const provas = {
    fogo: new Prova(fogo),
    ar: new Prova(ar),
  };

  await escolherProva(jogador, provas);
};
