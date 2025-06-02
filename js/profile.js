// js/profile.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Ganti dengan konfigurasi Firebase milikmu
const firebaseConfig = {
  apiKey: "AIzaSyDeecXLsYe2ENSuQLY-VOVBQucXL3FCcyw",
  authDomain: "wattch-b085c.firebaseapp.com",
  projectId: "wattch-b085c",
  storageBucket: "wattch-b085c.firebasestorage.app",
  messagingSenderId: "950450079114",
  appId: "1:950450079114:web:bbadc1d7261399a60eb473",
  measurementId: "G-RFWVTJRELX"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Tunggu auth state berubah
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        // Tampilkan data ke halaman
        const profileImg = document.getElementById("profileImage");
        if (data.foto_url) {
        profileImg.style.backgroundImage = `url('${data.foto_url}')`;
        profileImg.style.backgroundSize = "cover";
        profileImg.style.backgroundPosition = "center";
        profileImg.style.backgroundRepeat = "no-repeat";
        profileImg.textContent = ""; // hapus emoji jika gambar ada
        }

        document.getElementById("profileName").innerText = data.nama || "Nama Pengguna";
        document.getElementById("profileInfo").innerHTML = `
          <div>No. HP: ${data.no_hp || "-"}</div>
          <div>Email: ${data.email || user.email}</div>
          <div>Nama Kost: ${data.nama_kost || "-"}</div>
          <div>Nama Bangunan: ${data.nama_bangunan || "-"}</div>
          <div>No. Kost: ${data.no_kost || "-"}</div>
        `;
      } else {
        console.error("Dokumen pengguna tidak ditemukan di Firestore.");
        alert("Data profil tidak ditemukan.");
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      alert("Terjadi kesalahan saat mengambil data profil.");
    }
  } else {
    // Belum login → redirect ke login
    window.location.href = "index.html";
  }
});
