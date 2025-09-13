const readline = require('readline');
const menu = require('./lib/menu');
const cart = require('./lib/cart');
const history = require('./lib/history');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question) => {
    return new Promise(resolve => rl.question(question, resolve));
};

const showMainMenu = () => {

    console.log('\nPILIH MENU');
    console.log('1. Pesan Menu');
    console.log('2. Lihat Keranjang');
    console.log('3. Checkout');
    console.log('4. History');
    console.log('5. Exit');

};

const showMenuDetail = async () => {
    while (true) {
        menu.show();
        console.log('0. Kembali ke Menu Utama');
        
        const choice = await ask('Pilih ID menu (atau 0 untuk kembali): ');
        
        if (choice === '0') {
            return; 
        }
        
        const menuItem = menu.get(choice);
        if (!menuItem) {
            console.log('Menu tidak ada');
            continue;
        }
        
        console.log(`\n${menuItem.name.toUpperCase()}`);
        console.log(`Harga: Rp ${menuItem.price.toLocaleString()}`);
        
        while (true) {
            console.log('\n1. Tambah ke Keranjang');
            console.log('2. Kembali ke Daftar Menu');
            console.log('3. Kembali ke Menu Utama');
            
            const action = await ask('Pilih aksi: ');
            
            if (action === '1') {
                const qty = parseInt(await ask('Masukkan jumlah: '));
                if (qty > 0) {
                    const result = cart.add(choice, qty);
                    console.log(result);
                    
                    const newTotal = cart.getTotal();
                    const newCount = cart.getItemCount();
                    console.log(`Status keranjang: ${newCount} item - Total: Rp ${newTotal.toLocaleString()}`);
                } else {
                    console.log('Jumlah harus lebih dari 0!');
                }
            } else if (action === '2') {
                break; 
            } else if (action === '3') {
                return; 
            } else {
                console.log('Pilihan tidak valid!');
            }
        }
    }
};

const runApp = async () => {
    console.log('Restaurant');
    
    while (true) {
        showMainMenu();
        const choice = await ask('Pilih: ');
        
        if (choice === '1') {
            await showMenuDetail();
        } else if (choice === '2') {
            cart.show();
            await ask('Tekan Enter untuk kembali');
        } else if (choice === '3') {
            if (cart.isEmpty()) {
                console.log('Keranjang kosong');
                await ask('Tekan Enter untuk kembali');
            } else {
                const total = cart.getTotal();
                console.log(`Total pembayaran: Rp ${total.toLocaleString()}`);
                
                console.log('\n1. Konfirmasi Pembayaran');
                console.log('2. Batal');
                const confirm = await ask('Pilih: ');
                
                if (confirm === '1') {
                    history.add(cart.getItems(), total);
                    cart.clear();
                    console.log('Order berhasil!');
                    await ask('Tekan Enter untuk kembali');
                }
            }
        } else if (choice === '4') {
            history.show();
            await ask('Tekan Enter untuk kembali');
        } else if (choice === '5') {
            console.log('Terima kasih');
            rl.close();
            return;
        } else {
            console.log('Pilihan tidak valid');
        }
    }
};

runApp();