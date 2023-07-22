/* elsint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login.js';
import { updateSettings } from './updateSettings.js';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
//DELEGATION

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (userDataForm) {
  document.querySelector('.btn--save').addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });
}

if (userPasswordForm) {
  document
    .querySelector('.btn--password')
    .addEventListener('click', async (e) => {
      e.preventDefault();
      document.querySelector('.btn--password').textContent =
        'Updating Password';
      const passwordCurrent = document.getElementById('password-current').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;

      await updateSettings(
        { passwordCurrent, password, passwordConfirm },
        'password'
      );

      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';
      document.querySelector('.btn--password').textContent = 'Save Password';
    });
}
