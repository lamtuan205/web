// script.js
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    updateSlider();
}

function showPreviousSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }
    updateSlider();
}

function updateSlider() {
    const slider = document.querySelector('.slider');
    const offset = -currentIndex * 100; // Chuyển động dựa trên chỉ số
    slider.style.transform = `translateX(${offset}%)`;
}

// Tự động chuyển hình mỗi 3 giây
setInterval(showNextSlide, 3000);

// Chuyển slide khi click vào nút (tùy chọn)
// Bạn có thể thêm các nút điều khiển ở đây nếu cần
