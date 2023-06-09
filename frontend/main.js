// Get references to the form and its elements
const form = document.getElementById('register');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Add an event listener to the form's submit event
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Create an object with the form data
  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  };

  var url=`http://localhost:3600/REST/user/register`
  // Make a POST request using fetch
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      // Request was successful
      console.log('Data sent successfully');
      // You can perform any additional actions here
    } else {
      // Request failed
      console.log('Error sending data');
    }
  })
  .catch(error => {
    // An error occurred during the request
    console.error('Request error:', error);
  });
});
