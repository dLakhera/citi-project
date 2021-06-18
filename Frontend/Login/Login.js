const toggleForm = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
};

function loginSubmit(event) {
  var data = $("#login-form").serializeArray();
  var json = {
    "empId":data[0].value,
    "password":data[1].value
  };
  console.log(json);
  $.ajax({
    type:"POST",
    url:"https://hob31sq4bj.execute-api.ap-south-1.amazonaws.com/dev/auth",
    contentType: 'application/json',
    data: JSON.stringify(json),
    success: function(response) {
      console.log(response);
      localStorage.setItem('Auth', true);
      localStorage.setItem('name', response.name);
      localStorage.setItem('email', response.email);
      localStorage.setItem('empId', response.soeid);
      localStorage.setItem('access',response.access_specifier);
      window.location.href="../Dashboard/index.html";
    }, error: function(err) {
      console.log(err);
      document.getElementById('ptag').innerHTML = "Wrong username/password combination"
    }
  });
}

function signup() {
  var data = $("#signup-form").serializeArray();
  if(data[2].value != data[3].value){
    document.getElementById('signin-ptag').innerHTML = "Passwords don't match!";
    return;
  }
  var access = 0;
  switch (data[3].value) {
    case "M":
      access=2;
      break;
    case "E":
      access=1;
      break;
    case "V":
      break;
    default:
      break;
  }

  var json = {
    "empId": data[0].value,
    "email":data[1].value,
    "password": data[2].value,
    "access_specifier":access
  };
  console.log(json);
  $.ajax({
    type: "POST",
    url: "https://hob31sq4bj.execute-api.ap-south-1.amazonaws.com/dev/employee",
    contentType: 'application/json',
    data: JSON.stringify(json),
    success: function (response) {
      console.log(response);
      localStorage.setItem('Auth', true);
      localStorage.setItem('name', json.name);
      localStorage.setItem('email', json.email);
      localStorage.setItem('empId', json.soeid);
      localStorage.setItem('access', json.access_specifier);
      window.location.href = "../Dashboard/index.html";
    }, error: function (err) {
      console.log(err);
      document.getElementById('ptag').innerHTML = "Wrong username/password combination"
    }
  });
}