// CONFIGURACIÓN: Rutas relativas desde el index.html
const photos = [
    { src: "assets/foto1.jpg", text: "Nuestro primer viaje juntos ✈️" },
    { src: "assets/foto2.jpg", text: "Esa cena que nos encantó 🍕" }
];

let currentPhotoIndex = 0;

function openGallery() {
    document.getElementById('gallery-modal').style.display = 'block';
    showPhoto(0);
}

function showPhoto(index) {
    const img = document.getElementById('current-photo');
    const caption = document.getElementById('photo-caption');
    img.src = photos[index].src;
    caption.innerText = photos[index].text;
}

function nextPhoto() {
    currentPhotoIndex++;
    if (currentPhotoIndex < photos.length) {
        showPhoto(currentPhotoIndex);
    } else {
        closeGallery();
        found('peli'); // LLAMA A MAIN.JS
    }
}

function closeGallery() {
    document.getElementById('gallery-modal').style.display = 'none';
}