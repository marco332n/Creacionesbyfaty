// --- VARIABLES GLOBALES DEL JUEGO ---
let puntos = 0, saltando = false, juegoActivo = false, bucleJuego;
let velocidadCactus = 6; 
// Nueva variable para el récord personal
let recordCactus = localStorage.getItem('recordCactus') || 0;

// --- FUNCIONES DE CONTROL DEL JUEGO ---
function abrirJuego() { 
    document.getElementById('offline-game-container').style.display = 'flex'; 
    // Actualizar el récord visualmente al abrir
    const scoreVal = document.getElementById('score-val');
    if(scoreVal) scoreVal.innerHTML = `0 (Record: ${recordCactus})`;
}

function cerrarJuego() { 
    document.getElementById('offline-game-container').style.display = 'none'; 
    resetJuego();
}

function saltar() {
    const p = document.getElementById('player-monito');
    if (saltando || !p || !juegoActivo) return; 
    
    saltando = true; 
    p.style.bottom = "90px"; 
    p.style.transform = "rotate(360deg)"; // Efecto de giro al saltar
    
    setTimeout(() => { 
        if(p) {
            p.style.bottom = "0";
            p.style.transform = "rotate(0deg)"; // Resetea el giro
        }
        setTimeout(() => saltando = false, 300); 
    }, 400);
}

function iniciarJuego() {
    if (juegoActivo) return;
    
    document.getElementById('btn-iniciar-juego').style.display = 'none';
    
    juegoActivo = true;
    puntos = 0;
    velocidadCactus = 6;
    let cp = -50; 
    
    const c = document.getElementById('cactus');
    const s = document.getElementById('score-val');
    s.innerText = `0 (Record: ${recordCactus})`;

    bucleJuego = setInterval(() => {
        cp += velocidadCactus; 

        if (cp > 330) { 
            cp = -50; 
            puntos++; 
            s.innerText = `${puntos} (Record: ${recordCactus})`; 

            // DIFICULTAD: Aumentar velocidad cada 50 puntos
            if (puntos > 0 && puntos % 20 === 0) {
                velocidadCactus += 1.5;
                // Efecto visual rápido de "Nivel subido"
                s.style.color = "#c39eff";
                setTimeout(() => s.style.color = "#435D78", 500);
            }
        }

        c.style.right = cp + "px";
        
        let pb = parseInt(window.getComputedStyle(document.getElementById('player-monito')).getPropertyValue("bottom"));
        
        // DETECCIÓN DE CHOQUE MEJORADA
        if (cp > 230 && cp < 265 && pb < 35) { 
            // Verificar si hay nuevo récord
            if (puntos > recordCactus) {
                recordCactus = puntos;
                localStorage.setItem('recordCactus', recordCactus);
                alert("¡NUEVO RÉCORD! 🎉 Puntos: " + puntos);
            } else {
                alert("¡Chocaste! Puntos: " + puntos); 
            }
            resetJuego();
        }
    }, 20);
}

function resetJuego() {
    clearInterval(bucleJuego);
    juegoActivo = false;
    document.getElementById('btn-iniciar-juego').style.display = 'block';
    document.getElementById('cactus').style.right = "-50px";
    document.getElementById('score-val').innerText = `0 (Record: ${recordCactus})`;
}

// --- LÓGICA DE TIENDA Y EVENTOS ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar Usuario
    const nombre = localStorage.getItem('usuarioLogueado');
    if (localStorage.getItem('isLoggedIn') === 'true' && nombre) {
        const userLink = document.getElementById('user-link');
        if(userLink) {
            userLink.innerHTML = `<span style="color: white; font-weight: bold; font-size: 13px;">Hola, ${nombre}</span>`;
        }
    }

    // 2. Carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const badge = document.getElementById('cart-count');
    const updateBadge = () => { 
        if(badge) badge.innerText = carrito.reduce((s, i) => s + i.cantidad, 0); 
    };
    updateBadge();

    document.querySelectorAll('.btn-cart').forEach(b => {
        b.addEventListener('click', () => {
            const n = b.getAttribute('data-name'), p = parseInt(b.getAttribute('data-price'));
            const ex = carrito.find(i => i.nombre === n);
            if(ex) ex.cantidad++; else carrito.push({nombre:n, precio:p, cantidad:1});
            localStorage.setItem('carrito', JSON.stringify(carrito));
            updateBadge();
            
            // Efecto visual profesional al añadir
            const originalText = b.innerText;
            b.innerText = "¡Añadido! ✓"; 
            b.style.backgroundColor = "#af83ff";
            setTimeout(() => {
                b.innerText = originalText;
                b.style.backgroundColor = "#c39eff";
            }, 1000);
        });
    });

    // 3. Favoritos
