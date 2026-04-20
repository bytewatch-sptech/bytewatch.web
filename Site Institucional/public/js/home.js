function cadastrarMaquina() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var nome = document.getElementById("nomeServer").value;
    var local = document.getElementById("localServer").value;
    var ip = document.getElementById("ipServerInt").value;
    var so = document.getElementById("TipoServer").value;

    var componentes = [
        { 
            idComponente: 1, 
            qtd: document.getElementById("qtd_cpu").value, 
            limiteAlerta: document.getElementById("limite_cpu").value,
            capacidade_limite: document.getElementById("capacidade").value
        },
        { 
            idComponente: 2, 
            qtd: document.getElementById("qtd_ram").value, 
            limiteAlerta: document.getElementById("limite_ram").value,
            capacidade_limite: document.getElementById("capacidade").value
        },
        { 
            idComponente: 3, 
            qtd: document.getElementById("qtd_disco").value, 
            limiteAlerta: document.getElementById("limite_disco").value,
            capacidade_limite: document.getElementById("capacidade").value 
        },
        { 
            idComponente: 4, 
            qtd: document.getElementById("qtd_rede").value, 
            limiteAlerta: document.getElementById("limite_rede").value,
            capacidade_limite: document.getElementById("capacidade").value
        }
    ];

    if (nome == "" || ip == "" || idEmpresa == undefined) {
        alert("Preencha os campos obrigatórios");
        return false;
    }

    fetch("/addMaquina/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: nome,
            local: local,
            ip: ip,
            so: so,
            idEmpresa: idEmpresa,
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