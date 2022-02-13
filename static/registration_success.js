// // alert(window.name)


var ele = document.getElementById("user-name")
ele.innerHTML =  localStorage.getItem("user_name")

$(document).ready(function () {
    // $("#user-name").html = localStorage.getItem("user_name")
    $("#sign-in-rs").click(function () {
        window.open("login", "_self")
    });

});