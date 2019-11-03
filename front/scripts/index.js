const token = localStorage.getItem("token");

(function authenticated() {
  if (localStorage.getItem("token")) {
    console.log("user authenticated");
  } else {
    console.log("user not authenticated");
  }
})();

const api = axios.create({
  baseURL: `http://localhost:2222/api/`,
  timeout: 1000,
  headers: {
    access_token: localStorage.getItem("token")
  }
});

function logout(){
  document
  .getElementById("logout-btn")
  .addEventListener("click", event => {
    localStorage.clear()
    location.reload()
  })
}

function signup() {
  document
    .getElementById("register-btn-signup")
    .addEventListener("click", event => {
      const newUser = {
        name: document.getElementById("register_user_name").value,
        email: document.getElementById("register_user_email").value,
        password: document.getElementById("register_user_password").value,
        location: {
          address: document.getElementById("register_user_address").value,
          province: document.getElementById("register_user_province").value,
          postalCode: document.getElementById("register_user_postalCode").value
        }
      };
      api
        .post("auth/signup", newUser)
        .then(function(response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.username);
          localStorage.setItem("email", response.data.email);
        })
        .catch(function(error) {
            document.getElementById("signup-alert").classList.remove("d-none");
          console.log(error.response);
        });
    });

  document
    .getElementById("login_register_now")
    .addEventListener("click", event => {
      document.getElementById("login").classList.toggle("d-none");
      document.getElementById("register").classList.toggle("d-none");
    });
}

function login() {
  document
    .getElementById("login_btn-login")
    .addEventListener("click", event => {
      const newUser = {
        email: document.getElementById("login_email").value,
        password: document.getElementById("login_password").value
      };
      api
        .post("auth/login", newUser)
        .then(function(response) {
          if (response.data.error) {
            document.getElementById("login-alert").classList.remove("d-none");
            return;
          }
          document.getElementById("login-alert").classList.add("d-none");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.username);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("userId", response.data._id);
          console.log(response.data);
          document.getElementById("login").classList.toggle("d-none");
          document.getElementById("main_screen").classList.toggle("d-none");
          document.getElementById("logout").classList.remove("d-none");

          refreshResendsForMe(response.data._id);
        })
        .catch(function(error) {});
    });
  document
    .getElementById("register_login_now")
    .addEventListener("click", event => {
      document.getElementById("register").classList.toggle("d-none");
      document.getElementById("login").classList.toggle("d-none");
    });
}

function refreshResendsForMe(id) {
  api.get(`resends/byFromUser/${id}`).then(function(response) {
    console.log("called", response);
    const resendsTable = document.getElementById("main_screen_resends_body");

    let html = "";
    response.data.forEach(function(resend) {
      date = new Date(resend.date)
      html += `<tr> 
        <td> ${resend.destinationUser.name} </td>
        <td> ${resend.destinationUser.location.address} </td>
        <td> ${date.toLocaleDateString("es-ES")} </td>
        <td> <span>${resend.status} 
        <a href="" class="h3 badge badge-success mx-1">✔️
        </a> 
        <a href="" class="h3 badge badge-danger mx-1">❌
        </a>
        </span>
        </td> 
      </tr>`;
    });
    resendsTable.innerHTML = html;
    friconix_update();
  });
}

function refreshRequestedByMe(id) {
  api.get(`resends/byDestinationUser/${id}`).then(function(response) {
    console.log("called", response);
    const resendsTable = document.getElementById("main_screen_resends_body");

    let html = "";
    response.data.forEach(function(resend) {
      date = new Date(resend.date)
      html += `<tr> 
      <td> ${resend.fromUser.name} </td>
      <td> ${resend.fromUser.location.address} </td>
        <td> ${date.toLocaleDateString("es-ES")} </td>
        <td> ${resend.status} </td>
      </tr>`;
    });
    resendsTable.innerHTML = html;
  });
}

