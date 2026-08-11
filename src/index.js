export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Devuelve el contador
    if (url.pathname === "/contador") {
      const visitas = await env.COUNTER_KV.get("visitas") || "0";

      return new Response(
        JSON.stringify({ visitas }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // Suma una visita solo al entrar al inicio
    if (url.pathname === "/" || url.pathname === "/index.html") {
      let visitas = await env.COUNTER_KV.get("visitas");
      visitas = Number(visitas || 0) + 1;

      await env.COUNTER_KV.put("visitas", visitas.toString());
    }

    // Entrega la página normalmente
    return env.ASSETS.fetch(request);
  }
};