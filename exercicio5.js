/*   
Desafio 5
JS Básico
Crie um programa simples que permite ao usuário gerenciar um cadastro de pessoas.
Cada pessoa terá um nome, idade e e-mail armazenados como um objeto dentro de um
array. O usuário poderá adicionar, remover e listar os cadastros.
Regras:
1. O programa deve armazenar os usuários em um array de objetos, onde cada
objeto representa uma pessoa com as propriedades:
o nome ok
o idade ok
o email ok
2. O usuário poderá escolher entre as seguintes opções:
o Adicionar um novo usuário. ok
o Remover um usuário pelo email. ok
o Listar todos os usuários cadastrados. ok
o Sair do programa. ok
3. O programa deve rodar até que o usuário escolha sair.
4. Não pode haver mais de um usuário com o mesmo e-mail. ok
*/

const prompt = require("prompt-sync")();

let usuarios = [];

function adicionarUsuarios() {
    const nome = prompt("Insira seu nome de usuário: ");
    const idade = prompt("Qual sua idade: ");
    const email = prompt("Insira seu email: ");

    const verificarEmail = usuarios.some(function(usuario) {
        return usuario.email === email;
    });

    if (verificarEmail) {
        console.log("Email já cadastrado.\n Tente outro email para cadastrar um novo usuário");
        return;
    }

    usuarios.push({ nome, idade, email });
    console.log("Usuário adicionado com sucesso!");
}

function removerUsuario() {
    const email = prompt("Digite o email que será removido do sistema ");
    const index = usuarios.findIndex(function(usuario) {
        return usuario.email === email;
    });

    if (index === -1) {
        console.log("Usuário não encontrado");
    } else {
        usuarios.splice(index, 1);
        console.log("Usuário removido do sistema");
    }
}

function exibirLista() {
    if (usuarios.length === 0) {
        console.log("não possui usuários cadastrados");
    } else {
        console.log("Lista de usuários:");
        usuarios.forEach(function(usuario) {
            console.log(`- Nome: ${usuario.nome}, Idade: ${usuario.idade}, Email: ${usuario.email}`);
        });
    }
}


while (true) {
     console.log("\n Menu "); 
     console.log("1 - Adicionar usuário"); 
     console.log("2 - Remover usuário"); 
     console.log("3 - Listar usuários"); 
     console.log("4 - Sair"); 
     const menu = prompt("Escolha uma opção: "); 
     switch (menu) { case "1": adicionarUsuarios(); 
        break; case "2": removerUsuario();
         break; case "3": exibirLista(); 
         break; case "4": console.log("Até mais!");
          process.exit();
          
     }
}