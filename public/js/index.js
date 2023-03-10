/* eslint-enabled */
// import "core-js/stable";
import "regenerator-runtime/runtime";
import { login, logout } from "./login";
import { displayMap } from "./mapBox";
import { updateSettings } from "./updateSettings";
import { bookTour} from './stripe';
import {showAlert} from './alert';

//DOM ELEMENT
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form");
const logOutBtn = document.querySelector(".nav__el--logout");
const newData = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const bookBtn = document.getElementById("book-tour");
//DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });
}
if (logOutBtn) logOutBtn.addEventListener("click", logout);
///
// if (newData) {
//   newData.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//    updateSettings({name, email}, 'data');
//   });
// }
if (newData)
  newData.addEventListener("submit", (e) => {
    e.preventDefault();
     const form = new FormData();
    form.append('name', document.getElementById("name").value);
  form.append('email',document.getElementById("email").value);
    
    form.append("photo", document.getElementById("photo").files[0]);
    updateSettings(form, "data");
    console.log(form)
  });
if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );
    ///making the field cleared after data input
    document.querySelector(".btn--save-password").textContent = "Save Password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";

    document.getElementById("password-confirm").value = "";
  });
}
//adding a booking funtion
if(bookBtn)
 bookBtn.addEventListener('click',e => {
  e.target.textContent = 'Processing...';
  const {tourId} = e.target.dataset;
  bookTour(tourId);
 })

 const alertMessage = document.querySelector('body').dataset.alert;
 if(alertMessage) showAlert('success',alertMessage,20) 