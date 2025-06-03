// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeecXLsYe2ENSuQLY-VOVBQucXL3FCcyw",
  authDomain: "wattch-b085c.firebaseapp.com",
  projectId: "wattch-b085c",
  storageBucket: "wattch-b085c.firebasestorage.app",
  messagingSenderId: "950450079114",
  appId: "1:950450079114:web:bbadc1d7261399a60eb473"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
console.log("✅ Firebase initialized");

const db = firebase.firestore();
const notifList = document.getElementById("notifList");

// Validasi elemen
if (!notifList) {
  console.error("❌ Element dengan id #notifList tidak ditemukan.");
}

// Ambil data notifikasi
db.collection("notifications")
  .orderBy("timestamp", "desc")
  .onSnapshot((snapshot) => {
    console.log("📦 Jumlah dokumen:", snapshot.size);
    notifList.innerHTML = "";

    if (snapshot.empty) {
      notifList.innerHTML = `
        <li style="text-align:center; padding: 20px; color: #999;">
          Tidak ada notifikasi
        </li>`;
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log("🔔 Notif:", data);

      const li = document.createElement("li");
      li.innerHTML = `
        <span class="icon">⚠️</span>
        <div>
          <p>${data.message}</p>
          <span>${data.datedisplay} · ${data.timedisplay}</span>
        </div>
      `;
      notifList.appendChild(li);
    });
  }, (error) => {
    console.error("❌ Gagal mengambil notifikasi:", error.message);
    notifList.innerHTML = `
      <li style="text-align:center; padding: 20px; color: red;">
        Gagal mengambil notifikasi
      </li>`;
  });
