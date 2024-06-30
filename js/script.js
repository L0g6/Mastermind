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

// Function to check the guess and provide feedback
function checkGuess() {
    let guessInput = document.getElementById('guessInput').value.toUpperCase();

    // Check if input is valid
    if (guessInput.length !== 5 || !/^[ABCDE]+$/.test(guessInput)) {
        alert('Please enter a valid guess (5 letters A, B, C, D, E)');
        return;
    }

    // Add guess to attempts array
    attempts.push({
        guess: guessInput,
        feedback: generateFeedback(guessInput, secretCode)
    });

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
        }
    }

    // Clear input field
    document.getElementById('guessInput').value = '';
}

// Function to generate feedback based on the guess and secret code
function generateFeedback(guess, code) {
    let feedback = '';
    let exactMatches = 0;
    let colorMatches = 0;

    // Check for exact matches (green pins)
    for (let i = 0; i < 5; i++) {
        if (guess[i] === code[i]) {
            exactMatches++;
        }
    }

    // Check for color matches (white pins)
    let codeCounts = {};
    let guessCounts = {};

    for (let i = 0; i < 5; i++) {
        let codeChar = code[i];
        let guessChar = guess[i];

        if (codeChar === guessChar) continue; // Skip exact matches

        codeCounts[codeChar] = (codeCounts[codeChar] || 0) + 1;
        guessCounts[guessChar] = (guessCounts[guessChar] || 0) + 1;
    }

    for (let char in guessCounts) {
        if (codeCounts[char]) {
            colorMatches += Math.min(codeCounts[char], guessCounts[char]);
        }
    }

    // Construct feedback string
    for (let i = 0; i < exactMatches; i++) {
        feedback += 'o'; // Green pin for exact match
    }

    for (let i = 0; i < colorMatches; i++) {
        feedback += 'x'; // White pin for color match
    }

    // Fill remaining with dashes
    while (feedback.length < 5) {
        feedback += '-';
    }

    return feedback;
}

// Function to display attempts
function displayAttempts() {
    let attemptsDiv = document.getElementById('attempts');
    attemptsDiv.innerHTML = '';

    for (let i = 0; i < attempts.length; i++) {
        let attemptDiv = document.createElement('div');
        attemptDiv.textContent = `${attempts[i].guess} - Feedback: ${attempts[i].feedback}`;
        attemptsDiv.appendChild(attemptDiv);
    }
}

// Function to reset the game
function resetGame() {
    secretCode = generateSecretCode();
    attempts = [];
    displayAttempts();
}
