import { db, doc, getDoc, updateDoc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const editJobForm = document.getElementById('edit-job-form');
    const jobIdInput = document.getElementById('job-id');
    const clientInput = document.getElementById('client');
    const phoneInput = document.getElementById('phone');
    const jobInput = document.getElementById('job');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const statusInput = document.getElementById('status');

    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    async function loadJobData() {
        if (!jobId) {
            console.error("Job ID tidak ditemukan di URL");
            alert("Job ID tidak valid. Kembali ke dashboard.");
            window.location.href = 'dashboard.html';
            return;
        }

        const docRef = doc(db, "jobs", jobId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const job = docSnap.data();
            jobIdInput.value = docSnap.id;
            clientInput.value = job.client || '';
            phoneInput.value = job.phone || '';
            jobInput.value = job.job || '';
            descriptionInput.value = job.description || '';
            priceInput.value = job.price || '';
            statusInput.value = job.status || '';
        } else {
            console.log("No such document!");
        }
    }

    if (editJobForm) {
        editJobForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const updatedJob = {
                client: clientInput.value,
                phone: phoneInput.value,
                job: jobInput.value,
                description: descriptionInput.value,
                price: parseInt(priceInput.value) || 0,
                status: statusInput.value
            };

            try {
                const docRef = doc(db, "jobs", jobIdInput.value);
                await updateDoc(docRef, updatedJob);
                alert('Pekerjaan berhasil diperbarui!');
                window.location.href = 'dashboard.html';
            } catch (error) {
                console.error("Error updating document: ", error);
                alert('Gagal memperbarui pekerjaan. Silakan coba lagi.');
            }
        });
    }

    loadJobData();
});
