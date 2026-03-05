const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/* Carregar Imagens */
const naveImg = new Image();
naveImg.src = "assets/images/nave.png";

const planeta1 = new Image();
planeta1.src = "assets/images/planeta1.png";

const planeta2 = new Image();
planeta2.src = "assets/images/planeta2.png";

const imagensPlanetas = [planeta1, planeta2];

/*Definição do Objeto Planeta */
class Planeta {
  constructor(imagens) {
    this.imagens = imagens;
    this.tamanho = 250;
    this.raio = this.tamanho / 2;
    this.gerarNovo();
  }

  gerarNovo() {
    /* Garante que o planeta apareça dentro da tela considerando o raio*/
    this.x = Math.random() * (window.innerWidth - this.tamanho) + this.raio;
    this.y = Math.random() * (window.innerHeight - this.tamanho) + this.raio;

    const indiceAleatorio = Math.floor(Math.random() * this.imagens.length);
    this.img = this.imagens[indiceAleatorio];
  }

  desenhar(contexto) {
    if (this.img.complete) {
      contexto.drawImage(
        this.img,
        this.x - this.raio,
        this.y - this.raio,
        this.tamanho,
        this.tamanho,
      );
    }
  }

  detectarColisao(naveX, naveY, naveRaio) {
    const dx = naveX - this.x;
    const dy = naveY - this.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    return distancia < this.raio + naveRaio;
  }
}

/* Inicialização  do primeiro planeta */
const meuPlaneta = new Planeta(imagensPlanetas);
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /*Desenha o Planeta usando o método do objeto*/
  meuPlaneta.desenhar(ctx);

  /* Desenhar Nave*/
  if (naveImg.complete) {
    ctx.drawImage(naveImg, mouseX - 50, mouseY - 50, 100, 100);
  }

  /* Verifica colisão (Nave tem raio 10 porque largura é 100)*/
  if (meuPlaneta.detectarColisao(mouseX, mouseY, 10)) {
    alert("teste");
    meuPlaneta.gerarNovo();
  }

  requestAnimationFrame(draw);
}

draw();
