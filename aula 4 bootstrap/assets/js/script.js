const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();

  if (form.checkValidity()) {
    successMessage.classList.remove("d-none");
    form.classList.remove("was-validated");
    form.reset();
  } else {
    form.classList.add("was-validated");
  }
});
