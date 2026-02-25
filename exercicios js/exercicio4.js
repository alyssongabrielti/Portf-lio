/*Desafio 4
JS Básico
Crie um programa simples que simula um gerenciador de lista de compras. O usuário
poderá adicionar itens à lista, remover itens e visualizar a lista de compras. O programa
deve usar vetores (arrays) e funções para organizar o código.
Instalando e Usando o Prompt no Node.js:
Como estamos usando o Node.js, não temos o prompt() nativo do navegador. Para capturar
a entrada do usuário no terminal, podemos usar a biblioteca prompt-sync.
Passo 1: Instalar o prompt-sync
Abra o terminal na pasta do projeto e execute o seguinte comando:
npm install prompt-sync
Passo 2: Importar o módulo no código
No início do arquivo .js, importe o prompt-sync:
const prompt = require("prompt-sync")();
Agora podemos capturar a entrada do usuário com:
let nome = prompt("Digite seu nome: ");
console.log(`Olá, ${nome}!`);
Regras:
1. O programa deve ter um array chamado listaDeCompras que começa vazio.
2. Deve oferecer as seguintes opções ao usuário:
o Adicionar um item à lista.
o Remover um item da lista.
o Exibir os itens da lista.
o Sair do programa.
3. O programa deve rodar até que o usuário escolha sair.
4. As funções devem ser utilizadas para organizar as operações principais:
o adicionarItem(item): Adiciona um item ao array.
o removerItem(item): Remove um item do array (se existir).
o exibirLista(): Mostra todos os itens da lista no console.
Dicas:
 Use console.log() para exibir mensagens.
 Para manter o programa rodando, utilize um loop while e um switch-case para as
opções.
 Você pode pesquisar na internet como usar ou como fazer alguma parte do
programa, mas tente não usar IA para resolver o desafio, não engane a si mesmo.
Exemplo do funcionamento:
1 - Adicionar item
2 - Remover item
3 - Exibir lista
4 - Sair
Escolha uma opção: 1
Digite o nome do item: pão
Item "pão" adicionado!
1 - Adicionar item ok
2 - Remover item ok
3 - Exibir lista  OK    */

const prompt = require("prompt-sync")();

let listaDeCompras = [];

const adicionarItem = function(item) {
    listaDeCompras.push(item);
    console.log(`Item "${item}" adicionado à lista`);
};

function removerItem(item) {
    const index = listaDeCompras.indexOf(item);
    if (index !== -1) {
        listaDeCompras.splice(index, 1);
        console.log(`Item "${item}" removido`);
    } else {
        console.log("Item não encontrado");
    }
}

function exibirLista() {
    if (listaDeCompras.length === 0) {
        console.log("A lista está vazia.");
    } else {
        console.log("--- Itens na Lista ---");
        listaDeCompras.forEach((item, i) => {
            console.log(`${i + 1}. ${item}`);
        });
    }
}

let     terminar = true;

while (terminar) {
    console.log("1 - Adicionar item\n\n 2 - Remover item\n\n 3 - Exibir lista\n\n 4 - Sair");
    const menu = prompt("Escolha uma opção: ");

    switch (menu) {
        case "1":
            const novoItem = prompt("Digite o nome do item: ");
            adicionarItem(novoItem);
            break;
        case "2":
            const itemParaRemover = prompt("Digite o item que deseja  remover: ");
            removerItem(itemParaRemover);
            break;
        case "3":
            exibirLista();
            break;  
        case "4":
            console.log("Até mais!");
            rodando = false;
            break;

    }
}

