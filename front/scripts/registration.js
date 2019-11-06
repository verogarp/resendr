
  // TOGGLE SIGNUP-LOGIN VIEWS
  document.getElementById("login_register_now")
    .addEventListener("click", event => {
      document.getElementById("login").classList.toggle("d-none");
      document.getElementById("register").classList.toggle("d-none");
    });

  document
    .getElementById("register_login_now")
    .addEventListener("click", event => {
      document.getElementById("register").classList.toggle("d-none");
      document.getElementById("login").classList.toggle("d-none");
    });

  // USER SIGNUP
  document.getElementById("register-btn-signup").addEventListener("click", event => {
    const newUser = {
      name:     document.getElementById("register_user_name").value,
      email:    document.getElementById("register_user_email").value,
      password: document.getElementById("register_user_password").value,
      location: {
        address:    document.getElementById("register_user_address").value,
        province:   document.getElementById("register_user_province").value,
        postalCode: document.getElementById("register_user_postalCode").value
      }
    };

    api
      .signup(newUser)
      .catch(error => {
        if (error.response.status == 409) {
          document.getElementById("signup-alert").classList.remove("d-none");
        }
      })
  });

  // USER LOGIN
  document.getElementById("login_btn-login").addEventListener("click", event => {
      const loginUser = {
        email:    document.getElementById("login_email").value,
        password: document.getElementById("login_password").value
      };

      api
        .login(loginUser)
        .catch(error => {
          document.getElementById("login-alert").classList.remove("d-none");
        });
  });

  let html = "";
  provinces
    .map(p => p.name)
    .sort((p1, p2) => p1.localeCompare(p2))
    .forEach(province => {
      html += `<option value="${province}"> ${province} </option>`;
    });
  document.getElementById("register_user_province").innerHTML = html;