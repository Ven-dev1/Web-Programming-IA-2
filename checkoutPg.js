localStorage.getItem('cart');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsDiv = document.getElementById('cartItems');
        const cartSummarySection = document.getElementById('cartSummary');
        let totalAmount = 0;

        function checkLoginStatus(){
            let currentUser = sessionStorage.getItem('currentUser');
            const greeting = document.getElementById('greeting');
            const loginBtn = document.getElementById('loginBtn');
            const dropdown = document.querySelector('.dropdown');

            if (currentUser) {
                greeting.textContent = `Hello, ${currentUser}!`;
                loginBtn.style.display = 'none';
                dropdown.style.display = 'inline-block';
            } else {
                greeting.textContent = '';
                loginBtn.style.display = 'inline-block';
                dropdown.style.display = 'none';
            }
        }

         function logout() {
            sessionStorage.removeItem('currentUser');
            alert('You have been logged out.');
            checkLoginStatus();
        }


        function createCartItem(watch) {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cartItem';
            cartItemDiv.dataset.id = watch.id;

            const itemTotal = watch.price * (watch.quantity || 1);
            totalAmount += itemTotal;

            cartItemDiv.innerHTML = `
                <img src="${watch.imgURL}" alt="${watch.model}" height="100px" width="100px">
                <div class="itemDetails">
                    <h3>${watch.model}-${watch.brand}</h3>
                    <p>${watch.description}</p>
                    <p>Price: $${watch.price.toFixed(2)}</p><p>x ${watch.quantity} </p>
                    <p><strong>Item Total: $${itemTotal.toFixed(2)}</strong></p>
                </div>
            `;
           
            return cartItemDiv;
        }

        function displayCart() {
        cartItemsDiv.innerHTML = '';

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = `<p>Your cart is empty. <a href="watchPg.html">Shop now</a></p>`;
            return;
        }

        cart.forEach(watch => {
            const cartItemDiv = createCartItem(watch);
            cartItemsDiv.appendChild(cartItemDiv);
        });

        const totalDiv = document.createElement('div');
        totalDiv.id = 'checkoutTotal';
        totalDiv.innerHTML = `
            <hr>
            <h2>Total Amount: $${totalAmount.toFixed(2)}</h2>
        `;
        cartItemsDiv.appendChild(totalDiv);
    }


        function stringify(item){
            return JSON.stringify(item);
        }

        document.getElementById('paymentForm').addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const address = document.getElementById('address').value.trim();
            const city = document.getElementById('city').value.trim();
            const country = document.getElementById('country').value.trim();
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const expDate = document.getElementById('expDate').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            if (!name || !email || !address || !cardNumber || !expDate || !cvv) {
                alert("Please fill in all required fields.");
                return;
            }

            if (cardNumber.length < 16) {
                alert("Please enter a valid 16-digit card number.");
                return;
            }

            // Mock confirmation
            alert(`Thank you, ${name}! Your order has been placed successfully.`);

            // Clear cart after purchase and send the customer info to storage to create invoice later
            sessionStorage.setItem('cart',stringify(cart));
            localStorage.removeItem('cart');
            localStorage.removeItem('Total');
            sessionStorage.setItem('name',stringify(name));
            sessionStorage.setItem('email',stringify(email));
            sessionStorage.setItem('address',stringify(address));
            sessionStorage.setItem('city',stringify(city));
            sessionStorage.setItem('country',stringify(country));
            window.location.href = 'invoicePg.html';
            });

             function updateCartCount(count){
            const cartCount = document.getElementById('cartCount');
            
            if(cartCount){
                cartCount.textContent= count;

                if(count ===0){
                    cartCount.style.display = 'none';
                    cartCount.classList.add = 'hidden';
                }else{
                    cartCount.style.display = 'block';
                    cartCount.classList.remove = 'hidden';
                }
            }
        }


          window.onload = function() {
            console.log('Loading cart page...');
            console.log('Current cart:', cart);
            //cart.forEach(watch => {
                //const cartItemDiv = createCartItem(watch);
              //  cartItemsDiv.appendChild(cartItemDiv);
           // });
           updateCartCount(cart.length);
            checkLoginStatus();
            displayCart();
        };
