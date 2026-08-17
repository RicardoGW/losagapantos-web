export default {
    async fetch(request, env) {

        const url = new URL(request.url);

        // ==========================================
        // CONTADOR DE VISITAS
        // ==========================================

        if (url.pathname === "/contador") {

            // Obtener visitas actuales
            let visitas = await env.COUNTER_KV.get("visitas");

            // Sumar una visita
            visitas = Number(visitas || 0) + 1;

            // Guardar nuevo total
            await env.COUNTER_KV.put(
                "visitas",
                visitas.toString()
            );

            // Devolver el total
            return new Response(
                JSON.stringify({
                    visitas: visitas
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Cache-Control": "no-store"
                    }
                }
            );
        }

        // ==========================================
        // RESTO DEL SITIO
        // ==========================================

        return env.ASSETS.fetch(request);
    }
};