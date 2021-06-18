import { loginData } from '../Login/Login';

function FetchData() {
    
    var soeid = document.getElementsByClassName('empSoeId');
    soeid.innerHTML = loginData.soeid;

    var mail = document.getElementsByClassName('empEmail');

    var name = document.getElementsByClassName('empName');
    var bu = document.getElementsByClassName('bu');

    for(var i=0;i<name.length;i++) {
        name[i].innerHTML = loginData.name;
    }

    for(var i=0;i<bu.length;i++) {
        bu[i].innerHTML = loginData.bu;
    }

    for(var ml of mail) {
        ml.innerHTML = loginData.email;
    }


}