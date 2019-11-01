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

//Sign up
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
          console.log(error.response);
        });
    });
}

//Login
function login() {
  document
    .getElementById("login_btn-login")
    .addEventListener("click", event => {
      console.log("loggggiinnnnn");

      const newUser = {
        email: document.getElementById("login_email").value,
        password: document.getElementById("login_password").value
      };
      api
        .post("auth/login", newUser)
        .then(function(response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.username);
          localStorage.setItem("email", response.data.email);
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    });
}
//Make a resend

function makeAResend() {
  document
    .getElementById("request-btn-resend")
    .addEventListener("click", event => {
      const newResend = {
        fromUser: localStorage.getItem("whoami"),
        destinationUser: document.getElementById("destination_user").value,
        destinationLocation: {
          address: document.getElementById("request_destination_user_address")
            .value,
          province: document.getElementById("request_destination_user_province")
            .value,
          postalCode: document.getElementById(
            "request_destination_user_postalCode"
          ).value
        },
        date: document.getElementById("request_destination_user_date").value,
        packageSize: document.getElementById("request_destination_package_size")
          .value,
        fragile:
          document.getElementById("request_destination_fragile").value === "on"
      };
      api
        .post("resends", newResend, { headers: { access_token: token } })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    });
}

//Filter users by province
let selectedResender

function selectResender(id){
  api
    .get(`users/${id}`)
    .then(res => {
      selectedResender = res.data
      console.log(selectedResender);
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
          html += `<div id="location_users"> ${user.name}
          <button id="btn-resenders_users" onclick="selectResender('${user._id}')"> ${"Solicit resend"}</button>        
          </div>`;
        });
        resenders.innerHTML = html;
      });
  });
}
//List of provinces
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
