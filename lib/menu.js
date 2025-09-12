const items = {
    '1': { name: 'Nasi Goreng', price: 15000 },
    '2': { name: 'Mie Ayam', price: 12000 },
    '3': { name: 'Es Teh', price: 3000 },
    '4': { name: 'Sate Ayam', price: 10000},
    '5': { name: 'Sate Kambing', price: 15000},
    '6': { name: 'Nasi Briyani', price: 20000},
    '7': { name: 'Es Jeruk', price: 5000},
    '8': { name: 'Milo Es', price: 8000},
    '9': { name: 'Kentang Goreng', price: 7000},
    '10': { name: 'Martabak', price: 10000}
};

const show = () => {
    console.log('\nMenu:');
    for (let id in items) {
        console.log(`${id}. ${items[id].name} - ${items[id].price}`);
    }
};

const get = (id) => {
    return items[id] || null;
};

module.exports = { show, get };