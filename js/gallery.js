// CONFIGURACIÓN: Rutas relativas desde el index.html
// AÑADE AQUÍ TODAS LAS FOTOS QUE QUIERAS
const photos = [
    { src: "assets/imagen4.jpg", text: "Nuestro primer viaje juntos ✈️" },
    { src: "assets/image1.jpeg", text: "Nuestra primera foto buena 🤓" }, // He puesto la foto que subiste
    { src: "assets/imagen3.jpg", text: "Haciendo el tonto 😜" },
    { src: "assets/imagen6.jpg", text: "Un día especial ❤️" },
    { src: "assets/imagen2.jpg", text: "Contigo al fin del mundo 🌙" }
];

let currentPhotoIndex = 0;

function openGallery() {
    const modal = document.getElementById('gallery-modal');
    modal.style.display = 'block';
    showPhoto(0);
    
    // Añadimos control por teclado al abrir
    document.addEventListener('keydown', handleGalleryKeys);
}

function showPhoto(index) {
    const img = document.getElementById('current-photo');
    const caption = document.getElementById('photo-caption');
    
    // Efecto de opacidad para transición suave
    img.style.opacity = 0;
    
    setTimeout(() => {
        img.src = photos[index].src;
        caption.innerText = photos[index].text;
        img.style.opacity = 1; // Vuelve a aparecer
    }, 200);
}

function nextPhoto() {
    currentPhotoIndex++;
    if (currentPhotoIndex < photos.length) {
        showPhoto(currentPhotoIndex);
    } else {
        closeGallery();
        found('peli'); // LLAMA A MAIN.JS para dar la recompensa
    }
}

function prevPhoto() { // Función nueva para ir hacia atrás
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
        showPhoto(currentPhotoIndex);
    }
}

function closeGallery() {
    document.getElementById('gallery-modal').style.display = 'none';
    // Quitamos el control por teclado para que no interfiera
    document.removeEventListener('keydown', handleGalleryKeys);
}

// LÓGICA DE TECLADO (INTERACTIVIDAD EXTRA)
function handleGalleryKeys(e) {
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'Escape') closeGallery();
}