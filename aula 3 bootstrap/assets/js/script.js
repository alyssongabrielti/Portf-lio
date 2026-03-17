document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("userTable");

  table.addEventListener("click", (e) => {
    if (e.target.classList.contains("visualizar")) {
      const row = e.target.closest("tr");
      const id = row.cells[0].textContent;
      const nome = row.cells[1].textContent;
      const email = row.cells[2].textContent;
      const cargo = row.cells[3].textContent;
      alert(`ID: ${id}\nNome: ${nome}\nEmail: ${email}\nCargo: ${cargo}`);
    }

    if (e.target.classList.contains("editar")) {
      const row = e.target.closest("tr");

      const nomeAtual = row.cells[1].textContent;
      const novoNome = prompt("Editar nome:", nomeAtual);
      if (novoNome) {
        row.cells[1].textContent = novoNome;
      }

      const cargoAtual = row.cells[3].textContent;
      const novoCargo = prompt("Editar cargo:", cargoAtual);
      if (novoCargo) {
        row.cells[3].textContent = novoCargo;
      }
    }

    if (e.target.classList.contains("deletar")) {
      const row = e.target.closest("tr");
      row.remove();
    }
  });
});
