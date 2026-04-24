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
        // Check if the account is already locked before incrementing attempts
        if (attemptCount >= 3) {
            return "Account locked due to too many failed login attempts";
        }
        
        // Increment the attempt count each time this function is called
        attemptCount++;

        // Verify if the provided password matches the stored password
        if (passwordAttempt === userInfo.password) {
            return "Login successful";
        } else {
            // Return exact format expected by tests
            return `Attempt ${attemptCount}: Login failed`;
        }
    };

    // Return the inner function so it can be called from outside
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
const login = createLoginTracker(testUser);

console.log("--- Test Scenario: Failed attempts then lockout ---");
console.log(login("wrong"));      // Expected: Attempt 1: Login failed
console.log(login("wrong"));      // Expected: Attempt 2: Login failed
console.log(login("wrong"));      // Expected: Attempt 3: Login failed
console.log(login("wrong"));      // Expected: Account locked due to too many failed login attempts
console.log(login("password123")); // Expected: Account locked (already locked)

console.log("\n--- Test Scenario: Successful login without lockout ---");
// Create a separate user instance to demonstrate a fresh attempt counter
const anotherUser = {
    username: "customer1",
    password: "securePass"
};
const anotherLogin = createLoginTracker(anotherUser);
console.log(anotherLogin("wrongAttempt")); // Expected: Attempt 1: Login failed
console.log(anotherLogin("securePass"));   // Expected: Login successful

console.log("\n--- Test Scenario: Correct login after one failure ---");
const thirdUser = {
    username: "testuser",
    password: "correct123"
};
const thirdLogin = createLoginTracker(thirdUser);
console.log(thirdLogin("wrong"));     // Expected: Attempt 1: Login failed
console.log(thirdLogin("correct123")); // Expected: Login successful

console.log("\n--- Test Scenario: Account locks after third failure ---");
const fourthUser = {
    username: "locktest",
    password: "mypass"
};
const fourthLogin = createLoginTracker(fourthUser);
console.log(fourthLogin("wrong1")); // Expected: Attempt 1: Login failed
console.log(fourthLogin("wrong2")); // Expected: Attempt 2: Login failed
console.log(fourthLogin("wrong3")); // Expected: Attempt 3: Login failed
console.log(fourthLogin("mypass")); // Expected: Account locked due to too many failed login attempts

// --- Export for Testing ---
module.exports = { createLoginTracker };
