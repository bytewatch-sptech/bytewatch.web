async function buscarComponenteCpuService(mac_address){
    try {
        const response = await api.get("dashboard_cpu.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const json = await response.json();
        console.log("dashboard_cpu.json:", json);
        
        if (mac_address && json && Object.prototype.hasOwnProperty.call(json, mac_address)) {
            return json[mac_address];
        }
        return json;
    } catch (erro) {
        console.error("Erro ao buscar dashboard_cpu.json:", erro);
        return null;
    }
}
