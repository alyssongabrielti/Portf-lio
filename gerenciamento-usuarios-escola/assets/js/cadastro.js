angular
  .module("CadastroApp", [])
  .service("UsuarioService", function ($q, $timeout) {
    var usuarios = [
      {
        nome: "Baby Yoda",
        email: "baby_yoda@starwars.com",
        tipo: "Aluno",
        imagem: "./assets/img/baby.jpg",
        dataCadastro: new Date(2026, 2, 10),
      },
      {
        nome: "Mandalorian",
        email: "mandalorian@starwars.com",
        tipo: "Professor",
        imagem: "./assets/img/mandalorian.jpg",
        dataCadastro: new Date(2026, 2, 12),
      },
      {
        nome: "Luke Skywalker",
        email: "luke@starwars.com",
        tipo: "Aluno",
        imagem: "./assets/img/LUKE SKYWALKER.jpg",
        dataCadastro: new Date(2026, 2, 15),
      },
      {
        nome: "Leia Organa",
        email: "leia@starwars.com",
        tipo: "Professor",
        imagem: "./assets/img/LEIA ORGANA.jpeg",
        dataCadastro: new Date(2026, 2, 20),
      },
      {
        nome: "Han Solo",
        email: "han@starwars.com",
        tipo: "Aluno",
        imagem: "./assets/img/HAN SOLO.jpeg",
        dataCadastro: new Date(2026, 2, 25),
      },
    ];

    this.listar = function () {
      return usuarios;
    };

    this.salvar = function (usuario) {
      return $q(function (resolve) {
        $timeout(function () {
          usuario.dataCadastro = new Date();
          if (!usuario.imagem || usuario.imagem.trim() === "") {
            usuario.imagem = "./assets/img/User.png";
          }
          usuarios.push(usuario);
          resolve("Usuário cadastrado com sucesso!");
        }, 2000);
      });
    };

    this.remover = function (index) {
      usuarios.splice(index, 1);
    };
  })
  .controller("AppController", function ($scope, UsuarioService) {
    $scope.mensagem = "Bem-vindo ao sistema de cadastro escolar";
    $scope.usuarios = UsuarioService.listar();
    $scope.novoUsuario = {};
    $scope.salvando = false;
    $scope.mensagemSucesso = "";
    $scope.modalAberto = false;

    $scope.abrirModal = function () {
      $scope.modalAberto = true;
      $scope.novoUsuario = {};
    };

    $scope.fecharModal = function () {
      $scope.modalAberto = false;
    };

    $scope.carregarImagem = function (input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $scope.$apply(function () {
            $scope.novoUsuario.imagem = e.target.result;
          });
        };
        reader.readAsDataURL(input.files[0]);
      }
    };

    $scope.adicionarUsuario = function () {
      if (
        $scope.novoUsuario.nome &&
        $scope.novoUsuario.email &&
        $scope.novoUsuario.tipo
      ) {
        $scope.salvando = true;
        $scope.mensagemSucesso = "";

        if (!$scope.novoUsuario.imagem) {
          $scope.novoUsuario.imagem = "./assets/img/User.png";
        }

        UsuarioService.salvar($scope.novoUsuario).then(function (msg) {
          $scope.salvando = false;
          $scope.mensagemSucesso = msg;
          $scope.novoUsuario = {};
          $scope.cadastroForm.$setPristine();
          $scope.cadastroForm.$setUntouched();
          $scope.fecharModal();
        });
      }
    };
  })
  .controller("ListaController", function ($scope, UsuarioService) {
    $scope.usuarios = UsuarioService.listar();
    $scope.removerUsuario = function (index) {
      UsuarioService.remover(index);
    };
  });
