import readline from "readline-sync";
import { digitarMensagem, continuarTexto } from "../utilidades/utils.js";

// A primeira fase é apenas uma introdução que determina o primeiro traço de personalidade do jogador com base em sua escolha
export default async (jogador) => {
  const { nome: jogadorNome } = jogador;
  console.clear();
  await digitarMensagem(
    `Em um reino distante, onde a magia permeia cada aspecto da vida, existem poucas coisas mais respeitadas do que o título de Grande Feiticeiro.\n
    Você, ${jogadorNome}, é um jovem aprendiz com grandes ambições e um coração valente. Desde criança, você sonhava em dominar as artes místicas e trazer honra à sua família. Hoje, esse sonho começa a se tornar realidade. Você foi aceito na Academia de Magia, a instituição mais prestigiada do reino, onde apenas os mais talentosos são treinados.\n`
  );
  continuarTexto();

  await digitarMensagem(
    `Mas o caminho para se tornar um Grande Feiticeiro não será fácil. Serão necessárias coragem, inteligência e determinação para enfrentar as provas que se aproximam.\n
    Cada prova testará suas habilidades de maneiras diferentes, exigindo que você pense estrategicamente e tome decisões sábias.\nPrepare-se, jovem ${jogadorNome}. Sua jornada está prestes a começar!\n`
  );
  continuarTexto();

  // Iniciar a jornada
  await digitarMensagem(
    "Você se encontra na entrada da Academia de Magia. A sua frente, há dois caminhos: um leva ao refeitório, onde pode conhecer outros aprendizes, e o outro leva ao seu quarto, onde pode descansar e se preparar para as aulas.\n"
  );

  let escolha = "";
  while (!escolha) {
    escolha = readline
      .question("Voce deseja ir para o 'refeitorio' ou para o 'quarto'? ")
      .toLowerCase();
  }

  if (escolha === "refeitorio") {
    await digitarMensagem(
      `${jogadorNome} decide ir ao refeitorio. Ao entrar, é recebido por um ambiente vibrante e acolhedor, onde vários aprendizes estão conversando e se conhecendo.\n`
    );
    continuarTexto();

    await digitarMensagem(
      `Depois de um tempo, ${jogadorNome} começa a conversar com outros feiticeiros que vieram de várias partes do mundo. Você conhecem alguns dos mais talentosos e mais poderosos feiticeiros do reino.\n`
    );
    continuarTexto();

    await digitarMensagem(
      "Você descobre que há certos grupinhos de feiticeiros, cada um com uma personalidade marcante. Porém, sendo calouro e de um nível iniciante, você abaca por não se encaixar com os demais, tendo apenas uma afinidade com outro calouro que veio do lado oposto do reino que você nasceu, o Ethan.\n"
    );
    continuarTexto();

    await digitarMensagem(
      `Depois de muita conversa, ${jogadorNome} e Ethan acabam por ir para seus respectivos dormitórios.\nÉ um lugar confortável e agradação para descansar e relaxar.\n`
    );
    jogador.adicionarPersonalidade("sociavel")
    return
  } else if (escolha === "quarto") {
    await digitarMensagem(
      `${jogadorNome} decide ir para o seu quarto. Ao entrar, encontra um espaço tranquilo e confortável, perfeito para descansar e refletir sobre a jornada que está por vir.\n`
    );
    continuarTexto();

    await digitarMensagem(
      `Depois de organizar as suas coisas e arrumar o quarto, ${jogadorNome}pode descansar e se preparar para o seu novo desafio:\n
      se tornar um dos maiores feiticeiros do reino.\n`
    );
    jogador.adicionarPersonalidade("reflexivo")
    return
  }
};
