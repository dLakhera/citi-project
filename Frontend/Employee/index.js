function FetchData() {
    
    var soeid = document.getElementsByClassName('empSoeId');
    soeid.innerHTML = localStorage.getItem('soeid');

    var mail = document.getElementsByClassName('empEmail');

    var name = document.getElementsByClassName('empName');
    var bu = document.getElementsByClassName('bu');

    for(var i=0;i<name.length;i++) {
        name[i].innerHTML = localStorage.getItem('name');
    }

    for(var i=0;i<bu.length;i++) {
        bu[i].innerHTML = localStorage.getItem('bu');
    }

    for(var ml of mail) {
        ml.innerHTML = localStorage.getItem('emai;');
    }


}