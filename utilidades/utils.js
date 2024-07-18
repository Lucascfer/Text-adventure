import readline from "readline-sync";
import { useMontarProvas } from "./hookProvas.js";

// Função auxiliares para deixar o código mais limpo
export async function introducao() {
  await digitarMensagem("Bem-vindo à Jornada do Aprendiz Mágico!\n");
  await digitarMensagem(
    "Está pronto para começar uma jornada de aprendizagem no universo da magia?\n"
  );
  
  let resposta = "";
  while (!resposta) {
    resposta = readline.question("Digite 's'(sim) ou 'n'(nao): ");
    if (resposta.toLowerCase() === "s") {
      await digitarMensagem("\nÓtimo! Vamos começar a sua jornada.\n");
    } else if (resposta.toLowerCase() === "n") {
      await digitarMensagem("\nTalvez em outra ocasião. Até logo!\n");
      process.exit();
    } else {
      console.clear();
      console.log("\nResposta inválida\n");
      resposta = "";
    }
  }
}

// Função continuarTexto: Aguarda uma resposta do jogador para continuar as mensagens do jogo
export function continuarTexto() {
  readline.question("\nPressione 'Enter' para continuar...");
  console.clear();
}

// Função delay: Essa função cria um atraso utilizando setTimeout dentro de uma Promise
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Função digitarMensagem: Utiliza o delay para exibir cada caractere da mensagem com um intervalo de tempo especificado (35ms por padrão)
export async function digitarMensagem(mensagem, intervalo = 35) {
  for (const char of mensagem) {
    process.stdout.write(char);
    await delay(intervalo);
  }
  console.log();
}

export async function escolherProva(jogador, provas) {
  const { Fases } = useMontarProvas();
  const { nome: jogadorNome } = jogador;
  const listaProvas = Object.keys(provas);
  
  while (listaProvas) {
    const exames = listaProvas
    .map(
      (exa, index) =>
        `${index + 1}. Prova de ${exa.charAt(0).toUpperCase() + exa.slice(1)}`
    )
    .join("\n");
    const escolha = readline.question(
      `\nQual prova deseja fazer? (digite '0' para sair)\n${exames}\n`
    );
    
    if (escolha === "0") {
      console.clear();
      await digitarMensagem(`\n${jogadorNome} decidiu sair.\n`);
      break;
    }
    
    let provaEscolhida;
    if (escolha !== "0" && escolha <= listaProvas.length) {
      provaEscolhida = listaProvas[escolha - 1];
    } else {
      await digitarMensagem("\nEscolha inválida. Tente novamente.\n");
      continue;
    }

    let exame = provas[provaEscolhida];
    await Fases(jogador, exame);
    
    const retorno = readline.question("\nDeseja fazer a outra prova? (s/n): ");
    if (retorno.toLowerCase() === "n") {
      await digitarMensagem(
        `\n${jogadorNome} decidiu parar por hoje. Até logo!\n`
      );
      break;
    }
  }
}