function mainScreen() {
  document
    .getElementById("main_screen_btn")
    .addEventListener("click", event => {
      document.getElementById("main_screen").classList.toggle("d-none");
      document.getElementById("resenders").classList.toggle("d-none");
    });
  document.getElementById("resends_for_me").addEventListener("click", event => {
    document.getElementById("resends_for_me").classList.add("active");
    document.getElementById("requested_by_me").classList.remove("active");
    refreshResendsForMe(localStorage.getItem("userId"))
  });
  document
    .getElementById("requested_by_me")
    .addEventListener("click", event => {
      document.getElementById("requested_by_me").classList.add("active");
      document.getElementById("resends_for_me").classList.remove("active");
      refreshRequestedByMe(localStorage.getItem("userId"))
    });
}

function makeAResend() {
  document
    .getElementById("request-btn-resend")
    .addEventListener("click", event => {
      const newResend = {
        fromUser: selectedResender,
        destinationUser: localStorage.getItem("userId"),
        fromLocation: selectedResender.location,
        destinationLocation: {
          address: document.getElementById("request_destination_user_address")
            .value,
          province: document.getElementById("request_destination_user_province")
            .value,
          postalCode: document.getElementById(
            "request_destination_user_postalCode"
          ).value
        },
          date: new Date(),
        packageSize: document.getElementById("request_destination_package_size")
          .value,
        fragile:
          document.getElementById("request_destination_fragile").value === "on",
        status:"pending"
      };
      api
        .post("resends", newResend, { headers: { access_token: token } })
        .then(function(response) {
          console.log(response);
          document.getElementById("resend").classList.toggle("d-none");
          document.getElementById("main_screen").classList.toggle("d-none");
          document.getElementById("request_destination_user_address").value = "";
          document.getElementById("request_destination_user_postalCode").value = "";
          Swal.fire(
            'Yay!',
            'Resend requested!',
            'success'
          )
        })
        .catch(function(error) {
          console.log(error.response);
        });
    });
}

let selectedResender;

function selectResender(id) {
  api
    .get(`users/${id}`)
    .then(res => {
      selectedResender = res.data;
      console.log(selectedResender);
      document.getElementById("resenders").classList.toggle("d-none");
      document.getElementById("resend").classList.toggle("d-none");
    })
    .catch(function(error) {
      console.log(error.response);
    });
}

function filterUsersByProvince() {
  fromLocation = document.getElementById("resender_destination_user_province");
  resenders = document.getElementById("resenders_list");

  fromLocation.addEventListener("change", event => {
    api
      .get(`users/byLocation/${fromLocation.value}`, {
        headers: { access_token: token }
      })
      .then(users => {
        let html = "";
        users.data.forEach(function(user) {
          html += `<div class="row mt-4" id="location_users"> 
          <div class="col-sm-8">
          <p class="h5">
          ${user.name}
          </p>
          </div>
          <div class="col-sm-4">
          <button class="form-control btn-primary btn-block" id="btn-resenders_users" onclick="selectResender('${user._id}')"> Request </button>
          </div>        
          </div>`;
        });
        resenders.innerHTML = html;
      })
      .catch(function(error) {
        console.log(error.response);
      });
  });
  document.getElementById("go-main-screen").addEventListener("click", event => {
    document.getElementById("resenders").classList.toggle("d-none");
    document.getElementById("main_screen").classList.toggle("d-none");
  });
}

function listOfProvinces() {
  signupProvinces = document.getElementById("register_user_province");
  resendersLocation = document.getElementById(
    "resender_destination_user_province"
  );
  destination_province = document.getElementById(
    "request_destination_user_province"
  );

  let html = "";
  provinces
    .map(p => p.nm)
    .forEach(function(province) {
      html += `<option value="${province}"> ${province} </option>`;
    });
  signupProvinces.innerHTML = html;
  resendersLocation.innerHTML = html;
  destination_province.innerHTML = html;
}

signup();
login();
makeAResend();
filterUsersByProvince();
listOfProvinces();
mainScreen();
logout();