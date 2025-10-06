const menu = require('./menu');

let items = [];

const validateQuantity = (qty) => {
    if (typeof qty !== 'number' || isNaN(qty) || qty <= 0) {
        return false;
    }
    return true;
};

const add = (id, qty) => {
    if (!id) {
        return 'ID menu tidak valid';
    }
    
    if (!validateQuantity(qty)) {
        return 'Jumlah harus berupa angka positif';
    }
    
    const menuItem = menu.get(id);
    if (!menuItem) {
        return 'Menu tidak ditemukan';
    }
    
    const existing = items.find(item => item.id === id);
    if (existing) {
        existing.qty += qty;
        return `${menuItem.name} ditambahkan. Total: x${existing.qty}`;
    } else {
        items.push({ 
            id: id, 
            name: menuItem.name, 
            price: menuItem.price, 
            qty: qty 
        });
        return `${menuItem.name} x${qty} ditambahkan ke keranjang`;
    }
};

const getTotal = () => {
    return items.reduce((sum, item) => {
        if (!item.price || !item.qty) return sum;
        return sum + (item.price * item.qty);
    }, 0);
};

const getItemCount = () => {
    return items.reduce((count, item) => {
        if (!item.qty) return count;
        return count + item.qty;
    }, 0);
};

const show = () => {
    if (items.length === 0) {
        console.log('\nKeranjang kosong');
        return;
    }
    
    console.log('\nISI KERANJANG');
    let total = 0;
    let itemNumber = 1;
    
    items.forEach(item => {
        if (!item.name || !item.price || !item.qty) {
            console.log(`${itemNumber}. [Data tidak valid]`);
            itemNumber++;
            return;
        }
        
        const subtotal = item.price * item.qty;
        console.log(`${itemNumber}. ${item.name}`);
        console.log(`   ${item.qty} x Rp ${item.price.toLocaleString()} = Rp ${subtotal.toLocaleString()}`);
        total += subtotal;
        itemNumber++;
    });
    
    console.log(`TOTAL: Rp ${total.toLocaleString()}`);
};

const getItems = () => {
    return items.map(item => ({...item}));
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