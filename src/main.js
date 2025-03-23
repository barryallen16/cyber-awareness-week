
      // Mobile Menu Toggle
      const menuBtn = document.getElementById("menu-button");
      const closeBtn = document.getElementById("close-button");
      const mobileMenu = document.getElementById("mobile-menu");
      const menuItems = document.querySelectorAll("#mobile-menu a");

      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("flex");
      });

      closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
      });

      menuItems.forEach((element) => {
        element.addEventListener("click", () => {
          mobileMenu.classList.remove("flex");
          mobileMenu.classList.add("hidden");
        });
      });

      // Supabase Initialization
      const supabase = window.supabase.createClient(
        "https://dzlhehodyvemnfyfugov.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bGhlaG9keXZlbW5meWZ1Z292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MTI3MjcsImV4cCI6MjA1Nzk4ODcyN30.lMUnXxA3Xn2vL5ezRHz49uy--A-sQLHKS-gV4yXfbuY"
      );

      // Register Form Handling
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

      // Login Form Handling
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

      // Toggle Register/Login Forms
      const showLogin = document.getElementById("show-login");
      const showRegister = document.getElementById("show-register");
      const registerContainer = document.querySelector("#login > div:first-child");
      const loginContainer = document.getElementById("login-container");

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

      // Show/Hide Password Functionality
      const toggleRegisterPassword = document.getElementById("toggle-register-password");
      const registerPasswordInput = document.getElementById("register-password");
      toggleRegisterPassword.addEventListener("click", () => {
        const type = registerPasswordInput.getAttribute("type") === "password" ? "text" : "password";
        registerPasswordInput.setAttribute("type", type);
        toggleRegisterPassword.innerHTML = type === "password" ?
          `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>` :
          `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>`;
      });

      const toggleLoginPassword = document.getElementById("toggle-login-password");
      const loginPasswordInput = document.getElementById("login-password");
      toggleLoginPassword.addEventListener("click", () => {
        const type = loginPasswordInput.getAttribute("type") === "password" ? "text" : "password";
        loginPasswordInput.setAttribute("type", type);
        toggleLoginPassword.innerHTML = type === "password" ?
          `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>` :
          `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>`;
      });
   