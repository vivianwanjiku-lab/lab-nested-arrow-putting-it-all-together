function createLoginSystem(correctUsername, correctPassword) {
  let attempts = 3; // closure variable

  const login = (username, password) => {
    if (attempts === 0) {
      console.log("🔒 Account is locked. No more attempts allowed.");
      return;
    }

    if (username === correctUsername && password === correctPassword) {
      console.log("✅ Login successful! Welcome back.");
      attempts = 3; // reset attempts after success
    } else {
      attempts--;
      console.log(`❌ Invalid credentials. Attempts left: ${attempts}`);

      if (attempts === 0) {
        console.log("🔒 Account locked due to too many failed attempts.");
      }
    }
  };

  return login;
}
