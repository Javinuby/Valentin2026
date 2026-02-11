let currentStar = 1;
const totalStars = 6; // Ahora son 6 para formar bien el corazón

function startTelescopeGame() {
    if (inventory['telescopio']) return;
    
    const modal = document.getElementById('telescope-modal');
    modal.style.display = 'block';
    
    // Reiniciar
    currentStar = 1;
    resetStars();
}

function clickStar(starNumber, element) {
    // Si no es la estrella que toca, ignoramos (o mostramos error)
    if (starNumber !== currentStar) {
        element.style.backgroundColor = 'red';
        setTimeout(() => element.style.backgroundColor = 'white', 200);
        return;
    }

    // --- ACIERTO ---
    element.classList.add('active');

    // Si no es la primera, dibujamos línea desde la anterior
    if (currentStar > 1) {
        const prevStar = document.querySelector(`.star-game[data-index="${currentStar - 1}"]`);
        drawLineBetween(prevStar, element);
    }

    // AVANZAR
    currentStar++;

    // --- VICTORIA (Al llegar a la última) ---
    if (currentStar > totalStars) {
        // Opcional: Cerrar el corazón dibujando una línea final de la 6 a la 1
        const firstStar = document.querySelector(`.star-game[data-index="1"]`);
        drawLineBetween(element, firstStar);

        setTimeout(() => {
            alert("✨ Has conectado nuestro corazón en el universo ✨");
            closeTelescope();
            found('telescopio');
        }, 1000);
    }
}

// FUNCIÓN DE INGENIERO: DIBUJAR LÍNEA SVG
function drawLineBetween(startElem, endElem) {
    const svg = document.getElementById('constellation-svg');
    
    // 1. Obtener coordenadas relativas al contenedor
    // Usamos offsetLeft/Top porque están posicionados con % dentro del contenedor relativo
    const x1 = startElem.offsetLeft;
    const y1 = startElem.offsetTop;
    const x2 = endElem.offsetLeft;
    const y2 = endElem.offsetTop;

    // 2. Crear la línea SVG
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('class', 'constellation-line'); // Aplica la animación CSS

    svg.appendChild(line);
}

function resetStars() {
    // Limpiar clases
    document.querySelectorAll('.star-game').forEach(s => {
        s.classList.remove('active');
        s.style.backgroundColor = 'white';
    });
    // Borrar líneas
    const svg = document.getElementById('constellation-svg');
    svg.innerHTML = ''; 
}

function closeTelescope() {
    document.getElementById('telescope-modal').style.display = 'none';
}