// Función para crear la explosión de partículas
function crearParticulas(e) {
    const btn = e.currentTarget;
    // Solo tira partículas si se está activando (poniendo rojo)
    if (btn.classList.contains('active')) return;

    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        
        // Colores de las partículas (puedes añadir más)
        const colores = ['#ff4757', '#ff6b6b', '#ff9f43', '#c39eff'];
        p.style.background = colores[Math.floor(Math.random() * colores.length)];
        
        // Dirección aleatoria
        const x = (Math.random() - 0.5) * 80 + 'px';
        const y = (Math.random() - 0.5) * 80 + 'px';
        p.style.setProperty('--x', x);
        p.style.setProperty('--y', y);
        
        // Tamaño aleatorio
        const size = Math.random() * 6 + 4 + 'px';
        p.style.width = size;
        p.style.height = size;

        btn.appendChild(p);
        
        // Borrar la partícula después de la animación
        setTimeout(() => p.remove(), 600);
    }
}

// --- LÓGICA DE FAVORITOS CON PARTÍCULAS ---

function crearParticulas(e) {
    const btn = e.currentTarget;
    // Solo creamos partículas si el corazón NO estaba activo antes del click
    if (btn.classList.contains('active')) return;

    for (let i = 0; i < 10; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const colores = ['#ff4757', '#ff6b6b', '#c39eff', '#ffffff'];
        p.style.background = colores[Math.floor(Math.random() * colores.length)];
        
        const x = (Math.random() - 0.5) * 100 + 'px';
        const y = (Math.random() - 0.5) * 100 + 'px';
        p.style.setProperty('--x', x);
        p.style.setProperty('--y', y);
        
        const size = Math.random() * 8 + 4 + 'px';
        p.style.width = size;
        p.style.height = size;

        btn.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

// Dentro del DOMContentLoaded
const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

document.querySelectorAll('.btn-wishlist').forEach(b => {
    const nombreProducto = b.getAttribute('data-name');
    const icono = b.querySelector('i');

    // Estado inicial: Verificar si ya era favorito
    if (favoritos.includes(nombreProducto)) {
        b.classList.add('active');
        icono.classList.replace('fa-regular', 'fa-solid');
    }

    b.addEventListener('click', (e) => {
        const index = favoritos.indexOf(nombreProducto);

        if (index === -1) {
            // ACTIVAR (Poner rojo y tirar partículas)
            crearParticulas(e);
            favoritos.push(nombreProducto);
            b.classList.add('active');
            icono.classList.replace('fa-regular', 'fa-solid');
        } else {
            // DESACTIVAR
            favoritos.splice(index, 1);
            b.classList.remove('active');
            icono.classList.replace('fa-solid', 'fa-regular');
        }
        
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    });
});

    // 4. Controles del Juego (Teclado y Táctil)
    document.addEventListener('keydown', e => { 
        if(e.code === "Space") { 
            if(juegoActivo) e.preventDefault(); 
            saltar(); 
        }
    });

    const gameContainer = document.getElementById('offline-game-container');
    if(gameContainer) {
        // Soporte táctil mejorado
        gameContainer.addEventListener('touchstart', e => { 
            if(e.target.id !== 'btn-iniciar-juego' && e.target.className !== 'btn-volver-tienda') { 
                e.preventDefault(); 
                saltar(); 
            } 
        }, {passive: false});
    }
});