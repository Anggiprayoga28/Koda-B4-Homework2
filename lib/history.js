let orders = [];

const add = (items, total) => {
    const order = {
        items: [...items], 
        total: total, 
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    
    orders.unshift(order);
    
    if (orders.length > 5) {
        orders.pop();
    }
};

const show = () => {
    if (orders.length === 0) {
        console.log('\nTidak ada history');
        return;
    }
    
    console.log('\nHistory:');
    orders.forEach((order, index) => {
        console.log(`${index + 1}. ${order.date} ${order.time} - Rp ${order.total.toLocaleString()}`);
        order.items.forEach(item => {
            console.log(`   ${item.name} x${item.qty}`);
        });
        console.log('');
    });
};

module.exports = { add, show };