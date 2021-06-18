const toggleForm = () => {
	const container = document.querySelector('.container');
	container.classList.toggle('active');
};

let loginData = {};
loginData.Auth = false;
function loginSubmit() {
	var data = $("#login-form").serializeArray();
	var json = {
		"empId": data[0].value,
		"password": data[1].value
	};
	console.log(json);
	$.ajax({
		type: "POST",
		url: "https://hob31sq4bj.execute-api.ap-south-1.amazonaws.com/dev/auth",
		contentType: 'application/json',
		data: JSON.stringify(json),
		success: function (response) {
			console.log(response);
			loginData.Auth = true;
			loginData.name = response.name;
			loginData.email = response.email;
			loginData.soeId = response.empId;
			loginData.access = response.access_specifier;
			window.location.href = "../Dashboard/index.html";
		}, error: function (err) {
			console.log(err);
			document.getElementById('ptag').innerHTML = "Wrong username/password combination"
		}
	});
}

function signup() {
	var data = $("#signup-form").serializeArray();
	if (data[5].value != data[6].value) {
		document.getElementById('signin-ptag').innerHTML = "Passwords don't match!";
		return;
	}
	var access = 0;
	switch (data[7].value) {
		case "M":
			access = 2;
			break;
		case "E":
			access = 1;
			break;
		case "V":
			break;
		default:
			break;
	}

	var json = {
		"empId": data[0].value,
		"email": data[1].value,
		"BU": data[2].value,
		"department": data[3].value,
		"reportsTo":data[4].value,
		"password": data[5].value,
		"access_specifier": access,
	};
	console.log(json);
	$.ajax({
		type: "POST",
		url: "https://hob31sq4bj.execute-api.ap-south-1.amazonaws.com/dev/employee",
		contentType: 'application/json',
		data: JSON.stringify(json),
		success: function (response) {
			console.log("SUccess");
			loginData = json;
			loginData.Auth = true;
			loginData.soeId = loginData.empId;
			window.location.href = "../Dashboard/index.html";
		}, error: function (err) {
			console.log(err);
		}
	});
}