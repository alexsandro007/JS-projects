import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwdYAw3dCqeNZuti2EI9jtQa6q6OQCtFA",
    authDomain: "news-blog-07.firebaseapp.com",
    projectId: "news-blog-07",
    storageBucket: "news-blog-07.appspot.com",
    messagingSenderId: "929861716357",
    appId: "1:929861716357:web:fb8f3d6b77490c73fb5cec",
    measurementId: "G-84MY68TCY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

let count_click_log = true;
let count_click_sign = false;

//----- New Registration code start	  
document.getElementById("signupBtn").addEventListener("click", function() {
    if(count_click_sign){
        let email =  document.getElementById("login_email").value;
        let password = document.getElementById("login_pass").value;
        let username = document.getElementById("login_name").value;
        //For new registration
        createUserWithEmailAndPassword(auth, email, password, username)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            //alert("Registration successfully!!");
            logged_in_user_name = user.email.split("@")[0];
            document.getElementById('login_user_name').innerHTML = user.email.split("@")[0];
            document.getElementById('login_button').style.display = 'none';
            document.getElementById('login_user').style.display = 'flex';
            document.getElementById('login_user_name').style.marginRight = '5px';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(error);
        });	
    }
    count_click_sign = true;
    count_click_log = false;
});
//----- End

//----- Login code start	  
document.getElementById("loginBtn").addEventListener("click", function() {
    if(count_click_log){
        let email =  document.getElementById("login_email").value;
        let password = document.getElementById("login_pass").value;

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            //alert(user.email+" Login successfully!!!");
            logged_in_user_name = user.email.split("@")[0];
            document.getElementById('login_user_name').innerHTML = user.email.split("@")[0];
            document.getElementById('login_button').style.display = 'none';
            document.getElementById('login_user').style.display = 'flex';
            document.getElementById('login_user_name').style.marginRight = '5px';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
    }		  	
    count_click_sign = false;
    count_click_log = true;  
});
//----- End

//----- Logout code start	  
document.getElementById("login_user").addEventListener("click", function() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.');
        //alert('Sign-out successful.');
        document.getElementById('login_user').style.display = 'none';
        })
        .catch((error) => {
        // An error happened.
        console.log('An error happened.');
        });		  		  
        count_click_log = true;
        count_click_sign = false;
});
//----- End