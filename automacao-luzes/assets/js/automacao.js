class CentralDeLuzes {
  constructor() {
    if (CentralDeLuzes.instance) {
      return CentralDeLuzes.instance;
    }
    CentralDeLuzes.instance = this;
  }

  static getInstance() {
    if (!CentralDeLuzes.instance) {
      CentralDeLuzes.instance = new CentralDeLuzes();
    }
    return CentralDeLuzes.instance;
  }

  ligar(comodo) {
    const div = document.getElementById(comodo);
    if (div) {
      div.style.backgroundColor = "rgb(17, 188, 201)";
      div.style.color = "black";
      this._mostrarStatus(`Luz do ${comodo} ligada`);
    }
  }

  desligar(comodo) {
    const div = document.getElementById(comodo);
    if (div) {
      div.style.backgroundColor = "#222";
      div.style.color = "white";
      this._mostrarStatus(`Luz do ${comodo} desligada`);
    }
  }

  _mostrarStatus(mensagem) {
    document.getElementById("status").textContent = mensagem;
  }
}

const central = CentralDeLuzes.getInstance();

document.querySelectorAll("button").forEach((botao) => {
  botao.addEventListener("click", () => {
    const comodo = botao.getAttribute("data-comodo");
    const acao = botao.getAttribute("data-acao");

    if (acao === "ligar") {
      central.ligar(comodo);
    } else {
      central.desligar(comodo);
    }
  });
});
