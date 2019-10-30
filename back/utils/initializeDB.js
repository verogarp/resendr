const axios = require("axios");
const faker = require("faker");

const api = axios.create({
  baseURL: `http://localhost:2222/api/`,
  timeout: 1000
});

function getRandomProvince() {
  const provinces = [
    "Las Palmas",
    "Tenerife",
    "Madrid",
    "Andalucía",
    "Asturias"
  ];
  const randomProvince =
    provinces[Math.floor(Math.random() * provinces.length)];
  return randomProvince;
}
const numberOfUsers = 50;

function initializeUsers() {
  for (let i = 0; i <= numberOfUsers; i++) {
    api.post("auth/signup", {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: "1234",
      location: {
        address: faker.address.streetAddress(),
        province: getRandomProvince(),
        postalCode: faker.address.zipCode()
      }
    });
  }
}

initializeUsers();
