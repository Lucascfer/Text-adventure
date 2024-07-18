export default class Feiticeiro {
  constructor(nome) {
    this.nome = nome;
    this.nivel = 1;
    this.habilidades = [];
    this.personalidades = [];
  }

  levelUp() {
    this.nivel++;
    console.log("LEVEL UP!");
    this.mostrarStatus();
  }

  // Aprendendo habilidades, a maestria e 'iniciante' como padrão
  aprenderHabilidade(habilidade, maestria = "iniciante") {
    this.habilidades.push({ nome: habilidade, maestria: maestria});
    console.log(`\nHabilidade adicionada: ${habilidade} (${maestria})\n`);
    this.levelUp();
  }

  // As pesonalidades irão determinar quais habilidades o feiticeiro pode aprender
  adicionarPersonalidade(personalidade) {
    this.personalidades.push(personalidade);
    console.log(`\nPersonalidade adicionada: ${personalidade}\n`);
    this.levelUp();
  }

  mostrarStatus() {
    console.log(`\n${this.nome} | Nível: ${this.nivel}`);
    console.log("Personalidades:", this.personalidades.join(", "));
    console.log("Habilidades:", this.habilidades.map(h => `${h.nome} (${h.maestria})`).join(", "));
  }
}