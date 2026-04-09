import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMbrhYrFV_NEPJ6phCUpFx_XhdBGI_xdU",
  authDomain: "habitos-diarios-7b2ab.firebaseapp.com",
  projectId: "habitos-diarios-7b2ab",
  storageBucket: "habitos-diarios-7b2ab.appspot.com",
  messagingSenderId: "119949332153",
  appId: "1:119949332153:web:523a6f0ef9f7b9de3c1568",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let habitos = [];
let registros = [];
let grafico;

document.addEventListener("DOMContentLoaded", () => {
  const listaHabitos = document.querySelector("#lista-habitos");
  const formHabito = document.querySelector("#form-habito");
  const inputHabito = document.querySelector("#novo-habito");
  const formHumor = document.querySelector("#form-humor");
  const registrosContainer = document.querySelector("#registros");

  const nomesHumor = {
    1: "Triste",
    2: "Neutro",
    3: "Feliz",
    4: "Muito Feliz",
  };

  const emojis = {
    1: "😢",
    2: "😐",
    3: "🙂",
    4: "😁",
  };

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  class Habito {
    constructor(nome) {
      const agora = new Date().toLocaleString("pt-BR");
      this.nome = nome;
      this.status = "pendente";
      this.criadoEm = agora;
      this.historico = [
        {
          status: "pendente",
          horario: agora,
        },
      ];
    }
  }

  const salvarNoFirebase = async () => {
    try {
      await setDoc(doc(db, "usuarios", "meu_id_unico"), {
        habitos,
        registros,
      });
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  };

  const carregarDadosFirebase = async () => {
    try {
      const snap = await getDoc(doc(db, "usuarios", "meu_id_unico"));
      if (snap.exists()) {
        const dados = snap.data();
        habitos = dados.habitos || [];
        registros = dados.registros || [];
      }
    } catch (err) {
      console.error("Erro ao carregar:", err);
    }

    renderizarHabitos();
    renderizarRegistros();
    atualizarGrafico();
  };

  function renderizarHabitos() {
    listaHabitos.innerHTML = "";

    habitos.forEach((h, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
      <div class="info-habito">
        <span class="nome">${h.nome}</span>
        <small>Criado em: ${h.criadoEm}</small>
      </div>
      <span class="badge ${h.status}">
        ${h.status}
      </span>
      `;

      const select = document.createElement("select");

      ["pendente", "andamento", "concluido"].forEach((s) => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;

        if (h.status === s) opt.selected = true;

        select.appendChild(opt);
      });

      select.onchange = async (e) => {
        const agora = new Date().toLocaleString("pt-BR");

        h.status = e.target.value;

        h.historico.push({
          status: h.status,
          horario: agora,
        });

        await salvarNoFirebase();

        renderizarHabitos();
      };

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏️";

      btnEditar.onclick = async () => {
        const novo = prompt("Editar hábito:", h.nome);

        if (novo) {
          h.nome = novo;
          await salvarNoFirebase();
          renderizarHabitos();
        }
      };

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "🗑️";

      btnExcluir.onclick = async () => {
        if (confirm("Excluir hábito?")) {
          habitos.splice(index, 1);
          await salvarNoFirebase();
          renderizarHabitos();
        }
      };

      li.appendChild(select);
      li.appendChild(btnEditar);
      li.appendChild(btnExcluir);

      listaHabitos.appendChild(li);
    });
  }

  function renderizarRegistros(lista = registros) {
    registrosContainer.innerHTML = "";

    lista
      .slice()
      .reverse()
      .forEach((r) => {
        const div = document.createElement("div");

        div.className = "registro";

        div.innerHTML = `
        <div class="registro-header">
          <strong>${r.data}${r.hora ? " " + r.hora : ""}</strong>
          <span class="nome-humor humor-${r.nivel}">
            ${emojis[r.nivel]} ${nomesHumor[r.nivel]}
          </span>
        </div>
        ${r.observacao ? `<span class="registro-obs">${r.observacao}</span>` : ""}
        `;

        registrosContainer.appendChild(div);
      });
  }

  document.querySelectorAll(".humor-icons figure").forEach((fig) => {
    fig.addEventListener("click", () => {
      document.querySelector("#nivel-humor").value = fig.dataset.nivel;

      document
        .querySelectorAll(".humor-icons figure")
        .forEach((f) => f.classList.remove("selecionado"));

      fig.classList.add("selecionado");
    });
  });

  formHumor?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const now = new Date();

    const data = now.toISOString().split("T")[0];

    const hora = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const nivel = document.querySelector("#nivel-humor").value;

    const obs = document.querySelector("#observacao-humor").value;

    if (!nivel) {
      alert("Selecione um humor");
      return;
    }

    registros.push({
      data,
      hora,
      nivel: Number(nivel),
      observacao: obs,
    });

    formHumor.reset();

    document
      .querySelectorAll(".humor-icons figure")
      .forEach((f) => f.classList.remove("selecionado"));

    await salvarNoFirebase();

    renderizarRegistros();

    atualizarGrafico();
  });

  function atualizarGrafico() {
    const ctx = document.getElementById("graficoHumor");

    if (!ctx) return;

    const ultimos = registros.slice(-7);

    const labels = ultimos.map((r) => {
      const [ano, mes, dia] = r.data.split("-");
      const dataLocal = new Date(ano, mes - 1, dia);
      return diasSemana[dataLocal.getDay()];
    });
    const dados = ultimos.map((r) => r.nivel);

    if (grafico) grafico.destroy();

    grafico = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Humor",
            data: dados,
            borderColor: "#32cd32",
            backgroundColor: "rgba(50,205,50,0.2)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: { color: "#ffffff" },
          },
          tooltip: {
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
          },
        },
        scales: {
          x: {
            ticks: { color: "#ffffff" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
          y: {
            min: 1,
            max: 4,
            ticks: {
              stepSize: 1,
              color: "#ffffff",
            },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
        },
      },
    });
  }

  function aplicarFiltro() {
    const data = document.querySelector("#filtro-data").value;
    const humor = document.querySelector("#filtro-humor").value;

    let filtrados = registros;

    if (data) filtrados = filtrados.filter((r) => r.data === data);

    if (humor) filtrados = filtrados.filter((r) => r.nivel == humor);

    renderizarRegistros(filtrados);
  }

  document
    .querySelector("#aplicar-filtro")
    ?.addEventListener("click", aplicarFiltro);
  document
    .querySelector("#filtro-data")
    ?.addEventListener("change", aplicarFiltro);
  document
    .querySelector("#filtro-humor")
    ?.addEventListener("change", aplicarFiltro);

  document.querySelector("#limpar-filtro")?.addEventListener("click", () => {
    document.querySelector("#filtro-data").value = "";
    document.querySelector("#filtro-humor").value = "";
    renderizarRegistros(registros);
  });

  document.querySelector("#filtro-semana")?.addEventListener("click", () => {
    const hoje = new Date();
    const seteDias = new Date();
    seteDias.setDate(hoje.getDate() - 7);

    const filtrados = registros.filter((r) => {
      const dataRegistro = new Date(r.data);
      return dataRegistro >= seteDias;
    });

    renderizarRegistros(filtrados);
  });

  formHabito?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = inputHabito.value.trim();

    if (!nome) return;

    habitos.push(new Habito(nome));

    inputHabito.value = "";

    await salvarNoFirebase();

    renderizarHabitos();
  });

  carregarDadosFirebase();
});
