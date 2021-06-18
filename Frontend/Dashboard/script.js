$(document).ready(()=>{
  
  $('#open-sidebar').click(()=>{
     
      // add class active on #sidebar
      $('#sidebar').addClass('active');
      
      // show sidebar overlay
      $('#sidebar-overlay').removeClass('d-none');
    
   });
  
  
   $('#sidebar-overlay').click(function(){
     
      // add class active on #sidebar
      $('#sidebar').removeClass('active');
      
      // show sidebar overlay
      $(this).addClass('d-none');
    
   });
  
});

function FetchData() {
   
   var name = document.getElementById('empName');
   var department = document.getElementById('department');
   var soeid = document.getElementById('soeid');

   name.innerHTML =       localStorage.getItem('name');
   department.innerHTML = localStorage.getItem('department');
   soeid.innerHTML =      localStorage.getItem('soeid');

   var accessLevel = localStorage.getItem('access');

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
   localStorage.setItem('Auth', false);
}