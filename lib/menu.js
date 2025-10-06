const items = {
    '1': { name: 'Nasi Goreng', price: 15000 },
    '2': { name: 'Mie Ayam', price: 12000 },
    '3': { name: 'Es Teh', price: 3000 },
    '4': { name: 'Sate Ayam', price: 10000 },
    '5': { name: 'Sate Kambing', price: 15000 },
    '6': { name: 'Nasi Briyani', price: 20000 },
    '7': { name: 'Es Jeruk', price: 5000 },
    '8': { name: 'Milo Es', price: 8000 },
    '9': { name: 'Kentang Goreng', price: 7000 },
    '10': { name: 'Martabak', price: 10000 }
};

const show = () => {
    const menuKeys = Object.keys(items);
    
    if (menuKeys.length === 0) {
        console.log('\nMenu tidak tersedia');
        return [];
    }
    
    console.log('\nDAFTAR MENU');
    menuKeys.forEach(id => {
        const item = items[id];
        if (item && item.name && item.price) {
            console.log(`${id}. ${item.name} - Rp ${item.price.toLocaleString()}`);
        }
    });
    
    return menuKeys;
};

const get = (id) => {
    if (!id || typeof id !== 'string') {
        return null;
    }
    
    const item = items[id];
    if (!item) {
        return null;
    }
    
    return {
        name: item.name,
        price: item.price
    };
};

const getAll = () => {
    return {...items};
};

module.exports = { show, get, getAll };