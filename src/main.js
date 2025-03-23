
const supabase = window.supabase.createClient(
    "https://dzlhehodyvemnfyfugov.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bGhlaG9keXZlbW5meWZ1Z292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MTI3MjcsImV4cCI6MjA1Nzk4ODcyN30.lMUnXxA3Xn2vL5ezRHz49uy--A-sQLHKS-gV4yXfbuY"
  );

  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    const { error } = await supabase
      .from("insecure_users")
      .insert([{ email, password }]);

    if (error) {
      console.error("Error:", error);
      alert("Registration failed: " + error.message);
    } else {
      alert("Successfully Registered! Your password is stored in plain text—check the 'View Data' section to see why this is risky.");
      registerForm.reset();
    }
  });

  // Login form handling (basic check against stored data)
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const { data, error } = await supabase
      .from("insecure_users")
      .select("*")
      .eq("email", email)
      .eq("password", password);

    if (error) {
      console.error("Error:", error);
      alert("Login failed: " + error.message);
    } else if (data.length > 0) {
      alert("Login successful! But your credentials were stored unsafely.");
      loginForm.reset();
    } else {
      alert("Invalid email or password.");
    }
  });

  // Toggle between Register and Login forms
  const showLogin = document.getElementById("show-login");
  const showRegister = document.getElementById("show-register");
  const registerContainer = document.querySelector("#login > div:first-child");
  const loginContainer = document.getElementById("login-form-container");

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
  });

  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.classList.add("hidden");
    registerContainer.classList.remove("hidden");
  });
