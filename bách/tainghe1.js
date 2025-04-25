// Khởi tạo biến chỉ số slide hiện tại
let slideIndex = 0;

// Lấy phần tử wrapper chứa các slide
const wrapper = document.querySelector('.banner-wrapper');

// Lấy danh sách tất cả các slide
const slides = document.querySelectorAll('.banner-slide');

// Tổng số slide
const totalSlides = slides.length;

// Hàm chuyển đến slide theo chỉ số
function moveToSlide(index) {
  // Trượt sang trái 100% nhân với số slide
  wrapper.style.transform = `translateX(-${index * 100}%)`;
}

// Hàm chuyển sang slide tiếp theo
function nextSlide() {
  slideIndex = (slideIndex + 1) % totalSlides; // Tăng chỉ số, lặp lại nếu hết
  moveToSlide(slideIndex); // Gọi hàm trượt
}

// Đảm bảo mã JS chỉ chạy khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function() {
  // Tự động chuyển slide sau mỗi 3 giây
  setInterval(nextSlide, 3000);
});

// Lấy tất cả các sản phẩm trong danh sách
const products = document.querySelectorAll('.product');

// Lặp qua từng sản phẩm để tính toán và thêm phần trăm giảm giá
products.forEach((product) => {
  const oldPriceElement = product.querySelector('.old-price');
  const newPriceElement = product.querySelector('.new-price');

  if (oldPriceElement && newPriceElement) { // Kiểm tra xem phần tử có tồn tại không
    const oldPriceText = oldPriceElement.innerText;
    const newPriceText = newPriceElement.innerText;

    // Chuyển đổi giá từ chuỗi sang số
    const oldPrice = parseFloat(oldPriceText.replace(/[^\d.-]/g, ''));
    const newPrice = parseFloat(newPriceText.replace(/[^\d.-]/g, ''));

    // Tính toán phần trăm giảm giá
    const discountPercent = calculateDiscount(oldPrice, newPrice);

    // Thêm phần trăm giảm giá vào sản phẩm
    const discountElement = product.querySelector('.discount');
    if (discountElement) {
      discountElement.textContent = `${discountPercent}% Giảm`;
    }
  }
});
