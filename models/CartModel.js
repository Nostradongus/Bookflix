// cart object constructor which will be created in session (per user)
function Cart(sessionCart) {
    // item list 
    this.items = sessionCart.items || {}; 
    // total price of the items in the list 
    this.tPrice = sessionCart.tPrice || 0;

    // adds an item to the cart 
    this.addItem = function(id, item) {
        this.items[id] = item; 
        this.tPrice += item.price; 
    };

    // removes an item from the cart 
    this.deleteItem = function(id) {
        this.tPrice -= this.items[id].price; 
        delete this.items[id];
    };

    // checks if item is already added to the cart 
    this.checkItem = function(id) {
        if (this.items[id] != null)
            return true; 
        
        return false; 
    };

    // transfers item to an array to be returned and used on page rendering
    this.generateArr = function() {
        var arr = []; 
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr; 
    };
};

module.exports = Cart;