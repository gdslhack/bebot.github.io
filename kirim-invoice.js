import { db, collection, getDocs, doc, getDoc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const selectJob = document.getElementById('select-job');
    const invoicePreview = document.getElementById('invoice-preview');
    const invoiceForm = document.getElementById('invoice-form');
    let jobs = [];
    let bankSettings = {};

    async function loadInitialData() {
        // Load jobs
        const jobsSnapshot = await getDocs(collection(db, "jobs"));
        jobs = [];
        jobsSnapshot.forEach((doc) => {
            jobs.push({ id: doc.id, ...doc.data() });
        });

        if (selectJob) {
            selectJob.innerHTML = '<option value="">Pilih Pekerjaan</option>';
            jobs.forEach(job => {
                const option = document.createElement('option');
                option.value = job.id;
                option.textContent = `${job.client} - ${job.job}`;
                selectJob.appendChild(option);
            });
        }

        // Load bank settings
        const docRef = doc(db, "settings", "bank");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const settings = docSnap.data();
            if (settings.bank) {
                bankSettings = settings.bank;
            }
        }
    }

    function generateInvoicePreview() {
        const selectedJobId = selectJob.value;
        if (!selectedJobId) {
            invoicePreview.value = '';
            return;
        }

        const job = jobs.find(j => j.id == selectedJobId);
        if (!job) return;

        let invoiceText;
        if (job.status === 'Selesai') {
            invoiceText = `
LUNAS

Halo, ${job.client}.

Terima kasih atas pembayarannya untuk pekerjaan berikut:
- Pekerjaan: ${job.job}
- Keterangan: ${job.description}
- Total Harga: Rp ${job.price.toLocaleString('id-ID')}

Terima kasih.
            `.trim();
        } else {
            invoiceText = `
Halo, ${job.client}.

Berikut adalah rincian tagihan untuk pekerjaan Anda:
- Pekerjaan: ${job.job}
- Keterangan: ${job.description}
- Status: ${job.status}
- Total Harga: Rp ${job.price.toLocaleString('id-ID')}

Silakan transfer ke rekening berikut:
Bank: ${bankSettings.name || ''}
Nomor Rekening: ${bankSettings.number || ''}
Atas Nama: ${bankSettings.accountName || ''}

Terima kasih.
            `.trim();
        }

        invoicePreview.value = invoiceText;
    }

    if (selectJob) {
        selectJob.addEventListener('change', generateInvoicePreview);
    }

    if (invoiceForm) {
        invoiceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedJobId = selectJob.value;
            if (!selectedJobId) {
                alert('Silakan pilih pekerjaan terlebih dahulu.');
                return;
            }

            const job = jobs.find(j => j.id == selectedJobId);
            if (!job) return;

            const phoneNumber = job.phone.startsWith('0') ? '62' + job.phone.substring(1) : job.phone;
            const message = encodeURIComponent(invoicePreview.value);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

            window.open(whatsappUrl, '_blank');
        });
    }

    loadInitialData();
});
