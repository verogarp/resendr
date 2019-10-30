window.addEventListener("load", event => {});

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

//GetAllUsers
const destinationUser = document.getElementById("destination_user");
api
  .get("/users")
  .then(function(response) {
    var html = "";
    response.data.forEach(function(user) {
      html += `<option value="${user._id}"> ${user.name} </option>`;
    });
    destinationUser.innerHTML = html;
  })
  .catch(function(error) {
    console.log(error);
  });

document.getElementById("btn-signup").addEventListener("click", event => {
  const newUser = {
    name: document.getElementById("user_name").value,
    email: document.getElementById("user_email").value,
    password: document.getElementById("user_password").value,
    location: document.getElementById("user_location").value,
  };

  api
    .post("auth/signup", newUser)
    .then(function(response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
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
    fromLocation: document.getElementById("from_location").value,
    destinationLocation: document.getElementById("destination_location").value,
    price: document.getElementById("price").value,
    date: document.getElementById("date").value,
    packageSize: document.getElementById("package_size").value,
    fragile: document.getElementById("fragile").value === "on"
  };

  const token = localStorage.getItem("token");

  api
    .post("resends", newResend, { headers: { access_token: token } })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error.response);
    });
});

api
  .get("auth/whoami", {
    headers: { access_token: localStorage.getItem("token") }
  })
  .then(function(response) {
    localStorage.setItem("whoami", response.data._id);
  })
  .catch(function(error) {
    console.log(error.response);
  });


