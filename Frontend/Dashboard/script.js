
const loginForm = require('../Login/Login')

$(document).ready(()=>{
  
  $('#open-sidebar').click(()=>{
      $('#sidebar').addClass('active');
      $('#sidebar-overlay').removeClass('d-none');
   });
  
   $('#sidebar-overlay').click(function(){
      $('#sidebar').removeClass('active');
      $(this).addClass('d-none');
    
   });
  
});

function FetchData() {
   
   if(!loginData.Auth) {
      window.location.href = "../Login/Login.html"
   }

   var name = document.getElementById('empName');
   var department = document.getElementById('department');
   var soeid = document.getElementById('soeid');

   name.innerHTML =       loginData.name;
   department.innerHTML = loginData.department;
   soeid.innerHTML =      loginData.soeId;

   var accessLevel = loginData.access;

   var manager = document.getElementById('manager-tab');
   var employee = document.getElementById('employee-tab');
   var vendor = document.getElementById('vendor-tab');

   if(accessLevel == 0) {
      manager.style.display = "none";
      employee.style.display = "none";
   } else if (accessLevel == 1) {
      manager.style.display = "none";
      vendor.style.display = "none";
   } else {
      employee.style.display = "none";
      vendor.style.display = "none";
   }
}

function clearLocalStorage() {
   sessionStorage.setItem('Auth', false);
}