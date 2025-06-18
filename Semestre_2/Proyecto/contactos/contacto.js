function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// Guardar mensaje
document.getElementById('formContacto')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = this.nombre.value.trim();
    const empresa = this.empresa.value.trim();
    const email = this.email.value.trim();
    const telefono = this.telefono.value.trim();
    const mensaje = this.mensaje.value.trim();

    const data = {
        nombre,
        empresa,
        email,
        telefono,
        mensaje,
        leido: false,
        fecha: new Date().toLocaleString()
    };

    const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
    mensajes.push(data);
    localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));

    mostrarMensaje("Mensaje enviado correctamente ✅", "success");
    this.reset();

    mostrarMensajes(); // Refresca la tabla si está visible
});

// Mostrar alerta personalizada
function mostrarMensaje(texto, tipo) {
    const mensajeSection = document.getElementById("mensajeAlerta");
    if (mensajeSection) {
        mensajeSection.innerText = texto;
        mensajeSection.style.color = tipo === "success" ? "green" : "red";
        mensajeSection.style.display = "block"

        setTimeout(() => {
            mensajeSection.innerText = "";
            mensajeSection.style.display = "none";
        }, 4000);
    }
}

// Mostrar tabla con mensajes
function mostrarMensajes() {
    const contenedor = document.getElementById("formulariosClientes");
    if (!contenedor) return;

    const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];

    if (mensajes.length === 0) {
        contenedor.innerHTML = "<p>No hay mensajes guardados.</p>";
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Empresa</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Mensaje</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    mensajes.forEach((m, i) => {
        html += `
            <tr style="background-color: ${m.leido ? '#d4edda' : '#f8d7da'};">
                <td>${m.nombre}</td>
                <td>${m.empresa}</td>
                <td>${m.email}</td>
                <td>${m.telefono}</td>
                <td>${m.mensaje}</td>
                <td>${m.fecha}</td>
                <td>${m.leido ? "Leído" : "No leído"}</td>
                <td>
                    <button onclick="marcarLeido(${i})">✔</button>
                    <button onclick="eliminarMensaje(${i})">🗑</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    contenedor.innerHTML = html;
}

// Marcar como leído
function marcarLeido(index) {
    const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
    if (mensajes[index]) {
        mensajes[index].leido = true;
        localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
        mostrarMensajes();
    }
}

// Eliminar mensaje
function eliminarMensaje(index) {
    const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
    if (mensajes[index]) {
        mensajes.splice(index, 1);
        localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
        mostrarMensajes();
    }
}

// Mostrar mensajes al cargar si está presente la sección
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("formulariosClientes")) {
        mostrarMensajes();
    }
});

