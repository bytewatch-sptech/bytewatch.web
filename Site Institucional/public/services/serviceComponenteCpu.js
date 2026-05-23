async function buscarComponenteCpuService(mac_address){
    const body = { mac_address }
    const response = await api.get(`/servidor/buscar-metricas-cpu/${mac_address}`, body)
    const json = await response.json()
    console.log(json);
    return json
} 