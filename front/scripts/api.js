function Api() {
  this.api = axios.create({
    baseURL: `http://localhost:2222/api/`,
    timeout: 1000,
    headers: { access_token: localStorage.getItem("token") }
  });

  this.logout = () => {
    localStorage.clear()
  }

  this.signup = (newUser) => {
    return this.api
      .post("auth/signup", newUser)
      .then(response => {
        if (response.data.error) {
          throw new Error;
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name",  response.data.username);
          localStorage.setItem("email", response.data.email);
          window.location.assign('/');
        }
      })
  }

  this.login = (loginUser) => {
    return this.api
      .post("auth/login", loginUser)
      .then(response => {
        if (response.data.error) {
          throw new Error(response.data.error);
        } else {
          localStorage.setItem("token",  response.data.token);
          localStorage.setItem("name",   response.data.username);
          localStorage.setItem("email",  response.data.email);
          localStorage.setItem("userId", response.data._id);
          window.location.assign('/');
        }
      })
  }

  this.resendsForMe = () => {
    return this.api.get(`resends/byFromUser/${localStorage.getItem("userId")}`)
      .then(resenders => {
        return resenders
      })

  }

  this.requestedByMe = () => {
    return this.api.get(`resends/byDestinationUser/${localStorage.getItem("userId")}`).then(requesteds => {
      return requesteds
    })
  }

  this.chooseResender = () => {
    return this.api.get(`users/byLocation/${fromLocation.value}`, {
      headers: { access_token: localStorage.getItem("token") }
    }).then(chosenResender => {
      return chosenResender
    })
  }

  this.selectResendr = (id) => {
    return this.api.get(`users/${id}`)
    .then(selectedResender => {
      return selectedResender
    })
  }

  this.makeResend = () => {
    return this.api.post(`resends`, { headers: { access_token: localStorage.getItem("token") }})
  }


  // Authorization: if not login, go to registration page
  if (!localStorage.getItem("token") && window.location.pathname === '/') {
    window.location.assign('/registration.html');
  }

  if (localStorage.getItem("token") && window.location.pathname === '/registration.html') {
    window.location.assign('/');
    console.log('authenticated')
  }
}

let api = new Api();
