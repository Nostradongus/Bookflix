// for cart modal, to attach a function event to the remove button of each cart item 
$(document).ready(function () {
    // for every remove button of each cart item, remove item as well as its object data asynchronously
    $('#cart').on('click', '.cart-item-btn', function () {
        var btn = this; 

        // ajax query to remove cart item's data in the user local cart object 
        $.get('/deletefromcart', {id: $(this).attr('id')}, function (newPrice) {
            // remove cart item in the list and update new total price
            $(btn).parent().parent().remove();
            $('#cart-total-price').text('Total: ₱ ' + newPrice);

            // if on item page, modify item cart div button as well 
            if ($('.cart-btn').length > 0 && $('.cart-btn').attr('id').split("-")[1] === $(btn).attr('id')) {
                $('.cart-btn').attr('id', 'add-' + $(btn).attr('id'));
                $('.cart-btn').html('<span class="fa fa-shopping-cart"></span> Add to Cart');
            }

            // if on checkout page, reload cart item list div 
            if ($('#price-container').length > 0) {
                $('#price-container').load('/checkout #price-container', function () {
                    $(this).children().unwrap();
                });
            }
        });
    });

    // for cart div button on item page, to add or remove item to and from cart 
    $('.cart-btn').click(function () {
        // get id of cart div button 
        var id = $(this).attr('id').split("-"); 
        var div = this; 

        // if item shall be removed from cart 
        if (id[0] === "remove") {
            // ajax query to remove cart item's data in the user local cart object 
            $.get('/deletefromcart', {id: id[1]}, function (newPrice) {
                // remove cart item in the cart modal list and update its new total price 
                $('#' + id[1]).parent().parent().remove(); 
                $('#cart-total-price').text('Total: ₱ ' + newPrice);

                // change id of cart div button as well as its text content 
                $(div).attr('id', 'add-' + id[1]);
                $(div).html('<span class="fa fa-shopping-cart"></span> Add to Cart');
            });
        }
        // if item shall be added to cart 
        else {
            // ajax query to add item data to the user local cart object 
            $.get('/addtocart', {id: id[1]}, function (data) {
                // create item html content to be stored in the cart modal list and update its new total price 
                var cartItem = document.createElement("div");
                cartItem.setAttribute('class', 'cart-item');

                var img = document.createElement("img"); 
                img.setAttribute('class', 'cart-item-left'); 
                img.setAttribute('src', data.img);

                var cartItemMid = document.createElement("div"); 
                cartItemMid.setAttribute('class', 'cart-item-mid');

                var type = document.createElement("h4"); 
                type.innerText = data.type; 

                var title = document.createElement("h4"); 
                title.innerText = data.title; 

                cartItemMid.append(type); 
                cartItemMid.append(title);

                var cartItemRight = document.createElement("div"); 
                cartItemRight.setAttribute('class', 'cart-item-right');

                var price = document.createElement("h4"); 
                price.innerText = "₱ " + data.price;

                var removeBtn = document.createElement("button"); 
                removeBtn.setAttribute('id', id[1]);

                removeBtn.setAttribute('class', 'cart-item-btn hvr-border-fade');
                removeBtn.innerText = "Remove"; 

                cartItemRight.append(price); 
                cartItemRight.append(removeBtn); 

                cartItem.append(img); 
                cartItem.append(cartItemMid); 
                cartItem.append(cartItemRight);

                $('#cart').append(cartItem);

                var tPrice = $('#cart-total-price').text().split(' '); 
                var newPrice = parseFloat(tPrice[2]) + parseFloat(data.price);
                $('#cart-total-price').text('Total: ₱ ' + newPrice.toFixed(2));

                // change id of cart div button as well as its text content 
                $(div).attr('id', 'remove-' + id[1]); 
                $(div).html('<span class="fa fa-shopping-cart"></span> Remove from Cart');
            });
        }
    });

    // for cart modal, to check if there are cart items in the list 
    $('#cart-icon').click(function () {
        if (parseInt($('#cart-total-price').text().split(' ')[2]) === 0) {
            $('#cartError').text('No items yet! Add items to cart first');
            $('#checkout-btn').css('pointer-events', 'none');
        }
        else {
            $('#cartError').text('');
            $('#checkout-btn').css('pointer-events', 'auto');
        }
    });
})