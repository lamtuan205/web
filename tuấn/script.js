
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartTableBody = document.getElementById('cart-table-body');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalElement = document.getElementById('cart-total');

    function updateCartPage() {
        cartTableBody.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartTableBody.style.display = 'none';
            emptyCartMessage.style.display = 'block';
        } else {
            cartTableBody.style.display = 'table-row-group';
            emptyCartMessage.style.display = 'none';

            cart.forEach((item, index) => {
                totalPrice += item.price * item.quantity;
                const row = document.createElement('tr');
                row.innerHTML = `
    <td>
        <img src="${item.image || 'anhhtml/placeholder.png'}" alt="${item.name}">
            <span>${item.name}</span>
    </td>
    <td>${item.price.toLocaleString('vi-VN')}₫</td>
    <td>
        <div class="quantity-control">
            <button class="decrease" data-index="${index}">-</button>
            <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                <button class="increase" data-index="${index}">+</button>
        </div>
    </td>
    <td>${(item.price * item.quantity).toLocaleString('vi-VN')}₫</td>
    <td><button class="remove-btn" data-index="${index}">Xóa</button></td>
    `;
                cartTableBody.appendChild(row);
            });
        }

        cartTotalElement.textContent = totalPrice.toLocaleString('vi-VN') + '₫';
        updateCartCount();
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    cartTableBody.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        if (e.target.classList.contains('remove-btn')) {
            cart.splice(index, 1);
            updateCartPage();
        } else if (e.target.classList.contains('increase')) {
            cart[index].quantity++;
            updateCartPage();
        } else if (e.target.classList.contains('decrease')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                updateCartPage();
            }
        }
    });

    cartTableBody.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT') {
            const index = parseInt(e.target.getAttribute('data-index'));
            const newQuantity = parseInt(e.target.value);
            if (newQuantity >= 1) {
                cart[index].quantity = newQuantity;
                updateCartPage();
            } else {
                e.target.value = cart[index].quantity;
            }
        }
    });

    updateCartPage();
});