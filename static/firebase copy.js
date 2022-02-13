// Import the functions you need from the SDKs you need

$("#div-alert-login").hide()
$("#div-alert-register").hide()

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, onValue, snapshot } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXdF1MOl4lRnUjlEvVu5R423WRe3S-aMg",
    authDomain: "horizon-movie-paradise-2.firebaseapp.com",
    projectId: "horizon-movie-paradise-2",
    storageBucket: "horizon-movie-paradise-2.appspot.com",
    messagingSenderId: "384661370682",
    appId: "1:384661370682:web:48429aa212532470d38203",
    measurementId: "G-55ZXR6RKRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function create_user_account(_email, _password) {
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, _email, _password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
                var uid = user.uid
                console.log("SUCCESS : Account Creation")
                localStorage.setItem("uid", uid)
                resolve(uid)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                reject(12345)
                // ..
            });

    });
}

function signin_user_account(_email, _password) {
    if (_email != "" && _password != "") {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, _email, _password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const uid = user.uid
                console.log("Welcome " + uid + user.displayName)
                get_user_details_from_database(uid)
                    .then(function () {
                        window.open("profile_details.html", "_self")
                    }).catch(function () {
                        alert("SriKalahasthi is great!")
                    })
                console.log("ROLLBACK")

                // localStorage.setItem("login_user_name",_name);
                // ...
                // console.log("SUCCESS : Account Creation")
                // window.open("./registration_success.html");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    } else {
        $("#div-alert-login").show();
    }
}

function get_user_details_from_database(uid) {
    console.log("ENTERING")
    return new Promise(function (resolve, reject) {
        const db = getDatabase();
        const starCountRef = ref(db, 'users/' + uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            // updateStarCount(postElement, data);
            localStorage.setItem("user_name", data.username)
            localStorage.setItem("user_email", data.email)
            localStorage.setItem("user_dob", data.dob)
            localStorage.setItem("uid", uid)
            console.log(data)
            resolve()
        })
    })
}

$("#btn_submit").click(function () {
    var _email = $("#ipt_email").val();
    var _password = $("#ipt_password").val();
    signin_user_account(_email, _password)
})

$("#btn_register").click(function () {
    var _name = $("#ipt_reg_name").val();
    var _email = $("#ipt_reg_email").val();
    var _dob = $("#ipt_reg_dob").val();
    var _password = $("#ipt_reg_password").val();
    var _password_conf = $("#ipt_reg_password_conf").val();
    // let uid = (Math.random() + 1).toString(36).substring(2);
    if (_name != "" && _email != "" && _dob != "" && _password != "" && _password_conf != "" && _password === _password_conf) {
        create_user_account(_email, _password)
            .then(function (uid) {
                add_user_to_database(_name, _email, _dob, uid)
                    .then(function (flag) {
                        window.open("registration_success.html", "_self")
                    })
                    .catch(function (flag) {
                        alert("We cannot register you at this moment..");
                    })
            })
            .catch(function (err) {
                console.log("Returned with empty uid! ", err)
            })
    } else {
        $("#div-alert-register").show()
    }
})

$("#btn_signout").click(function () {
    logout()
});

$('#btn_user_icon').click(function(){
    const auth = getAuth()
    const user = auth.currentUser;
    const local_uid = localStorage.uid;
    if(local_uid==="empty"){
        window.open("login.html","_self")    
    }else{
        window.open("profile_details.html","_self"); 
    }
})

function add_user_to_database(_name, _email, _dob, uid) {
    return new Promise(function (resolve, reject) {
        const db = getDatabase();
        set(ref(db, 'users/' + uid), {
            username: _name,
            email: _email,
            dob: _dob
        }).then(function () {
            console.log("SUCCESS : Registration")
            localStorage.setItem("user_name", _name);
            localStorage.setItem("user_email", _email);
            localStorage.setItem("user_dob", _dob);
            resolve()
        })
            .catch(function () {
                console.log(error)
                reject()
            })
    });
}

function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        window.alert("Logged out successfully")
        location.replace('index.html')
        localStorage.setItem("user_name", "No-user")
        localStorage.setItem("user_email", "nothing@gmail.com")
        localStorage.setItem("user_dob", "00-00-00")
        localStorage.setItem("uid", "empty")
        var user = auth.currentUser;
        console.log("?? -> " + user)
        // Sign-out successful.
    }).catch((error) => {
        window.alert(error.code + " " + error.message)
        // An error happened.
    });
}

