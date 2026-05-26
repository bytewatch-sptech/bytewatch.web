async function MetricasAlertas(){
    const body = {}
    const response = await api.get(`/avisos/metricas-s3`, body)
    const json = await response.json()
    console.log(json);
    return json
} 

async function ObterNomeServidor(macAddress) {
    try {
        const response = await fetch(`/servidor/buscar-nome-servidor/${macAddress}`);
        const json = await response.json();
        return json;
    } catch (erro) {
        console.error("Erro ao buscar nome do servidor:", erro);
        return null;
    }
}