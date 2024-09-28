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
        title: "Email Is Invalid!",
        icon: "error",
      });
      return false;
    }
    // validation username
    if (usernameInput.value.length < 5) {
      swal({
        title: "Username at Least 6 Characters",
        icon: "error",
      });
      return false;
    }

    // validation password
    if (passwordInput.value.length < 8) {
      swal({
        title: "Password at Least 8 Characters",
        icon: "error",
      });
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

    swal({
      title: "Good Job!",
      text: "Registration Successfully",
      icon: "success",
    }).then((value) => {
      localStorage.setItem("infoUser", JSON.stringify(infoUser));
      window.location = "login.html";
    });
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
      swal({
        title: "Good Job!",
        text: "Login Successfully",
        icon: "success",
      }).then((value) => {
        localStorage.setItem("login_required", true);
        window.location = "profile.html";
      });
    } else {
      swal({
        title: "Password or Username Incorrect",
        icon: "error",
      });
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
    swal({
      title: "Are you sure to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((logOut) => {
      if (logOut) {
        swal({
          title: "Goodbye!",
          text: "You have logged out",
          icon: "success",
        }).then((value) => {
          localStorage.clear();
          window.location = "index.html";
        });
      } else {
        swal({
          title: "Cancelled",
          text: "You have not logged out",
          icon: "error",
        });
      }
    });
  });
}
