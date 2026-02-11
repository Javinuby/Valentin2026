// ESTADO DEL JUEGO
let inventory = { gato: false, peli: false, cabra: false };

// GENERAR ESTRELLAS
const starsContainer = document.getElementById('stars');
if(starsContainer) {
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        starsContainer.appendChild(star);
    }
}

// FUNCIÓN CENTRAL DE PROGRESO
function found(item) {
    inventory[item] = true;
    const box = document.getElementById('message-box');
    box.style.display = 'block';
    
    if(item === 'gato') {
        box.innerText = "Miau... El gato te ha dado un trozo de luna 🌙";
        // Animación de salto
        const catDiv = document.getElementById('cat');
        catDiv.classList.add('happy-cat');
        setTimeout(() => catDiv.classList.remove('happy-cat'), 1000);
    } 
    else if(item === 'peli') box.innerText = "¡Un recuerdo de cine desbloqueado! 🎬";
    else if(item === 'cabra') box.innerText = "La cabra espacial ha balado de alegría 🐐";

    checkWin();
}

function checkWin() {
    if (Object.values(inventory).every(v => v === true)) {
        setTimeout(() => {
            document.getElementById('final-modal').style.display = 'block';
            typeWriter("¡FELIZ SAN VALENTÍN! ❤️");
        }, 1000);
    }
}

function typeWriter(text) {
    let i = 0;
    const target = document.getElementById('constellation-text');
    target.innerHTML = ""; 
    function type() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 150);
        }
    }
    type();
}

// ACTIVAR MÚSICA AL PRIMER CLICK
document.body.addEventListener('click', function() {
    const audio = document.getElementById('bg-music');
    if(audio.paused) {
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio esperando interacción"));
    }
}, { once: true });