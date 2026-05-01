async function bucarDatacenterService(id_empresa){
    const body = { id_empresa }
    const response = await api.get(`/servidor/buscar-datacenters/${id_empresa}`, body)
    const json = await response.json()
    console.log(json);
    return json
} 

async function buscarServidoresService(id_empresa){
    const body = { id_empresa }
    const response = await api.get(`/servidor/listar-servidores/${id_empresa}`, body)
    const json = await response.json()
    console.log(json);
    return json
} 