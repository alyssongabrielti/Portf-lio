//desafio 2 de js avançado

Array.prototype.meuMap = function (callback) {
  const resultado = [];
  for (let i = 0; i < this.length; i++) {
    resultado.push(callback(this[i], i, this));
  }
  return resultado;
};

Array.prototype.meuFilter = function (callback) {
  const resultado = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      resultado.push(this[i]);
    }
  }
  return resultado;
};

Array.prototype.meuReduce = function (callback, valorInicial) {
  let acumulador = valorInicial !== undefined ? valorInicial : this[0];
  let inicio = valorInicial !== undefined ? 0 : 1;

  for (let i = inicio; i < this.length; i++) {
    acumulador = callback(acumulador, this[i], i, this);
  }
  return acumulador;
};

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const quadrados = numeros.meuMap((n) => n * n);
console.log("Quadrados:", quadrados);

const pares = numeros.meuFilter((n) => n % 2 === 0);
console.log("Pares:", pares);

const soma = numeros.meuReduce((acc, n) => acc + n, 0);
console.log("Soma:", soma);

const nomes = ["Ana", "Bruno", "Carlos", "Daniela", "Eduardo", "Fernanda"];

const maiusculas = nomes.meuMap((nome) => nome.toUpperCase());
console.log("Maiúsculas:", maiusculas);

const longos = nomes.meuFilter((nome) => nome.length > 5);
console.log("Nomes longos:", longos);

const concatenado = nomes.meuReduce((acc, nome) => acc + " - " + nome);
console.log("Concatenado:", concatenado);
