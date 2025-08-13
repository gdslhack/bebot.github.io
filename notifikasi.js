import { db, collection, getDocs, query, where } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const notificationsList = document.getElementById('notifications-list');

    async function loadNotifications() {
        const q = query(collection(db, "products"), where("stock", "<=", 3));
        const querySnapshot = await getDocs(q);
        const lowStockProducts = [];
        querySnapshot.forEach((doc) => {
            lowStockProducts.push(doc.data());
        });

        if (!notificationsList) return;
        notificationsList.innerHTML = '';

        if (lowStockProducts.length === 0) {
            notificationsList.innerHTML = '<p class="text-gray-700 dark:text-gray-300">Tidak ada notifikasi.</p>';
            return;
        }

        lowStockProducts.forEach(product => {
            const notification = document.createElement('div');
            notification.className = 'p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-300';
            notification.innerHTML = `
                <p><span class="font-bold">Stok Rendah:</span> Stok produk "${product.name}" tersisa ${product.stock}.</p>
            `;
            notificationsList.appendChild(notification);
        });
    }

    loadNotifications();
});
