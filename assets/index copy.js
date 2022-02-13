import*as bootstrap from'bootstrap';

function NavigateAsFresh(){   
    window.location.replace('your link');
   return false;
}

function test(){
    alert();
}


window.onload = function() {
    var anchors = document.getElementsByClassName('click-movie-details');
    for(var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        anchor.onclick = function() {
        openPage('md');
        }
    }
}

function openPage(id){
    if(id=='md'){
        window.open('movie_details.html')
    }else if(id=="lg"){
        window.open('login.html')
    }
}

$("#input-query-field").keypress(function(event){
    if(event.which == 13){
        event.preventDefault();
        $("#form-query").submit();
    }
});

