async function buscarDadosGestorService(){
    const body = {  }
    const response = await api.get(`/servidor/gestor`, body)
    const json = await response.json()
    console.log(json);
    return json
} 