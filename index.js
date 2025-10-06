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

const validateNumericInput = (input, min = 0, max = Infinity) => {
    const num = parseInt(input);
    if (isNaN(num) || num < min || num > max) {
        return null;
    }
    return num;
};

const showMenuDetail = async () => {
    while (true) {
        const availableMenus = menu.show();
        if (!availableMenus || availableMenus.length === 0) {
            console.log('Menu tidak tersedia');
            return;
        }
        
        console.log('0. Kembali ke Menu Utama');
        
        const choice = await ask('Pilih ID menu (atau 0 untuk kembali): ');
        
        if (choice === '0') {
            return; 
        }
        
        const menuItem = menu.get(choice);
        if (!menuItem) {
            console.log('Menu tidak ada. Silakan pilih ID yang valid.');
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
                const qtyInput = await ask('Masukkan jumlah: ');
                const qty = validateNumericInput(qtyInput, 1, 1000);
                
                if (qty === null) {
                    console.log('Input tidak valid! Jumlah harus berupa angka positif (1-1000).');
                    continue;
                }
                
                const result = cart.add(choice, qty);
                console.log(result);
                
                const newTotal = cart.getTotal();
                const newCount = cart.getItemCount();
                console.log(`Status keranjang: ${newCount} item - Total: Rp ${newTotal.toLocaleString()}`);
            } else if (action === '2') {
                break; 
            } else if (action === '3') {
                return; 
            } else {
                console.log('Pilihan tidak valid! Silakan pilih 1, 2, atau 3.');
            }
        }
    }
};

const handleCheckout = async () => {
    if (cart.isEmpty()) {
        console.log('Keranjang kosong. Silakan pesan menu terlebih dahulu.');
        await ask('Tekan Enter untuk kembali');
        return;
    }
    
    cart.show();
    const total = cart.getTotal();
    console.log(`\nTotal pembayaran: Rp ${total.toLocaleString()}`);
    
    console.log('\n1. Konfirmasi Pembayaran');
    console.log('2. Batal');
    const confirm = await ask('Pilih: ');
    
    if (confirm === '1') {
        const orderData = cart.getItems();
        if (orderData && orderData.length > 0) {
            history.add(orderData, total);
            cart.clear();
            console.log('\nOrder berhasil! Terima kasih atas pesanan Anda.');
        } else {
            console.log('Terjadi kesalahan saat memproses pesanan.');
        }
    } else if (confirm === '2') {
        console.log('Checkout dibatalkan.');
    } else {
        console.log('Pilihan tidak valid. Checkout dibatalkan.');
    }
    
    await ask('Tekan Enter untuk kembali');
};

const runApp = async () => {
    console.log('   SELAMAT DATANG DI RESTAURANT  ');
    
    while (true) {
        try {
            showMainMenu();
            const choice = await ask('Pilih: ');
            
            switch (choice) {
                case '1':
                    await showMenuDetail();
                    break;
                    
                case '2':
                    cart.show();
                    await ask('Tekan Enter untuk kembali');
                    break;
                    
                case '3':
                    await handleCheckout();
                    break;
                    
                case '4':
                    history.show();
                    await ask('Tekan Enter untuk kembali');
                    break;
                    
                case '5':
                    console.log('\nTerima kasih telah menggunakan layanan kami!');
                    rl.close();
                    return;
                    
                default:
                    console.log('Pilihan tidak valid. Silakan pilih 1-5.');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error.message);
            console.log('Aplikasi akan kembali ke menu utama...');
        }
    }
};

runApp().catch(error => {
    console.error('Kesalahan fatal:', error.message);
    rl.close();
    process.exit(1);
});