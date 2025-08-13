import { db, doc, getDoc, setDoc, onAuthChange } from './firebase-config.js';
import { updatePassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = null;

    onAuthChange(user => {
        currentUser = user; // simpan user yang sedang login
    });

    const passwordForm = document.getElementById('password-form');
    const bankForm = document.getElementById('bank-form');

    const bankNameInput = document.getElementById('bank-name');
    const accountNumberInput = document.getElementById('account-number');
    const accountNameInput = document.getElementById('account-name');

    async function loadSettings() {
        const docRef = doc(db, "settings", "bank");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const settings = docSnap.data();
            if (settings.bank) {
                bankNameInput.value = settings.bank.name || '';
                accountNumberInput.value = settings.bank.number || '';
                accountNameInput.value = settings.bank.accountName || '';
            }
        }
    }

    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newPassword = e.target['new-password'].value;
            const confirmPassword = e.target['confirm-password'].value;

            if (newPassword !== confirmPassword) {
                alert('Password baru dan konfirmasi password tidak cocok.');
                return;
            }

            if (currentUser) {
                updatePassword(currentUser, newPassword).then(() => {
                    alert('Password berhasil diubah.');
                    passwordForm.reset();
                }).catch((error) => {
                    console.error("Error updating password: ", error);
                    alert('Gagal mengubah password. Silakan coba lagi.');
                });
            } else {
                alert('User belum login.');
            }
        });
    }

    if (bankForm) {
        bankForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const bankSettings = {
                name: bankNameInput.value,
                number: accountNumberInput.value,
                accountName: accountNameInput.value
            };
            try {
                await setDoc(doc(db, "settings", "bank"), { bank: bankSettings });
                alert('Rekening bank berhasil disimpan.');
            } catch (error) {
                console.error("Error writing document: ", error);
                alert('Gagal menyimpan rekening bank.');
            }
        });
    }

    loadSettings();
});
