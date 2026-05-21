async function MetricasAlertas(){
    const body = {}
    const response = await api.get(`/avisos/metricas-s3`, body)
    const json = await response.json()
    console.log(json);
    return json
} 

async function ObterNomeServidor(macAddress){
    const body = {}
    const response = await api.get(`/servidor/buscar-nome-servidor/${macAddress}`, body)
    const json = await response.json()
    console.log(json);
    return json
} 