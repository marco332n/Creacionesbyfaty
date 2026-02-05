document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE LOGIN Y SALUDO ---
    const logueado = localStorage.getItem('isLoggedIn');
    const nombre = localStorage.getItem('usuarioLogueado'); // El nombre que guardamos al entrar
    const userLink = document.getElementById('user-link');

    if (logueado === 'true' && nombre && userLink) {
        // Cambiamos el icono por el nombre del usuario
        userLink.innerHTML = `<span style="color: white; font-weight: bold; font-size: 14px; white-space: nowrap; margin-right: 10px;">Hola, ${nombre}</span>`;
        userLink.href = "#"; 
        
        // Opción para cerrar sesión al hacer clic en el nombre
        userLink.onclick = (e) => {
            e.preventDefault();
            if(confirm("¿Quieres cerrar sesión?")) {
                // Solo borramos los datos de la sesión actual, no los usuarios registrados
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('usuarioLogueado');
                location.reload();
            }
        };
    }

    // --- LÓGICA DEL BUSCADOR ---
    const inputBuscador = document.getElementById('buscador');
    const btnBuscar = document.getElementById('btn-buscar');
    
    // Lista de palabras clave y a dónde llevan
    const misProductos = [
        { nombre: "moño con aplique", url: "disponibles.html#monos-ninos" },
        { nombre: "moños", url: "disponibles.html#monos-ninos" },
        { nombre: "niños", url: "disponibles.html#monos-ninos" },
        { nombre: "adultos", url: "disponibles.html#monos-adultos" },
        { nombre: "zapatillas", url: "disponibles.html#zapatillas-ninos" },
        { nombre: "accesorios", url: "disponibles.html" }
    ];

    function ejecutarBusqueda() {
        const texto = inputBuscador.value.toLowerCase().trim();
        if (texto !== "") {
            // Busca si lo que escribió el usuario coincide con algún producto
            const encontrado = misProductos.find(p => p.nombre.includes(texto));
            
            if (encontrado) {
                window.location.href = encontrado.url;
            } else {
                // Si no encuentra nada específico, lo lleva a la tienda general
                window.location.href = "disponibles.html";
            }
        }
    }

    // Escuchar la tecla Enter
    inputBuscador.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') ejecutarBusqueda();
    });

    // Escuchar el clic en la lupa
    if(btnBuscar) {
        btnBuscar.addEventListener('click', ejecutarBusqueda);
    }
});document.addEventListener('DOMContentLoaded', () => {
    const logueado = localStorage.getItem('isLoggedIn');
    const nombre = localStorage.getItem('usuarioLogueado');
    const userLink = document.getElementById('user-link');

    if (logueado === 'true' && nombre && userLink) {
        // Cambiamos el icono por el texto de saludo
        userLink.innerHTML = `<span style="color: #435D78; font-weight: bold; font-size: 14px; background: white; padding: 5px 10px; border-radius: 15px;">Hola, ${nombre}</span>`;
        userLink.href = "#"; 
        
        userLink.onclick = (e) => {
            e.preventDefault();
            if(confirm("¿Deseas cerrar sesión?")) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('usuarioLogueado');
                location.reload(); // Recarga la página para mostrar el icono de usuario otra vez
            }
        };
    }
    
    // Aquí puedes añadir también tu lógica del buscador que vimos antes
});