async function buscarComponenteRamService(id_empresa){
    const body = { id_empresa }
    const response = await api.get(`/servidor/buscar-metricas-ram/${id_empresa}`, body)
    const json = await response.json()
    console.log(json);
    return json
} 