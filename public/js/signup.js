// function to sign-up
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#exampleInputUsername1").value.trim();
  const email = document.querySelector("#exampleInputEmail1").value.trim();
  const password = document.querySelector("#exampleInputPassword1").value.trim();
  if (username && email && password) {
    // Send a POST request to the API endpoint
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        alert("Account created! Logging you in now.");
        document.location.replace("/");
        console.log(response)
      } else {
        alert(response.statusText);
      }
    }
  
}

document
  .getElementById('signup-form')
  .addEventListener("submit", signupFormHandler);
