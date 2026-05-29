const BASE_URL = window.location.origin;

async function login(username, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error("Usuario o contraseña incorrectos");
    return res.json();
}

async function listarCajas() {
    const res = await fetchAuth(`${BASE_URL}/api/caja`);
    return res.json();
}

async function crearCaja(montoInicial, departamentoId) {
    const params = new URLSearchParams({ montoInicial, departamentoId });
    const res = await fetchAuth(`${BASE_URL}/api/caja?${params}`, { method: "POST" });
    if (!res.ok) throw new Error("Error al crear la caja");
    return res.json();
}

async function actualizarCaja(id, nuevoMonto) {
    const res = await fetchAuth(`${BASE_URL}/api/caja/${id}?nuevoMonto=${nuevoMonto}`, { method: "PUT" });
    if (!res.ok) throw new Error("Error al actualizar la caja");
    return res.json();
}

async function eliminarCaja(id) {
    const res = await fetchAuth(`${BASE_URL}/api/caja/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar la caja");
}

async function listarMovimientos() {
    const res = await fetchAuth(`${BASE_URL}/api/movimientos`);
    return res.json();
}

async function listarMovimientosPorCaja(cajaId) {
    const res = await fetchAuth(`${BASE_URL}/api/movimientos/caja/${cajaId}`);
    return res.json();
}

async function registrarMovimientoAPI(cajaId, tipo, monto, descripcion) {
    const params = new URLSearchParams({ cajaId, tipo, monto, descripcion });
    const res = await fetchAuth(`${BASE_URL}/api/movimientos?${params}`, { method: "POST" });
    if (!res.ok) throw new Error("Error al registrar movimiento");
    return res.json();
}

async function listarUsuarios() {
    const res = await fetchAuth(`${BASE_URL}/api/usuarios`);
    return res.json();
}

async function registrarUsuario(username, password, rol, departamentoId) {
    const body = { username, password, rol };
    if (departamentoId) body.departamento = { id: departamentoId };
    const res = await fetchAuth(`${BASE_URL}/api/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("Error al registrar usuario");
    return res.json();
}

async function actualizarUsuario(id, datos) {
    const res = await fetchAuth(`${BASE_URL}/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return res.json();
}

async function eliminarUsuario(id) {
    const res = await fetchAuth(`${BASE_URL}/api/usuarios/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar usuario");
}

async function listarGastos() {
    const res = await fetchAuth(`${BASE_URL}/api/gastos`);
    return res.json();
}

async function listarMisGastos(usuarioId) {
    const res = await fetchAuth(`${BASE_URL}/api/gastos/mis-gastos/${usuarioId}`);
    return res.json();
}

async function registrarGasto(gasto, cajaId, presupuestoId) {
    const params = new URLSearchParams({ cajaId, presupuestoId });
    const res = await fetchAuth(`${BASE_URL}/api/gastos?${params}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gasto)
    });
    if (!res.ok) throw new Error("Error al registrar gasto");
    return res.json();
}

async function aprobarGasto(id) {
    const res = await fetchAuth(`${BASE_URL}/api/gastos/${id}/aprobar`, { method: "PUT" });
    if (!res.ok) throw new Error("Error al aprobar gasto");
    return res.json();
}

async function rechazarGasto(id) {
    const res = await fetchAuth(`${BASE_URL}/api/gastos/${id}/rechazar`, { method: "PUT" });
    if (!res.ok) throw new Error("Error al rechazar gasto");
    return res.json();
}

async function subirComprobante(id, archivo) {
    const formData = new FormData();
    formData.append("archivo", archivo);
    const res = await fetchAuth(`${BASE_URL}/api/gastos/${id}/comprobante`, {
        method: "POST",
        body: formData
    });
    if (!res.ok) throw new Error("Error al subir comprobante");
    return res.json();
}

async function listarPresupuestos() {
    const res = await fetchAuth(`${BASE_URL}/api/presupuesto`);
    return res.json();
}

async function listarDepartamentos() {
    const res = await fetchAuth(`${BASE_URL}/api/presupuesto/departamentos`);
    return res.json();
}

async function crearDepartamento(nombre) {
    const res = await fetchAuth(`${BASE_URL}/api/presupuesto/departamento?nombre=${nombre}`, {
        method: "POST"
    });
    if (!res.ok) throw new Error("Error al crear departamento");
    return res.json();
}

async function crearPresupuesto(departamentoId, mes, presupuestoMensual) {
    const params = new URLSearchParams({ departamentoId, mes, presupuestoMensual });
    const res = await fetchAuth(`${BASE_URL}/api/presupuesto?${params}`, { method: "POST" });
    if (!res.ok) throw new Error("Error al crear presupuesto");
    return res.json();
}

async function fetchAuth(url, options = {}) {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/login";
        return null;
    }
    options.headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`
    };
    if (!(options.body instanceof FormData)) {
        options.headers["Content-Type"] = "application/json";
    }
    try {
        const res = await fetch(url, options);
        if (res.status === 401 || res.status === 403) {
            localStorage.clear();
            window.location.href = "/login";
            return null;
        }
        if (!res.ok) {
            const errorText = await res.text().catch(() => "Error");
            throw new Error(errorText || `Error ${res.status}`);
        }
        return res;
    } catch (err) {
        console.error("FetchAuth Error:", err);
        throw err;
    }
}
