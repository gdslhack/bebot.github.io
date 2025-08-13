import { db, collection, addDoc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');

    if (!addProductForm) return; // kalau form gak ada, langsung keluar

    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newProduct = {
            name: e.target['product-name'].value.trim(),
            stock: parseInt(e.target.stock.value) || 0,
            price: parseInt(e.target.price.value) || 0
        };

        try {
            await addDoc(collection(db, "products"), newProduct);
            alert('Produk berhasil ditambahkan!');
            window.location.href = 'mikrostok.html';
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Gagal menambahkan produk. Silakan coba lagi.');
        }
    });
});
