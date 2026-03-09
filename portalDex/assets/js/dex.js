const dados = [
  {
    nome: "Turing",
    descricao:
      "A Máquina de Turing é um modelo matemático teórico, concebido por Alan Turing em 1936, que serve como o alicerce fundamental da ciência da computação moderna.",
    imagem: "./assets/images/turing.jpg",
  },
  {
    nome: "Ada Lovelace",
    descricao:
      "Escritora e matemática inglesa, reconhecida por ter escrito o primeiro algoritmo a ser processado por uma máquina, sendo a primeira programadora da história.",
    imagem: "./assets/images/Ada.jpg",
  },
  {
    nome: "Santos Dumont",
    descricao:
      "Conhecido como o Pai da Aviação, o inventor brasileiro imortalizou seu nome na história em 23 de outubro de 1906. Naquele dia, em Paris, ele decolou com o 14-bis.",
    imagem: "./assets/images/santos dumontjpg.jpg",
  },
  {
    nome: "Vital Brazil",
    descricao:
      "Renomado médico e cientista brasileiro, foi o pioneiro mundial na descoberta da especificidade dos soros antiofídicos. Fundador do Instituto Butantan.",
    imagem: "./assets/images/Vital.jpg",
  },
  {
    nome: "Grace Hopper",
    descricao:
      "Analista de sistemas e contra-almirante da Marinha dos EUA, foi uma das mentes mais brilhantes da computação. Conhecida como a Vovó do COBOL.",
    imagem: "./assets/images/Grace Hopper.jpg",
  },
  {
    nome: "IBM",
    descricao:
      "Conhecida como Big Blue, a IBM é um dos maiores pilares da tecnologia mundial. Pioneira na criação de mainframes e do IBM PC.",
    imagem: "./assets/images/ibm.jpg",
  },
  {
    nome: "Microsoft",
    descricao:
      "Fundada por Bill Gates e Paul Allen em 1975, a Microsoft revolucionou a tecnologia com o Windows, padronizando a interface gráfica.",
    imagem: "./assets/images/Microsoft.png",
  },
  {
    nome: "Google",
    descricao:
      "Fundada por Larry Page e Sergey Brin em 1998, a empresa revolucionou a internet com seu motor de busca, organizando a informação mundial.",
    imagem: "./assets/images/google.jpeg",
  },
  {
    nome: "Amazon",
    descricao:
      "Fundada por Jeff Bezos em 1994, a Amazon revolucionou a logística global. Sua maior importância tecnológica reside na AWS (Amazon Web Services).",
    imagem: "./assets/images/amazon.png",
  },
  {
    nome: "The Onion Router",
    descricao:
      "O Tor é uma rede que protege a identidade dos usuários ao rotear o tráfego por múltiplas camadas de criptografia, defendendo o anonimato digital.",
    imagem: "./assets/images/The Onion Router.jpg",
  },
];

let indiceAtual = 0;

const imgElem = document.getElementById("img_personagem");
const tituloElem = document.getElementById("titulo_nome");
const textoElem = document.getElementById("texto_descricao");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

function renderizarPersonagem() {
  const info = dados[indiceAtual];
  imgElem.src = info.imagem;
  tituloElem.innerText = info.nome;
  textoElem.innerText = info.descricao;
}

btnNext.addEventListener("click", () => {
  if (indiceAtual < dados.length - 1) {
    indiceAtual++;
    renderizarPersonagem();
  }
});

btnPrev.addEventListener("click", () => {
  if (indiceAtual > 0) {
    indiceAtual--;
    renderizarPersonagem();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const busca = input.value.toLowerCase().trim();

  if (busca === "") return;

  const achado = dados.findIndex((item) =>
    item.nome.toLowerCase().includes(busca),
  );

  if (achado !== -1) {
    indiceAtual = achado;
    renderizarPersonagem();
    input.value = "";
  } else {
    alert("Nenhum resultado encontrado para: " + input.value);
  }
});

renderizarPersonagem();
