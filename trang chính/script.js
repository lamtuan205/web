document.addEventListener('DOMContentLoaded', () => {
    // Chức năng trình chiếu
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
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }

    setInterval(showNextSlide, 3000);

    // Chức năng giỏ hàng
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            const image = button.closest('.product-card').querySelector('img').src;

            if (!name || isNaN(price)) {
                console.error("Thông tin sản phẩm không hợp lệ");
                return;
            }

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1,
                    image: image
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    });

    function updateCart() {
        const cartCount = document.getElementById('cart-count');
        const cartItemsList = document.getElementById('cart-items-list');
        const cartTotal = document.getElementById('cart-total');

        let totalQuantity = 0;
        let totalPrice = 0;

        cartItemsList.innerHTML = '';

        cart.forEach((item, index) => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;

            const li = document.createElement('li');
            li.innerHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 10px;">
                    <div class="cart-item-info">
                        <span>${item.name} x${item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                    </div>
                    <button class="remove-item" data-index="${index}">Xóa</button>
                </div>
            `;
            cartItemsList.appendChild(li);
        });

        cartCount.textContent = totalQuantity;
        cartTotal.textContent = totalPrice.toLocaleString('vi-VN') + '₫';

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
        });
    }

    // Hiển thị giỏ hàng khi hover và chuyển hướng khi nhấp
    const cartIcon = document.querySelector('.giohang');
    const cartPreview = document.getElementById('cart-preview');

    // Hiển thị khi di chuột vào
    cartIcon.addEventListener('mouseenter', () => {
        cartPreview.style.display = 'block';
    });

    // Ẩn khi rời chuột
    cartIcon.addEventListener('mouseleave', () => {
        cartPreview.style.display = 'none';
    });

    // Chuyển hướng đến 10.html khi nhấp
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '../tuấn/10.html'; // Điều chỉnh đường dẫn tùy theo cấu trúc thư mục
    });

    // Cập nhật giỏ hàng ban đầu
    updateCart();
});