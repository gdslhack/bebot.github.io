import { db, collection, getDocs } from './firebase-config.js';
import { downloadCSV } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-stock-csv');

    if (downloadButton) {
        downloadButton.addEventListener('click', async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push(doc.data());
            });

            if (products.length === 0) {
                alert('Tidak ada data untuk diunduh.');
                return;
            }

            downloadCSV(products, 'rekap-stok.csv');
        });
    }
});
