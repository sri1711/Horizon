$(document).ready(function () {
    var user_name = document.getElementById("user-name")
    var user_email = document.getElementById("user-email")

    user_name.innerHTML = localStorage.getItem("user_name")
    user_email.innerHTML = localStorage.getItem("user_email")

    var number = Math.floor((Math.random() * 5));
    var url = "../assets/def_profile" + number + ".png"

    var src_array = ['https://firebasestorage.googleapis.com/v0/b/horizon-movie-paradise-2.appspot.com/o/def_profile1.png?alt=media&token=3446cb28-5683-4df6-aeb2-04ffbbe1c86c',
        'https://firebasestorage.googleapis.com/v0/b/horizon-movie-paradise-2.appspot.com/o/def_profile2.png?alt=media&token=6da918f3-9bfb-498a-8a7b-221b91e7ed0f',
        'https://firebasestorage.googleapis.com/v0/b/horizon-movie-paradise-2.appspot.com/o/def_profile3.png?alt=media&token=d9a1821e-7b3f-4a0e-8fb0-d87bd6e7437a',
        'https://firebasestorage.googleapis.com/v0/b/horizon-movie-paradise-2.appspot.com/o/def_profile4.png?alt=media&token=711f1637-2f3f-4034-8a92-0e944d37464f',
        'https://firebasestorage.googleapis.com/v0/b/horizon-movie-paradise-2.appspot.com/o/def_profile5.png?alt=media&token=8d3e5a7d-ea6c-4f33-aea4-3c18241c4f2c'
    ]

    $("#img_profile_image").attr("src",src_array[number]);
});