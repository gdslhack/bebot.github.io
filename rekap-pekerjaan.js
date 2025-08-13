import { db, collection, getDocs } from './firebase-config.js';
import { downloadCSV } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-jobs-csv');

    if (downloadButton) {
        downloadButton.addEventListener('click', async () => {
            const querySnapshot = await getDocs(collection(db, "jobs"));
            const jobs = [];
            querySnapshot.forEach((doc) => {
                jobs.push(doc.data());
            });

            if (jobs.length === 0) {
                alert('Tidak ada data untuk diunduh.');
                return;
            }

            downloadCSV(jobs, 'rekap-pekerjaan.csv');
        });
    }
});
