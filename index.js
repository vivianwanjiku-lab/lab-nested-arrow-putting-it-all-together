/**
 * Creates a login tracker that limits the number of login attempts.
 * 
 * @param {Object} userInfo - An object containing username and password.
 * @param {string} userInfo.username - The username for the account.
 * @param {string} userInfo.password - The correct password for the account.
 * @returns {Function} An arrow function that handles login attempts.
 * 
 * This function demonstrates closures by maintaining `attemptCount` in its scope,
 * which is only accessible to the returned inner function (loginAttempt).
 */
const createLoginTracker = (userInfo) => {
    // Initialize attempt counter to track how many login attempts have been made.
    // This variable is part of the closure and cannot be accessed from outside.
    let attemptCount = 0;

    /**
     * Inner arrow function that processes a single login attempt.
     * It has access to `userInfo` and `attemptCount` from the outer function's scope.
     * 
     * @param {string} passwordAttempt - The password entered by the user.
     * @returns {string} A message indicating the result of the login attempt.
     */
    const loginAttempt = (passwordAttempt) => {
        // Increment the attempt count each time this function is called.
        // This is done before any checks to accurately reflect the attempt number.
        attemptCount++;

        // Check if the account is already locked due to exceeding max attempts (3).
        if (attemptCount > 3) {
            return "Account locked due to too many failed login attempts";
        }

        // Verify if the provided password matches the stored password.
        // If a match is found, return a success message.
        if (passwordAttempt === userInfo.password) {
            return "Login successful";
        } else {
            // If the password is incorrect, return a failure message.
            // The message includes the current attempt number for clarity.
            return `Login failed - Attempt ${attemptCount} of 3`;
        }
    };

    // Return the inner function so it can be called from outside.
    // This creates a closure that preserves the state of `attemptCount`.
    return loginAttempt;
};

// --- Test Cases and Demonstrations ---
// These tests validate the functionality defined in the instructions.

// Create a user object with sample credentials.
const testUser = {
    username: "user1",
    password: "password123"
};

// Generate the login function for this specific user.
// `login` now has its own private `attemptCount` for this user.
const login = createLoginTracker(testUser);

console.log("--- Test Scenario: Failed attempts then lockout ---");
console.log(login("wrong"));      // Expected: Login failed - Attempt 1 of 3
console.log(login("wrong"));      // Expected: Login failed - Attempt 2 of 3
console.log(login("wrong"));      // Expected: Login failed - Attempt 3 of 3
console.log(login("wrong"));      // Expected: Account locked due to too many failed login attempts
console.log(login("password123")); // Expected: Account locked (already locked)

console.log("\n--- Test Scenario: Successful login without lockout ---");
// Create a separate user instance to demonstrate a fresh attempt counter.
const anotherUser = {
    username: "customer1",
    password: "securePass"
};
const anotherLogin = createLoginTracker(anotherUser);
console.log(anotherLogin("wrongAttempt")); // Expected: Login failed - Attempt 1 of 3
console.log(anotherLogin("securePass"));   // Expected: Login successful

console.log("\n--- Test Scenario: Edge Cases (Empty Password) ---");
const emptyPasswordUser = {
    username: "test",
    password: ""
};
const emptyPassLogin = createLoginTracker(emptyPasswordUser);
console.log(emptyPassLogin(""));    // Expected: Login successful (empty string matches)
console.log(emptyPassLogin("any")); // Expected: Login failed - Attempt 2 of 3
console.log(emptyPassLogin(""));    // Expected: Account locked (3rd attempt fails)

// --- Export for Testing (if this file is used in a testing environment) ---
module.exports = { createLoginTracker };
