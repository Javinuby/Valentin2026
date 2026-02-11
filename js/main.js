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
    // 1. Evitar repetir si ya lo tiene (Opcional, pero buena práctica)
    if (inventory[item]) return;

    inventory[item] = true;
    const box = document.getElementById('message-box');
    box.style.display = 'block';

    // --- NUEVO: ACTUALIZAR EL HUD ---
    // Buscamos el div correspondiente (ej: hud-gato) y le ponemos la clase
    const hudIcon = document.getElementById('hud-' + item);
    if (hudIcon) {
        hudIcon.classList.add('collected');
        
        // Efecto visual extra: Una pequeña animación de "latido"
        hudIcon.animate([
            { transform: 'scale(1.2)' },
            { transform: 'scale(1.8)' },
            { transform: 'scale(1.2)' }
        ], {
            duration: 500,
            easing: 'ease-out'
        });
    }
    // -------------------------------
    
    if(item === 'gato') {
        box.innerText = "Miau... El gato te ha dado un trozo de luna 🌙";
        
        // Animación de salto del gato (que ya tenías)
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
            typeWriter("¿Quieres ser mi San Valentín? ❤️");
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


// --- LÓGICA DEL FINAL EPICO ---

function moveNoButton() {
    const btnNo = document.getElementById('btn-no');
    
    // Frases para convencerla cuando intente decir que no
    const messages = [
        "¿Segura?", 
        "¡Piénsalo bien!", 
        "¡Error 404: No encontrado!", 
        "Venga ya...", 
        "¡Que no te dejo!", 
        "Inténtalo otra vez",
        "¿Me vas a romper el corazón? 💔",
        "¡Ese botón está prohibido!"
    ];

    // 1. Convertir a posición fija para que se mueva por TODA la pantalla
    btnNo.classList.add('moving');

    // 2. Calcular nueva posición aleatoria (respetando márgenes para que no se salga)
    const newX = Math.random() * (window.innerWidth - 100);
    const newY = Math.random() * (window.innerHeight - 50);

    // 3. Aplicar coordenadas
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';

    // 4. Cambiar el texto aleatoriamente
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    btnNo.innerText = randomMsg;
}

function acceptValentine() {
    // Aquí puedes lanzar confeti, redirigir a una canción, o simplemente celebrar
    alert("¡SABÍA QUE DIRÍAS QUE SÍ! ❤️ Te quiero.");
    
    // Opcional: Redirigir a una canción de YouTube
    // window.location.href = "https://www.youtube.com/watch?v=TU_LINK_AQUI";
}