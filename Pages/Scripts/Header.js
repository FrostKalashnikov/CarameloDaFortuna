// Carregar o conteúdo do header a partir de um arquivo externo

fetch("Header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;

        carregarUsuarioLogado()
    })
    .catch(error => console.log('Erro ao carregar o header:', error));


function cadastrarUsuario(email, username, senha, saldo) {
    // Pegar os usuários salvos no localStorage (se existirem)
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Criar um novo objeto para o usuário
    let novoUsuario = {
        email: email,
        username: username,
        senha: senha,
        saldo: saldo
    };

    // Adicionar o novo usuário à lista de usuários
    usuarios.push(novoUsuario);

    // Salvar a lista de usuários atualizada no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log("Usuário cadastrado com sucesso!");
}

function fazerLogin(email, senha) {
    // Obter os usuários salvos no localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Procurar o usuário correspondente pelo email e senha
    let usuarioLogado = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuarioLogado) {
        // Se o login for bem-sucedido, salvar o usuário logado na sessionStorage
        sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

        console.log("Login bem-sucedido!");
        // Redirecionar para outra página ou continuar o fluxo de login
        window.location.href = "Blackjack.html";
    } else {
        console.log("Email ou senha incorretos!");
    }
}

function carregarUsuarioLogado() {
    let usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
        console.log("Usuário logado:", usuarioLogado.username);
        // Aqui você pode exibir o nome do usuário, saldo, etc.
        document.getElementById("Username").innerText = usuarioLogado.username;
        document.getElementById("saldo").innerText = usuarioLogado.saldo;
    } else {
        // Se não houver usuário logado, redirecionar para a página de login
        //window.location.href = "login.html";
    }
}

// Função para adicionar saldo
function adicionarSaldo(valor) {
    let usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
        // Atualiza o saldo do usuário logado
        usuarioLogado.saldo += valor;

        // Atualiza a sessionStorage com o novo saldo
        sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

        // Atualiza o saldo no localStorage
        atualizarUsuarioNoLocalStorage(usuarioLogado);

        // Atualiza o saldo na interface
        document.getElementById("saldo").innerText = usuarioLogado.saldo;

        console.log("Saldo adicionado com sucesso!");
    } else {
        console.log("Nenhum usuário logado.");
    }
}

// Função para subtrair saldo
function subtrairSaldo(valor) {
    let usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
        // Verifica se o saldo é suficiente
        if (usuarioLogado.saldo >= valor) {
            // Atualiza o saldo do usuário logado
            usuarioLogado.saldo -= valor;

            // Atualiza a sessionStorage com o novo saldo
            sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

            // Atualiza o saldo no localStorage
            atualizarUsuarioNoLocalStorage(usuarioLogado);

            // Atualiza o saldo na interface
            document.getElementById("saldo").innerText = usuarioLogado.saldo;

            console.log("Saldo subtraído com sucesso!");
        } else {
            console.log("Saldo insuficiente!");
        }
    } else {
        console.log("Nenhum usuário logado.");
    }
}

// Função auxiliar para atualizar o saldo no localStorage
function atualizarUsuarioNoLocalStorage(usuarioAtualizado) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Encontra o índice do usuário no array de usuários
    let index = usuarios.findIndex(user => user.email === usuarioAtualizado.email);

    if (index !== -1) {
        // Atualiza o usuário no array de usuários
        usuarios[index] = usuarioAtualizado;

        // Salva o array de usuários atualizado no localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        console.log("Usuário atualizado no localStorage.");
    } else {
        console.log("Usuário não encontrado no localStorage.");
    }
}

// Função para verificar se o usuário logado tem saldo suficiente para uma aposta
function saldoSuficiente(valorAposta) {
    let usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
        // Retorna true se o saldo do usuário for suficiente para a aposta
        return usuarioLogado.saldo >= valorAposta;
    } else {
        console.log("Nenhum usuário logado.");
        return false;
    }
}
