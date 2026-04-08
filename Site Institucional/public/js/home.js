function cadastrarMaquina() {
    var idEmpresaVar = sessionStorage.ID_EMPRESA;
    var nomeVar = document.getElementById("nomeServer").value;
    var localVar = document.getElementById("localServer").value;
    var ipVar = document.getElementById("ipServerInt").value;
    var soVar = document.getElementById("TipoServer").value;

    var componentesVar = [
        { 
            idComponente: 1, 
            qtd: document.getElementById("qtd_cpu").value, 
            limiteAlerta: document.getElementById("limite_cpu").value 
        },
        { 
            idComponente: 2, 
            qtd: document.getElementById("qtd_ram").value, 
            limiteAlerta: document.getElementById("limite_ram").value 
        },
        { 
            idComponente: 3, 
            qtd: document.getElementById("qtd_disco").value, 
            limiteAlerta: document.getElementById("limite_disco").value 
        },
        { 
            idComponente: 4, 
            qtd: document.getElementById("qtd_rede").value, 
            limiteAlerta: document.getElementById("limite_rede").value 
        }
    ];

    if (nomeVar == "" || ipVar == "" || idEmpresaVar == undefined) {
        alert("Preencha os campos obrigatórios");
        return false;
    }

    fetch("/addMaquina/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: nomeVar,
            local: localVar,
            ip: ipVar,
            so: soVar,
            idEmpresa: idEmpresaVar,
            componentes: componentesVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            alert("Cadastro realizado!");
            window.location = "dashboard.html";
        } else {
            alert("Erro ao cadastrar");
        }
    });

    return false;
}