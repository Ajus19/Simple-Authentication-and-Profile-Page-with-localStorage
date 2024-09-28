// Register start
var registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // validation email
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)
    ) {
      swal({
        title: "Error!",
        text: "Email Is Invalid!",
        icon: "danger",
      });
      return false;
    }
    // validation username
    if (usernameInput.value.length < 5) {
      alert("Username minimal 6 karakter!");
      return false;
    }

    // validation password
    if (passwordInput.value.length < 8) {
      alert("Password minimal 8 karakter!");
      return false;
    }

    const infoUser = {
      email: emailInput.value,
      username: usernameInput.value,
      phone: phoneInput.value,
      job: jobSelect.value,
      address: addressInput.value,
      password: passwordInput.value,
    };

    localStorage.setItem("infoUser", JSON.stringify(infoUser));
    swal("Good job!", "You clicked the button!", "success");
    window.location = "login.html";
  });
}
// Register end

// login start
var loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (
      (localStorage.getItem("infoUser") &&
        JSON.parse(localStorage.getItem("infoUser")).username ===
          userToLogin.value) ||
      (JSON.parse(localStorage.getItem("infoUser")).email ===
        userToLogin.value &&
        JSON.parse(localStorage.getItem("infoUser")).password ===
          passwordToLogin.value)
    ) {
      alert("Login Successfully!");
      window.location = "profile.html";
      localStorage.setItem("login_required", true);
    } else {
      alert("password or username wrong");
    }
  });
}
// login end

if (localStorage.getItem("login_required")) {
  const usernameRoots = document.getElementsByClassName("usernameRoot");
  for (const usernameElement of usernameRoots) {
    usernameElement.innerHTML = JSON.parse(
      localStorage.getItem("infoUser")
    ).username;
  }

  const emailRoot = document.getElementsByClassName("emailRoot");
  for (const emailElement of emailRoot) {
    emailElement.innerHTML = JSON.parse(localStorage.getItem("infoUser")).email;
  }

  const jobRoot = document.getElementsByClassName("jobRoot");
  for (const jobRootElement of jobRoot) {
    jobRootElement.innerHTML = JSON.parse(localStorage.getItem("infoUser")).job;
  }

  const phoneRoot = document.getElementsByClassName("phoneRoot");
  for (const phoneRootElement of phoneRoot) {
    phoneRootElement.innerHTML = JSON.parse(
      localStorage.getItem("infoUser")
    ).phone;
  }

  const addressRoot = document.getElementsByClassName("addressRoot");
  for (const addressElement of addressRoot) {
    addressElement.innerHTML = JSON.parse(
      localStorage.getItem("infoUser")
    ).address;
  }
}

var logOutBtn = document.getElementById("logOutBtn");
if (logOutBtn) {
  logOutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    alert("Log Out Successfully");
    window.location = "index.html";
  });
}
