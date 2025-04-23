<script>
// JavaScript tự động thay đổi slide
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function changeSlide() {
    currentSlide = (currentSlide + 1) % totalSlides; // Tính toán slide tiếp theo
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`; // Dịch chuyển slider
}

// Chuyển đổi slide mỗi 3 giây (3000ms)
setInterval(changeSlide, 3000);