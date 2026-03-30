// Classe base
class Usuario {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
  exibirPerfil() {
    return `Nome: ${this.nome} <br>Email: ${this.email}`;
  }
}

// Subclasse Aluno
class Aluno extends Usuario {
  constructor(nome, email, senha, turma) {
    super(nome, email, senha);
    this.turma = turma;
  }
  exibirPerfil() {
    return `Nome: ${this.nome} <br>Email: ${this.email} <br>Turma: ${this.turma}`;
  }
}

class Professor extends Usuario {
  constructor(nome, email, senha, materias) {
    super(nome, email, senha);
    this.materias = materias;
  }
  exibirPerfil() {
    return `Nome: ${this.nome} <br>Email: ${this.email} <br>Matérias: ${this.materias.join(", ")}`;
  }
}

const usuarios = [
  new Aluno("Maria", "maria@escola.com", "1234", "Turma A"),
  new Aluno("João", "joao@escola.com", "abcd", "Turma B"),
  new Professor("Carlos", "carlos@escola.com", "prof123", [
    "Matemática",
    "Física",
  ]),
  new Professor("Ana", "ana@escola.com", "prof123", [
    "Português",
    "Literatura",
  ]),
];

const loginForm = document.getElementById("loginForm");
const erro = document.getElementById("erro");
const perfilDiv = document.getElementById("perfil");
const loginArea = document.getElementById("loginArea");
const perfilArea = document.getElementById("perfilArea");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const usuarioEncontrado = usuarios.find(
    (u) => u.email === email && u.senha === senha,
  );

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    mostrarPerfil();
  } else {
    erro.innerHTML = "Email ou senha incorretos!";
  }
});

function mostrarPerfil() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (usuarioLogado) {
    let usuario;
    if (usuarioLogado.turma) {
      usuario = new Aluno(
        usuarioLogado.nome,
        usuarioLogado.email,
        usuarioLogado.senha,
        usuarioLogado.turma,
      );
    } else {
      usuario = new Professor(
        usuarioLogado.nome,
        usuarioLogado.email,
        usuarioLogado.senha,
        usuarioLogado.materias,
      );
    }
    perfilDiv.innerHTML = usuario.exibirPerfil();
    loginArea.style.display = "none";
    perfilArea.style.display = "block";
  }
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  perfilArea.style.display = "none";
  loginArea.style.display = "block";
});

mostrarPerfil();
