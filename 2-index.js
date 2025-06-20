document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-price');
    const cartCount = document.querySelector('.cart-count');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    let cart = [];
    
    // Ouvrir/fermer le panier
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });
    
    // Filtrage des produits
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Ajouter au panier
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImg = productCard.querySelector('img').src;
            
            // Vérifier si le produit est déjà dans le panier
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: parseFloat(productPrice.replace('€', '').replace(',', '.')),
                    img: productImg,
                    quantity: 1
                });
            }
            
            updateCart();
            cartSidebar.classList.add('active');
            
            // Animation de confirmation
            btn.textContent = 'AJOUTÉ !';
            setTimeout(() => {
                btn.textContent = 'AJOUTER AU PANIER';
            }, 1000);
        });
    });
    
    // Mettre à jour le panier
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price.toFixed(2)}€ x ${item.quantity}</p>
                </div>
                <button class="remove-item">&times;</button>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
            
            total += item.price * item.quantity;
            itemCount += item.quantity;
            
            // Supprimer un article
            cartItemElement.querySelector('.remove-item').addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem !== item);
                updateCart();
            });
        });
        
        cartTotal.textContent = total.toFixed(2) + '€';
        cartCount.textContent = itemCount;
    }
    
    // Validation de commande
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Votre panier est vide !');
        } else {
            alert(`Commande validée ! Total: ${cartTotal.textContent}\n\nRedirection vers le paiement...`);
            // Ici vous intégreriez un système de paiement réel
            cart = [];
            updateCart();
        }
    });
});