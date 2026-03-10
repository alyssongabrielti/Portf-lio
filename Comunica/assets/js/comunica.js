// --- SELEÇÃO DE ELEMENTOS ---
const btnFalar = document.getElementById("btnFalar");
const btnLimpar = document.getElementById("btnLimpar");
const campoTexto = document.getElementById("texto");
const seletorVozes = document.getElementById("seletorVozes");
const btnSalvar = document.getElementById("btnSalvar");
const inputNovaFrase = document.getElementById("novaFrase");
const listaAtalhos = document.getElementById("listaAtalhos");
const btnResetar = document.getElementById("btnResetar");

let vozes = [];

// --- CONFIGURAÇÃO DA VOZ (TTS) ---
function carregarVozes() {
  // Busca vozes do sistema (Windows, Android, iOS)
  vozes = window.speechSynthesis.getVoices();

  // Preenche o select com as vozes disponíveis
  seletorVozes.innerHTML = vozes
    .map(
      (voz, index) =>
        `<option value="${index}">${voz.name} (${voz.lang})</option>`,
    )
    .join("");
}

// Evento necessário para carregar as vozes em navegadores como Chrome
if (window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = carregarVozes;
}
carregarVozes();

function falar(mensagem) {
  if ("speechSynthesis" in window) {
    // Cancela falas anteriores para não acumular áudio
    window.speechSynthesis.cancel();

    const utterThis = new SpeechSynthesisUtterance(mensagem);

    // Aplica a voz selecionada no menu
    const vozSelecionada = vozes[seletorVozes.value];
    if (vozSelecionada) {
      utterThis.voice = vozSelecionada;
    }

    utterThis.lang = "pt-BR";
    utterThis.rate = 0.9; // Velocidade levemente reduzida para clareza
    window.speechSynthesis.speak(utterThis);
  }
}

// --- GERENCIAMENTO DE FRASES (LOCALSTORAGE) ---

// Tenta carregar frases do navegador; se não houver, usa as iniciais
let frases = JSON.parse(localStorage.getItem("comunica_frases")) || [
  "Olá",
  "Tudo bem?",
  "Obrigado",
  "Preciso de ajuda",
];

function renderizarAtalhos() {
  // Limpa a tela antes de desenhar os botões
  listaAtalhos.innerHTML = "";

  frases.forEach((frase, index) => {
    // Wrapper (Envelope) do botão adaptável
    const wrapper = document.createElement("div");
    wrapper.className = "btn-frase-wrapper";

    // Botão de fala
    const btnFala = document.createElement("button");
    btnFala.className = "btn-fala";
    btnFala.innerText = frase;

    // EVENTO: Falar ao clicar
    btnFala.onclick = () => {
      campoTexto.value = frase;
      falar(frase);
    };

    // EVENTO: Falar ao passar o mouse (Hover-to-speech)
    btnFala.onmouseenter = () => {
      falar(frase);
    };

    // EVENTO: Parar de falar ao tirar o mouse
    btnFala.onmouseleave = () => {
      window.speechSynthesis.cancel();
    };

    // Botão de Excluir individual (X)
    const btnX = document.createElement("button");
    btnX.className = "btn-excluir";
    btnX.innerHTML = "✕";
    btnX.title = "Excluir frase";
    btnX.onclick = (e) => {
      e.stopPropagation(); // Impede que o botão de fala seja ativado
      excluirFrase(index);
    };

    wrapper.appendChild(btnFala);
    wrapper.appendChild(btnX);
    listaAtalhos.appendChild(wrapper);
  });
}

function excluirFrase(index) {
  if (confirm("Deseja excluir esta frase?")) {
    frases.splice(index, 1);
    salvarFrases();
    renderizarAtalhos();
  }
}

function salvarFrases() {
  localStorage.setItem("comunica_frases", JSON.stringify(frases));
}

// --- EVENTOS DE INTERAÇÃO ---

// Salvar nova frase personalizada
btnSalvar.addEventListener("click", () => {
  const texto = inputNovaFrase.value.trim();
  if (texto) {
    frases.push(texto);
    salvarFrases();
    inputNovaFrase.value = "";
    renderizarAtalhos();
  }
});

// Suporte para salvar frase apertando a tecla "Enter"
inputNovaFrase.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btnSalvar.click();
});

// Falar texto digitado manualmente
btnFalar.addEventListener("click", () => {
  if (campoTexto.value) falar(campoTexto.value);
});

// Limpar campo de texto e parar áudio
btnLimpar.addEventListener("click", () => {
  campoTexto.value = "";
  window.speechSynthesis.cancel();
});

// Limpar TODAS as frases salvas
if (btnResetar) {
  btnResetar.addEventListener("click", () => {
    if (confirm("Isso apagará todas as frases rápidas. Tem certeza?")) {
      frases = [];
      localStorage.removeItem("comunica_frases");
      renderizarAtalhos();
    }
  });
}

renderizarAtalhos();
