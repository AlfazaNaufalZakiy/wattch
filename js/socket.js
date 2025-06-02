
    import { db } from './firebase.js';
    import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

    document.addEventListener("DOMContentLoaded", async () => {
      const checkbox = document.getElementById("myCheckbox");
      const docRef = doc(db, "checkboxStates", "checkbox1");

      try {
        // 1. Read from Firebase first
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Set checkbox state based on Firestore value
          checkbox.checked = data.checked ?? false;
          console.log("Checkbox initial state from Firebase:", checkbox.checked);
        } else {
          console.log("No checkbox state found in Firebase, defaulting to unchecked");
          checkbox.checked = false;
        }
      } catch (error) {
        console.error("Error reading checkbox state from Firebase:", error);
      }

      // 2. Listen to checkbox changes and update Firebase
      checkbox.addEventListener("change", async () => {
        const isChecked = checkbox.checked;
        try {
          await setDoc(docRef, {
            checked: isChecked,
            timestamp: new Date()
          });
          console.log("Checkbox state updated in Firebase:", isChecked);
        } catch (error) {
          console.error("Error writing to Firebase:", error);
        }
      });
    });

