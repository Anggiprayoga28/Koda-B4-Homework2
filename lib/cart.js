const menu = require('./menu');

let items = [];

const add = (id, qty) => {
    const menuItem = menu.get(id);
    if (!menuItem) {
        return 'Menu tidak ada';
    }
    
    const existing = items.find(item => item.id === id);
    if (existing) {
        existing.qty += qty;
    } else {
        items.push({ 
            id: id, 
            name: menuItem.name, 
            price: menuItem.price, 
            qty: qty 
        });
    }
    
    return `${menuItem.name} x${qty} ditambahkan`;
};

const getTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.qty), 0);
};

const getItemCount = () => {
    return items.reduce((count, item) => count + item.qty, 0);
};

const show = () => {
    if (items.length === 0) {
        console.log('\nKeranjang kosong');
        return;
    }
    
    console.log('\nIsi Keranjang:');
    let total = 0;
    items.forEach(item => {
        const subtotal = item.price * item.qty;
        console.log(`${item.name} x${item.qty} = Rp ${subtotal.toLocaleString()}`);
        total += subtotal;
    });
    console.log(`Total: Rp ${total.toLocaleString()}`);
};

const getItems = () => {
    return [...items];
};

const isEmpty = () => {
    return items.length === 0;
};

const clear = () => {
    items = [];
};

module.exports = { 
    add, 
    show, 
    getTotal, 
    getItems, 
    isEmpty, 
    clear, 
    getItemCount 
};