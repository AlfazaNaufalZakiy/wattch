// js/firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Konfigurasi Firebase kamu
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

// Pastikan DOM sudah siap dulu
document.addEventListener("DOMContentLoaded", () => {
  // Atur agar auth tersimpan secara local (tetap login setelah reload)
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      const loginButton = document.querySelector(".login-btn");

      loginButton.addEventListener("click", () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
          Swal.fire({
            icon: 'warning',
            title: 'Login Gagal',
            text: 'Email dan Password tidak boleh kosong.',
            confirmButtonColor: '#ff9736'
          });
          return;
        }

        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Login Berhasil',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              window.location.href = "profile.html";
            });
          })
          .catch((error) => {
            let message = "";
            switch (error.code) {
              case "auth/invalid-email":
              case "auth/user-not-found":
              case "auth/wrong-password":
                message = "Email/Password yang Anda masukkan tidak valid.";
                break;
              case "auth/too-many-requests":
                message = "Terlalu banyak percobaan login. Coba lagi nanti.";
                break;
              default:
                message = "Terjadi kesalahan. Silakan coba lagi.";
            }

            Swal.fire({
              icon: 'error',
              title: 'Login Gagal',
              text: message,
              confirmButtonColor: '#ff9736'
            });
          });
      });
    })
    .catch((error) => {
      console.error("Gagal mengatur persistensi login:", error);
    });
});
