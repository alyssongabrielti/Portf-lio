document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const alert = document.querySelector(".alert");
    if (alert) {
      alert.classList.add("fade");
      setTimeout(() => alert.remove(), 1000);
    }
  }, 5000);

  const cardButtons = document.querySelectorAll(".card .btn");
  cardButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(`Botão "${btn.textContent}" foi clicado!`);
      alert(`Você clicou em: ${btn.textContent}`);
    });
  });

  const badge = document.querySelector(".badge");
  if (badge) {
    badge.addEventListener("click", () => {
      alert("Você tem 5 novas notificações!");
    });
  }
});
