import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDJKeovIR2eHAZlmyIwtEouh58rxBNUZoY",
  authDomain: "cogniverse-a13b9.firebaseapp.com",
  projectId: "cogniverse-a13b9",
  storageBucket: "cogniverse-a13b9.firebasestorage.app",
  messagingSenderId: "92120322234",
  appId: "1:92120322234:web:25b63c5d54752709f7f283"
};

// 🔹 Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 🔹 DOM elements
const form = document.getElementById("contactForm");
const userInfo = document.getElementById("userInfo");
const loginBtn = document.querySelector('a[href="login.html"]');

// 🔹 Form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  try {
    await addDoc(collection(db, "feedback"), {
      name,
      email,
      phone,
      message,
      createdAt: new Date()
    });

    alert("Thank you for your feedback");
    form.reset();
  } catch (error) {
    console.error(error);
    alert("Error");
  }
});


onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = "none";
    userInfo.innerText = "👤 " + user.email;
  } else {
    loginBtn.style.display = "inline";
    userInfo.innerText = "";
  }
});


function explore() {
  document.getElementById("loader").style.display = "flex";

  setTimeout(() => {
    window.location.href = "pages/Home.html";
  }, 3000);
}

function scrollToAbout() {
  document.getElementById("about").scrollIntoView({
    behavior: "smooth",
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// 🔹 Make global
window.explore = explore;
window.scrollToAbout = scrollToAbout;
window.scrollToTop = scrollToTop;