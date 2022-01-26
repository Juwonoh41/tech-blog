const loginFormHandler = async (event) => {
  event.preventDefault();

  const eLog = document.querySelector('#eLogin').value.trim();
  const pLog = document.querySelector('#pLogin').value.trim();

  if (eLog && pLog) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
