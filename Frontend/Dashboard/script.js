
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

function submitForm() {
      var data = $("#leaveForm").serializeArray();
      var json = {
         "empId": data[0].value,
         "start_date": data[1].value,
         "end_date": data[2].value,
         "leave_of_days": data[3].value
      }
      console.log(json);
      $.ajax({
         type: "POST",
         url: "https://hob31sq4bj.execute-api.ap-south-1.amazonaws.com/dev/leave",
         contentType: 'application/json',
         data: JSON.stringify(json),
         success: function (response) {
            console.log(response);
            document.getElementById('ptag').innerHTML = "Successfully submitted!";
         }, error: function (err) {
            console.log(err);
            document.getElementById('ptag').innerHTML = "Wrong username/password combination"
         }
      });
}

function clearLocalStorage() {
   sessionStorage.setItem('Auth', false);
}