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



document.getElementById("btn-signup").addEventListener("click", event => {
  const newUser = {
    name: document.getElementById("user_name").value,
    email: document.getElementById("user_email").value,
    password: document.getElementById("user_password").value,
    location: {
      address: document.getElementById("new_user_address").value,
      province: document.getElementById("register_province").value,
      postalCode: document.getElementById("new_user_postalCode").value
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

document.getElementById("btn-login").addEventListener("click", event => {
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

document.getElementById("btn-resend").addEventListener("click", event => {
  const newResend = {
    fromUser: localStorage.getItem("whoami"),
    destinationUser: document.getElementById("destination_user").value,
    destinationLocation: {
      address: document.getElementById("destination_user_address").value,
      province: document.getElementById("destination_user_province").value,
      postalCode: document.getElementById("destination_user_postalCode").value
    },
    //price: document.getElementById("price").value,
    date: document.getElementById("date").value,
    packageSize: document.getElementById("package_size").value,
    fragile: document.getElementById("fragile").value === "on"
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

fromLocation = document.getElementById("from_location");
resenders = document.getElementById("resenders_list")

fromLocation.addEventListener("change", event => {
  api
    .get(`users/byLocation/${fromLocation.value}`, {
      headers: { access_token: token }
    })
    .then(users => {
      let html = "";
      users.data.forEach(function(user) {
        html += `<div id="location_users"> ${user.name} </div>`;
      });
      resenders.innerHTML = html;
    });
});


signupProvinces = document.getElementById("register_province");
resendersLocation = document.getElementById("from_location");
destination_province = document.getElementById("destination_user_province");

let html = "";
provinces
  .map(p => p.nm)
  .forEach(function(province) {
    html += `<option value="${province}"> ${province} </option>`;
  });
signupProvinces.innerHTML = html;
resendersLocation.innerHTML = html;
destination_province.innerHTML = html;