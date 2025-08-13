import { db, collection, addDoc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const addJobForm = document.getElementById('add-job-form');

    if (addJobForm) {
        addJobForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const newJob = {
                client: e.target.client.value,
                phone: e.target.phone.value,
                job: e.target.job.value,
                description: e.target.description.value,
                price: parseInt(e.target.price.value),
                status: e.target.status.value
            };

            try {
                await addDoc(collection(db, "jobs"), newJob);
                alert('Pekerjaan berhasil ditambahkan!');
                window.location.href = 'dashboard.html';
            } catch (error) {
                console.error("Error adding document: ", error);
                alert('Gagal menambahkan pekerjaan. Silakan coba lagi.');
            }
        });
    }
});
