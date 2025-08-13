import { db, collection, onSnapshot, deleteDoc, doc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const jobsTableBody = document.getElementById('jobs-table-body');
    const prosesCount = document.getElementById('proses-count');
    const pendingCount = document.getElementById('pending-count');
    const selesaiCount = document.getElementById('selesai-count');
    const estimasiPendapatan = document.getElementById('estimasi-pendapatan');

    const q = collection(db, "jobs");
    onSnapshot(q, (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((doc) => {
            jobs.push({ id: doc.id, ...doc.data() });
        });

        if (!jobsTableBody) return;
        jobsTableBody.innerHTML = '';
        let proses = 0;
        let pending = 0;
        let selesai = 0;
        let pendapatan = 0;

        jobs.forEach(job => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">${job.client}</td>
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">${job.phone}</td>
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">${job.job}</td>
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">${job.description}</td>
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Rp ${job.price.toLocaleString('id-ID')}</td>
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">${job.status}</td>
                <td class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <button class="text-blue-500 hover:underline" onclick="window.location.href='edit-job.html?id=${job.id}'">Edit</button>
                    <button class="text-red-500 hover:underline ml-2" onclick="deleteJob('${job.id}')">Hapus</button>
                </td>
            `;
            jobsTableBody.appendChild(row);

            if (job.status === 'Proses') proses++;
            if (job.status === 'Pending') pending++;
            if (job.status === 'Selesai') {
                selesai++;
                pendapatan += job.price;
            }
        });

        if (prosesCount) prosesCount.textContent = proses;
        if (pendingCount) pendingCount.textContent = pending;
        if (selesaiCount) selesaiCount.textContent = selesai;
        if (estimasiPendapatan) estimasiPendapatan.textContent = `Rp ${pendapatan.toLocaleString('id-ID')}`;
    });

    async function deleteJob(id) {
        if (confirm('Apakah Anda yakin ingin menghapus pekerjaan ini?')) {
            await deleteDoc(doc(db, "jobs", id));
        }
    }

    window.deleteJob = deleteJob;
});
