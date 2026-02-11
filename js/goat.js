// CONFIGURACIÓN
let goatClicks = 0;
const maxClicks = 5; // Número de veces que tiene que pillarla
let goatTimer = null;

function startGoatGame() {
    // Si ya la hemos capturado, no hacemos nada (o mostramos mensaje)
    if (inventory['cabra']) return;

    const goat = document.getElementById('goat');
    const msgBox = document.getElementById('message-box');

    // 1. Primera vez que clicamos: Empieza el caos
    if (goatClicks === 0) {
        msgBox.style.display = 'block';
        msgBox.innerText = "🐐: ¡Baaaa! ¡A que no me pillas! (0/5)";
        
        // Quitamos la animación suave de flotar para controlarla nosotros
        goat.style.animation = 'none';
        
        // Añadimos una transición para que se mueva "deslizándose"
        goat.style.transition = 'top 0.5s ease, left 0.5s ease';
        
        // Cambiamos el cursor para que parezca un objetivo
        goat.style.cursor = 'crosshair';

        // Empezar a moverse sola cada 0.8 segundos
        moveGoat(); // Movimiento inicial
        goatTimer = setInterval(moveGoat, 800);

        // Cambiamos el comportamiento del click
        goat.onclick = catchGoat; 
    }
}

function moveGoat() {
    const goat = document.getElementById('goat');
    
    // Calcular posición aleatoria (respetando márgenes para que no se salga)
    // window.innerWidth - 100 asegura que no se vaya muy a la derecha
    const x = Math.random() * (window.innerWidth - 100); 
    const y = Math.random() * (window.innerHeight - 100);
    
    goat.style.left = x + 'px';
    goat.style.top = y + 'px';
}

function catchGoat(e) {
    // Evitar propagación si hubiera otros clics
    e.stopPropagation();

    goatClicks++;
    
    // Feedback visual y texto
    const msgBox = document.getElementById('message-box');
    msgBox.innerText = `🐐: ¡Baaaa! (${goatClicks}/${maxClicks})`;
    
    // Efecto visual: La cabra se encoge un poco al recibir el clic
    const goat = document.getElementById('goat');
    goat.style.transform = 'scale(0.8)';
    setTimeout(() => goat.style.transform = 'scale(1)', 100); // Vuelve a tamaño normal

    // VICTORIA
    if (goatClicks >= maxClicks) {
        endGoatGame();
    } else {
        // Si no ha ganado, la movemos inmediatamente para que sea un reto
        clearInterval(goatTimer); // Reseteamos el temporizador
        moveGoat();
        goatTimer = setInterval(moveGoat, 700); // ¡Se vuelve un pelín más rápida!
    }
}

function endGoatGame() {
    clearInterval(goatTimer);
    const goat = document.getElementById('goat');

    // Restauramos la cabra al centro o quieta
    goat.style.transition = 'all 1s ease';
    goat.style.top = '50%';
    goat.style.left = '50%';
    goat.style.transform = 'translate(-50%, -50%) scale(1.5)'; // Se hace grande
    goat.style.cursor = 'default';
    goat.onclick = null; // Quitamos el click del juego

    setTimeout(() => {
        // Llamamos a la función principal para dar el premio
        found('cabra'); 
    }, 1000);
}