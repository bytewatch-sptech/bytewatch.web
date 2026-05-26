async function buscarComponenteCpuService(mac_address){
    try {
        const response = await api.get(`/servidor/buscar-metricas-cpu/${mac_address}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const json = await response.json();
        console.log("dashboard_cpu.json:", json);
        
        return json;
    } catch (erro) {
        console.error("Erro ao buscar dashboard_cpu.json:", erro);
        return null;
    }
}
 