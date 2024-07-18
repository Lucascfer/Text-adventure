import readline from "readline-sync";
import { digitarMensagem, continuarTexto } from "../utilidades/utils.js";

// fase que vai ser entre os dias 2 e 3 para determinar uma personalidade chave para o dia 3
export default async (jogador) => {
  const { nome: jogadorNome } = jogador;
  console.clear();

  await digitarMensagem(
    `No caminho de volta para a Academia após um dia de treino, ${jogadorNome} encontra dois colegas brigando. A situação parece tensa e você sente que precisa decidir se vai intervir ou não.`
  );
  continuarTexto();

  let escolhaValida = false;

  while (!escolhaValida) {
    const escolha = readline.question(
      `\nO que ${jogadorNome} vai fazer?\n1. Intervir com magia\n2. Intervir sem magia\n3. Nao intervir\n`
    );

    switch (escolha) {
      case "1":
        await digitarMensagem(
          `\n${jogadorNome} decide usar magia para intervir na briga. Usando suas habilidades mágicas, ${jogadorNome} consegue separar os dois e a situação se acalma rapidamente.`
        );
        jogador.adicionarPersonalidade("determinacao");
        escolhaValida = true;
        break;

      case "2":
        await digitarMensagem(
          `\n${jogadorNome} decide intervir sem usar magia. ${jogadorNome} se aproxima dos colegas e, com palavras calmas e firmes, consegue resolver a situação pacificamente.`
        );
        jogador.adicionarPersonalidade("determinacao", "sociavel");
        escolhaValida = true;
        break;

      case "3":
        await digitarMensagem(
          `\n${jogadorNome} decide não intervir. Observando de longe, ${jogadorNome} espera que a situação se resolva sozinha. Eventualmente, a briga acaba e todos voltam para a Academia.`
        );
        jogador.adicionarPersonalidade("calmo");
        escolhaValida = true;
        break;

      default:
        console.clear();
        await digitarMensagem("\nEscolha inválida. Tente novamente.");
    }
  }

  await digitarMensagem(
    `\n${jogadorNome} continua seu caminho de volta para a Academia, refletindo sobre a decisão que tomou.`
  );
  continuarTexto();
};
