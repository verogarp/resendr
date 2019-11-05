function logout() {
  document.getElementById("logout-btn").addEventListener("click", event => {
    api.logout();
    window.location.reload();
  });
}

let allResends;

function refreshResendsForMe(id) {
  api.resendsForMe().then(response => {
    allResends = response.data;
    const resendsTable = document.getElementById("main_screen_resends_body");

    let html = "";
    response.data.forEach(function(resend) {
      date = new Date(resend.date);
      const dNone = resend.status.statusType == "pending" ? "" : "d-none";
      html += `<tr>
        <td> ${resend.destinationUser.name} </td>
        <td> ${resend.destinationUser.location.address} </td>
        <td> ${date.toLocaleDateString("es-ES")} </td>
        <td> <span>${resend.status.statusType}
        <a href="javascript:void(0)" class="h3 badge badge-success mx-1 ${dNone}" onclick="confirmResend('${
        resend._id
      }')">✔️
        </a>
        <a href="javascript:void(0)" class="h3 badge badge-danger mx-1 ${dNone}" onclick="rejectResend('${
        resend._id
      }')">❌
        </a>
        </span>
        </td>
        <td>
        <a href="javascript:void(0)" class="h3 badge badge-info mx-1" onclick="resendsForMeInfo('${
          resend._id
        }')">ℹ️</a>
        </td>
      </tr>`;
    });
    resendsTable.innerHTML = html;
  });
}

let allRequested;

function refreshRequestedByMe(id) {
  api.requestedByMe().then(function(response) {
    allRequested = response.data;
    const resendsTable = document.getElementById("main_screen_resends_body");

    let html = "";
    response.data.forEach(function(resend) {
      date = new Date(resend.date);
      html += `<tr>
      <td> ${resend.fromUser.name} </td>
      <td> ${resend.fromUser.location.address} </td>
      <td> ${date.toLocaleDateString("es-ES")} </td>
      <td> ${resend.status.statusType} </td>
      <td>
      <a href="javascript:void(0)" class="h3 badge badge-info mx-1" onclick="requestedByMeInfo('${
        resend._id
      }')">ℹ️</a>
      </td>

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
    refreshResendsForMe(localStorage.getItem("userId"));
  });

  document
    .getElementById("requested_by_me")
    .addEventListener("click", event => {
      document.getElementById("requested_by_me").classList.add("active");
      document.getElementById("resends_for_me").classList.remove("active");
      refreshRequestedByMe(localStorage.getItem("userId"));
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
          document.getElementById("request_destination_fragile").value === "on" ? "true" : "false",
        status: { statusType: "pending" }
      };
      api
        .makeResend(newResend)
        .then(function(response) {
          console.log(response);
          document.getElementById("resend").classList.toggle("d-none");
          document.getElementById("main_screen").classList.toggle("d-none");
          document.getElementById("request_destination_user_address").value =
            "";
          document.getElementById("request_destination_user_postalCode").value =
            "";
          Swal.fire("Yay!", "Resend requested!", "success");
        })
        .catch(function(error) {
          console.log(error.response);
        });
    });
}

function resendsForMeInfo(id) {  
  const resendData = allResends.find(resend => resend._id === id);
    Swal.fire({
    title: 'Package info',
    html : `
    <h4> Province:  ${resendData.destinationLocation.province} </h4>
    <h4> Address: ${resendData.destinationLocation.address} </h4>
    <h4> Size: ${resendData.packageSize}</h4>
    <h4> Fragile?: ${resendData.fragile}</h4>
    `,
    showCancelButton: true
  })
}

function requestedByMeInfo(id) {  
  const resendData = allRequested.find(resend => resend._id === id);
    Swal.fire({
    title: 'Package info',
    html : `
    <h4> Province:  ${resendData.fromLocation.province} </h4>
    <h4> Address: ${resendData.fromLocation.address} </h4>
    <h4> Size: ${resendData.packageSize}</h4>
    <h4> Fragile?: ${resendData.fragile}</h4>
    `,
    showCancelButton: true
  })
}



async function confirmResend(id) {
  const { value: price } = await Swal.fire({
    title: "How much do you want to charge",
    html: `
    <div class="input-group">
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
    <div class="input-group-append">
      <span class="input-group-text">$</span>
      <span class="input-group-text">.00</span>
    </div>
  </div>`,
    inputPlaceholder: "e.g. 10",
    showCancelButton: true
  });

  if (price) {
    await api.confirmResend(id, price);
    refreshResendsForMe();
  }
}


// async function confirmResend(id) {
//   const { value: price } = await Swal.fire({
//     title: "How much do you want to charge",
//     input: "text",
//     inputPlaceholder: "e.g. 10",
//     showCancelButton: true
//   });

//   if (price) {
//     await api.confirmResend(id, price);
//     refreshResendsForMe();
//   }
// }

async function rejectResend(id) {
  const { value: reason } = await Swal.fire({
    title: "Why don't you accept it?",
    input: "text",
    inputPlaceholder: "e.g. I don't work with large packages",
    showCancelButton: true
  });

  if (reason) {
    await api.rejectResend(id, reason);
    refreshResendsForMe();
  }
}

let selectedResender;

function selectResender(id) {
  api
    .selectResendr(id)
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
      .chooseResender()
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
  document
    .getElementById("back_to_select_resender")
    .addEventListener("click", event => {
      document.getElementById("resend").classList.toggle("d-none");
      document.getElementById("resenders").classList.toggle("d-none");
    });
}

function listOfProvinces() {
  resendersLocation = document.getElementById(
    "resender_destination_user_province"
  );
  destination_province = document.getElementById(
    "request_destination_user_province"
  );

  let html = "";
  provinces
    .map(p => p.name)
    .sort((p1, p2) => p1.localeCompare(p2))
    .forEach(province => {
      html += `<option value="${province}"> ${province} </option>`;
    });
  resendersLocation.innerHTML = html;
  destination_province.innerHTML = html;
}

makeAResend();
filterUsersByProvince();
listOfProvinces();
mainScreen();
logout();
refreshResendsForMe();
