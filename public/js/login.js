// function to login
async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector("#exampleInputEmail1").value.trim();
    const password = document.querySelector("#exampleInputPassword1").value.trim();
  
    if (email && password) {
        // Send a POST request to the API endpoint
      const response = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
         // If successful, redirect the browser to the profile page
        document.location.replace("/");
      } else {
        let result = await response.json();
        alert(result.message);
      }
    }
  }
  
  document
    .querySelector(".form-group")
    .addEventListener("submit", loginFormHandler);