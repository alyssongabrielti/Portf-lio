const form = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cpf = document.getElementById("cpf");

const msgNome = document.getElementById("msgNome");
const msgEmail = document.getElementById("msgEmail");
const msgCpf = document.getElementById("msgCpf");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valido = true;

  const regexNome = /^[A-Za-zÀ-ÿ\s]+$/;
  if (regexNome.test(nome.value)) {
    nome.className = "valido";
    msgNome.textContent = "Válido";
    msgNome.className = "mensagem valido";
  } else {
    nome.className = "invalido";
    msgNome.textContent = "Inválido";
    msgNome.className = "mensagem invalido";
    valido = false;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regexEmail.test(email.value)) {
    email.className = "valido";
    msgEmail.textContent = "Válido";
    msgEmail.className = "mensagem valido";
  } else {
    email.className = "invalido";
    msgEmail.textContent = "Inválido";
    msgEmail.className = "mensagem invalido";
    valido = false;
  }

  const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (regexCpf.test(cpf.value)) {
    cpf.className = "valido";
    msgCpf.textContent = "Válido";
    msgCpf.className = "mensagem valido";
  } else {
    cpf.className = "invalido";
    msgCpf.textContent = "Inválido";
    msgCpf.className = "mensagem invalido";
    valido = false;
  }

  if (valido) {
    alert("Formulário válido! Pronto para enviar.");
  } else {
    alert("Existem campos inválidos. Corrija antes de enviar.");
  }
});
