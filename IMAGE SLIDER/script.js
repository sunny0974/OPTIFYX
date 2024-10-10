const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let isPlaying = true;
let slideInterval = setInterval(nextSlide, 3000); // Automatic slideshow starts

// Event listeners for navigation and pause/play
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.pause-play').addEventListener('click', togglePlayPause);

// Functions for sliding
function nextSlide() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
    resetInterval(); // Reset the interval on manual slide
}

function prevSlide() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    resetInterval(); // Reset the interval on manual slide
}

function togglePlayPause() {
    const pausePlayButton = document.querySelector('.pause-play');
    
    if (isPlaying) {
        clearInterval(slideInterval); // Stop the automatic slideshow
        pausePlayButton.textContent = 'Play'; // Change button to 'Play'
    } else {
        slideInterval = setInterval(nextSlide, 3000); // Restart the automatic slideshow
        pausePlayButton.textContent = 'Pause'; // Change button to 'Pause'
    }
    
    isPlaying = !isPlaying; // Toggle the play/pause state
}

// Function to reset the slide interval
function resetInterval() {
    if (isPlaying) {
        clearInterval(slideInterval); // Stop the current interval
        slideInterval = setInterval(nextSlide, 3000); // Restart the automatic slideshow
    }
}
