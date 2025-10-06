let orders = [];

const MAX_HISTORY = 5;

const validateOrder = (items, total) => {
    if (!Array.isArray(items) || items.length === 0) {
        return false;
    }
    if (typeof total !== 'number' || total <= 0) {
        return false;
    }
    return true;
};

const add = (items, total) => {
    if (!validateOrder(items, total)) {
        console.log('Data order tidak valid');
        return false;
    }
    
    const order = {
        items: items.map(item => ({...item})), 
        total: total, 
        date: new Date().toLocaleDateString('id-ID'),
        time: new Date().toLocaleTimeString('id-ID')
    };
    
    orders.unshift(order);
    
    if (orders.length > MAX_HISTORY) {
        orders = orders.slice(0, MAX_HISTORY);
    }
    
    return true;
};

const show = () => {
    if (orders.length === 0) {
        console.log('\nTidak ada riwayat pesanan');
        return;
    }
    
    console.log('\nHISTORY PESANAN');
    orders.forEach((order, index) => {
        if (!order.date || !order.time || !order.total) {
            console.log(`${index + 1}. [Data tidak lengkap]`);
            return;
        }
        
        console.log(`\n${index + 1}. Tanggal: ${order.date} | Waktu: ${order.time}`);
        console.log(`   Total: Rp ${order.total.toLocaleString()}`);
        
        if (Array.isArray(order.items) && order.items.length > 0) {
            console.log('   Item:');
            order.items.forEach(item => {
                if (item.name && item.qty) {
                    console.log(`   - ${item.name} x${item.qty}`);
                }
            });
        }
    });
};

const getAll = () => {
    return orders.map(order => ({...order}));
};

const clear = () => {
    orders = [];
};

module.exports = { add, show, getAll, clear };