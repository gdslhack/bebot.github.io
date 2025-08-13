import { db, collection, onSnapshot, deleteDoc, doc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const productsTableBody = document.getElementById('products-table-body');
    const addProductButton = document.getElementById('add-product-button');

    const q = collection(db, "products");
    onSnapshot(q, (querySnapshot) => {
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        if (!productsTableBody) return;
        productsTableBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">${product.name}</td>
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">${product.stock}</td>
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Rp ${product.price.toLocaleString('id-ID')}</td>
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <button class="text-blue-500 hover:underline" onclick="window.location.href='edit-product.html?id=${product.id}'">Edit</button>
                    <button class="text-red-500 hover:underline ml-2" onclick="deleteProduct('${product.id}')">Hapus</button>
                </td>
            `;
            productsTableBody.appendChild(row);
        });
    });

    async function deleteProduct(id) {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            await deleteDoc(doc(db, "products", id));
        }
    }

    if (addProductButton) {
        addProductButton.addEventListener('click', () => {
            window.location.href = 'add-product.html';
        });
    }

    window.deleteProduct = deleteProduct;
});
