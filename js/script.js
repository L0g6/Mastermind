// Variables
let secretCode = generateSecretCode(); // Generate random secret code
let attempts = [];
const maxAttempts = 10;

// Function to generate a random secret code
function generateSecretCode() {
    let code = [];
    const colors = ['A', 'B', 'C', 'D', 'E'];
    for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * colors.length);
        code.push(colors[randomIndex]);
    }
    return code.join('');
}

// Function to check the guess
function checkGuess() {
    let guessInput = document.getElementById('guessInput').value.toUpperCase();

    // Check if input is valid
    if (guessInput.length !== 5 || !/^[ABCDE]+$/.test(guessInput)) {
        alert('Please enter a valid guess (5 letters A, B, C, D, E)');
        return;
    }

    // Add guess to attempts array
    attempts.push(guessInput);

    // Display attempts
    displayAttempts();

    // Check if guess is correct
    if (guessInput === secretCode) {
        alert('Congratulations! You guessed the secret code.');
        resetGame();
    } else {
        if (attempts.length === maxAttempts) {
            alert(`Game over! The secret code was ${secretCode}.`);
            resetGame();
        } else {
            alert('Incorrect guess. Keep trying!');
        }
    }
}

// Function to display attempts
function displayAttempts() {
    let attemptsDiv = document.getElementById('attempts');
    attemptsDiv.innerHTML = '';
    for (let i = 0; i < attempts.length; i++) {
        let attemptDiv = document.createElement('div');
        attemptDiv.textContent = attempts[i];
        attemptsDiv.appendChild(attemptDiv);
    }
}

// Function to reset the game
function resetGame() {
    secretCode = generateSecretCode();
    attempts = [];
    displayAttempts();
}
