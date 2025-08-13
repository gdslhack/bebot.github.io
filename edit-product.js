import { db, doc, getDoc, updateDoc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const editProductForm = document.getElementById('edit-product-form');
    const productIdInput = document.getElementById('product-id');
    const productNameInput = document.getElementById('product-name');
    const stockInput = document.getElementById('stock');
    const priceInput = document.getElementById('price');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    async function loadProductData() {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const product = docSnap.data();
            productIdInput.value = docSnap.id;
            productNameInput.value = product.name;
            stockInput.value = product.stock;
            priceInput.value = product.price;
        } else {
            console.log("No such document!");
        }
    }

    if (editProductForm) {
        editProductForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const updatedProduct = {
                name: productNameInput.value,
                stock: parseInt(stockInput.value),
                price: parseInt(priceInput.value)
            };

            try {
                const docRef = doc(db, "products", productIdInput.value);
                await updateDoc(docRef, updatedProduct);
                alert('Produk berhasil diperbarui!');
                window.location.href = 'mikrostok.html';
            } catch (error) {
                console.error("Error updating document: ", error);
                alert('Gagal memperbarui produk. Silakan coba lagi.');
            }
        });
    }

    loadProductData();
});
