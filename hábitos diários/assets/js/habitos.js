import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMbrhYrFV_NEPJ6phCUpFx_XhdBGI_xdU",
  authDomain: "habitos-diarios-7b2ab.firebaseapp.com",
  projectId: "habitos-diarios-7b2ab",
  storageBucket: "habitos-diarios-7b2ab.appspot.com",
  messagingSenderId: "119949332153",
  appId: "1:119949332153:web:523a6f0ef9f7b9de3c1568",
  measurementId: "G-SNXX8NM44E",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const nomesHumor = { 1: "Triste", 2: "Neutro", 3: "Feliz", 4: "Muito Feliz" };
let habitos = [];
let registros = [];
let graficoHumor;

const listaHabitos = document.querySelector("#lista-habitos");
const formHabito = document.querySelector("#form-habito");
const inputHabito = document.querySelector("#novo-habito");
const registrosContainer = document.querySelector("#registros");
const containerHabitos = document.querySelector(".Habitos");
let contadorDiv = document.querySelector("#contador-habitos");

if (!contadorDiv && containerHabitos) {
  contadorDiv = document.createElement("div");
  contadorDiv.id = "contador-habitos";
  containerHabitos.appendChild(contadorDiv);
}

class Humor {
  constructor(data, nivel, observacao = "") {
    this.data = data;
    this.nivel = Number(nivel);
    this.observacao = observacao;
  }
  getEmoji() {
    const emojis = { 1: "😢", 2: "😐", 3: "😊", 4: "😁" };
    return emojis[this.nivel] || "❓";
  }
}

class Habito {
  constructor(nome, status = "pendente") {
    const agora = new Date().toLocaleString("pt-BR");
    this.nome = nome;
    this.status = status;
    this.criadoEm = agora;
    this.historico = [{ status: status, horario: agora }];
  }
}

const salvarNoFirebase = async () => {
  try {
    await setDoc(doc(db, "usuarios", "meu_id_unico"), {
      habitos: habitos,
      registros: registros,
    });
    console.log("Dados sincronizados com o Firebase!");
  } catch (e) {
    console.error("Erro ao salvar no Firebase:", e);
  }
};

const carregarDadosFirebase = async () => {
  try {
    const docSnap = await getDoc(doc(db, "usuarios", "meu_id_unico"));
    if (docSnap.exists()) {
      const dados = docSnap.data();
      habitos = dados.habitos || [];
      registros = dados.registros || [];
      renderizarHabitos();
      renderizarRegistros();
      if (typeof atualizarGrafico === "function") atualizarGrafico();
    }
  } catch (e) {
    console.error("Erro ao carregar do Firebase:", e);
  }
};

function renderizarHabitos() {
  if (!listaHabitos) return;
  listaHabitos.innerHTML = "";

  habitos.forEach((h, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="info-habito">
        <span class="nome">${h.nome}</span>
        <small class="data-criacao">Criado em: ${h.criadoEm || "n/a"}</small>
      </div>
      <span class="badge ${h.status}">${h.status}</span>
      <select class="select-status">
        <option value="pendente" ${h.status === "pendente" ? "selected" : ""}>Pendente</option>
        <option value="andamento" ${h.status === "andamento" ? "selected" : ""}>Andamento</option>
        <option value="concluido" ${h.status === "concluido" ? "selected" : ""}>Concluído</option>
      </select>
      <button class="editar">✏️</button>
      <button class="excluir">🗑️</button>
    `;

    li.querySelector(".select-status").onchange = async (e) => {
      const novoStatus = e.target.value;
      h.status = novoStatus;
      h.historico.push({
        status: novoStatus,
        horario: new Date().toLocaleString("pt-BR"),
      });
      await salvarNoFirebase();
      renderizarHabitos();
    };

    li.querySelector(".editar").onclick = async () => {
      const novoNome = prompt("Editar hábito:", h.nome);
      if (novoNome?.trim()) {
        h.nome = novoNome.trim();
        await salvarNoFirebase();
        renderizarHabitos();
      }
    };

    li.querySelector(".excluir").onclick = async () => {
      habitos.splice(index, 1);
      await salvarNoFirebase();
      renderizarHabitos();
    };

    listaHabitos.appendChild(li);
  });
  atualizarContador();
}

function atualizarContador() {
  if (!contadorDiv) return;
  const stats = {
    total: habitos.length,
    concluido: habitos.filter((h) => h.status === "concluido").length,
  };
  contadorDiv.innerHTML = `<p>Total: ${stats.total} | Concluídos: ${stats.concluido}</p>`;
}

function renderizarRegistros(listaParaExibir = registros) {
  if (!registrosContainer) return;
  registrosContainer.innerHTML = "";
  [...listaParaExibir].reverse().forEach((r) => {
    const humorObj = new Humor(r.data, r.humor.nivel, r.humor.observacao);
    const div = document.createElement("div");
    div.className = "registro";
    div.innerHTML = `
      <strong>${r.data}</strong> - Humor: ${humorObj.getEmoji()} ${nomesHumor[r.humor.nivel]}
    `;
    registrosContainer.appendChild(div);
  });
}

formHabito?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = inputHabito.value.trim();
  if (nome) {
    habitos.push(new Habito(nome));
    inputHabito.value = "";
    await salvarNoFirebase();
    renderizarHabitos();
  }
});

carregarDadosFirebase();
