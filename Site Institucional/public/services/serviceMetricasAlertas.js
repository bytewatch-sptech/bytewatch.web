async function MetricasAlertas(){
    const body = {}
    const response = await api.get(`/avisos/metricas-s3`, body)
    const json = await response.json()
    console.log(json);
    return json
} 