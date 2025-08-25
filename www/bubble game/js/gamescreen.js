// Array of 20 gradient colors
const gradients = [
    //#FBAB7E;FBDA61,85FFBD

    'linear-gradient(to right, #b3ff99, #ffd9ff, #ffccff)'
];

// Set a random gradient as background
const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
document.body.style.background = randomGradient;
document.body.style.backgroundSize = 'cover'; // Ensure the gradient scales nicely

const popSound = document.getElementById('popSound');
const bubbleContainer = document.getElementById('bubbleContainer');
const minBubbles = 10;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let clickedLetter = localStorage.getItem('clickedLetter') || 'A'; // Default to 'O'
const bubbles = [];

// Display the clicked letter in neon text
const neonText = document.getElementById('neonText');
neonText.textContent = clickedLetter;

function getLetterRange(clickedLetter) {
    const startIndex = alphabet.indexOf(clickedLetter);
    const rangeSize = 3;
    const result = [];
    for (let i = 0; i < rangeSize; i++) {
        const currentIndex = (startIndex + i) % alphabet.length;
        result.push(alphabet[currentIndex]);
    }
    return result;
}

function isBubbleOverlapping(newX, newY, size) {
    for (let bubble of bubbles) {
        const distance = Math.sqrt((newX - bubble.x) ** 2 + (newY - bubble.y) ** 2);
        if (distance < size) return true;
    }
    return false;

}

// Define the height of the wave and card areas
const waveAreaHeight = document.querySelector('.waves').offsetHeight;
const cardAreaHeight = document.getElementById('card').offsetHeight;

// Log to track bubble creation
function createBubble() {
    console.log("Creating a new bubble...");
    if (bubbles.length >= minBubbles) {
        console.log("Minimum bubbles already created.");
        return;
    }

    const size = Math.min(10 * window.innerWidth / 100, 80);
    const range = getLetterRange(clickedLetter);
    const letter = range[Math.floor(Math.random() * range.length)];
    let x, y, overlapping, attempts = 0;

    do {
        overlapping = false;
        x = Math.random() * (bubbleContainer.offsetWidth - size);
        y = Math.random() * (bubbleContainer.offsetHeight - size);
        if (y < waveAreaHeight + 10 || y > bubbleContainer.offsetHeight - cardAreaHeight - 10) {
            y = Math.random() * (bubbleContainer.offsetHeight - size); // Reset if in restricted areas
        }
        attempts++;
        if (attempts > 100) break;
    } while (isBubbleOverlapping(x, y, size));

    const bubble = document.createElement('div');
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.className = 'bubble';
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    bubble.textContent = letter;

    

    bubble.addEventListener("click", () => {
        if (bubble.textContent === clickedLetter) {

            showFirework(bubble.offsetLeft, bubble.offsetTop);
            bubble.remove();
            popSound.play();
            var value = parseInt(document.getElementById('countDisplay').innerText);
            value++;
            document.getElementById('countDisplay').innerText = value;
            if(value===4){
                document.getElementById('countDisplay').innerText = 0;
                
            }

            // After blast animation finishes, remove the bubble and create a new one
            setTimeout(() => {
                setTimeout(() => createBubble(), 1000); // Wait for 1 second before creating a new bubble
            }, 500); // Wait for the blast animation (0.5s) to finish before removing the bubble
        }
        else {
            var count = document.querySelectorAll('.fa-heart').length;


            if (document.querySelector('.fa-heart')) {
                var heart = document.querySelector('.fa-heart');
                heart.remove();// Remove a heart icon
                console.log(heart);

                bubble.classList.add('blast');
                showSadEmoji(bubble.offsetLeft, bubble.offsetTop); // Show sad emoji gif
                bubble.remove();
                if (count == 1) {
                    resetBubbleContainer();
                    location.reload();
                }
            }
        }
        var randomelements = document.getElementsByClassName('bubble');
        console.log(randomelements);

        var bub = [];

        for (let i = 0; i < randomelements.length; i++) {
            if (randomelements[i].innerText === clickedLetter) {
                bub.push(randomelements[i].innerText);
            }


        };
        console.log(bub);
        if (bub.length == 0) {
            resetBubbleContainer();
        }


    });

    bubbles.push({ element: bubble, x, y });
    bubbleContainer.appendChild(bubble);
}

// Check bubble container size
// console.log("Bubble Container Width: ", bubbleContainer.offsetWidth);
// console.log("Bubble Container Height: ", bubbleContainer.offsetHeight);

// Array of sad emoji GIF URLs
const sadEmojiGifs = [
    'Images/first.gif',
    'Images/first2.gif',
    'Images/first3.gif',
    'Images/first4.gif',
    'Images/first5.gif',
    'Images/first6.gif',
    'Images/first7.gif',
    'Images/first8.gif',
    'Images/first9.gif',
    'Images/first10.gif'

];

// Function to display a random sad emoji gif at the bubble's position
function showSadEmoji(x, y, duration = 1000) {

    document.getElementById("wrong2").play();
    const randomGif = sadEmojiGifs[Math.floor(Math.random() * sadEmojiGifs.length)];

    // Create an img element to hold the sad emoji gif
    const sadEmoji = document.createElement('img');
    sadEmoji.src = randomGif; // Set the source to the randomly selected GIF
    sadEmoji.style.position = 'absolute';
    sadEmoji.style.left = `${x}px`;
    sadEmoji.style.top = `${y}px`;
    sadEmoji.style.width = '10vw'; // Adjust the size of the gif (can be changed)
    sadEmoji.style.height = '10vw'; // Adjust the size of the gif (can be changed)
    sadEmoji.style.zIndex = 10; // Ensure it stays on top of other elements
    document.getElementById("bubbleContainer").appendChild(sadEmoji);
    //document.body.appendChild(sadEmoji);

    // Remove the gif after the specified duration
    setTimeout(() => {
        sadEmoji.remove();
    }, duration);
}

function showFirework(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    document.getElementById("bubbleContainer").appendChild(firework);
    //document.bobble.appendChild(firework);

    setTimeout(() => firework.remove(), 1000);
}

// Function to reset the bubble container
function resetBubbleContainer() {
    console.log("Resetting bubble container...");
    // Remove all bubbles
    while (bubbles.length > 0) {
        const bubble = bubbles.pop();
        bubble.element.remove();
    }

    // Create new bubbles after clearing the container
    for (let i = 0; i < minBubbles; i++) {
        createBubble();
    }
}

// Initialize the game
function initGame() {
    const card = document.getElementById('card');
    card.addEventListener('animationend', () => {
        console.log("Animation ended, creating initial bubbles...");
        for (let i = 0; i < minBubbles; i++) {
            createBubble();
        }

        setInterval(() => {
            if (bubbles.length < minBubbles) {
                createBubble();
            }
        }, Math.random() * 1000 + 1000); // Random interval between 1s and 3s
    });
}

initGame();


// Navigate to the playButton view in newone.html
document.getElementById('homeButton').addEventListener('click', () => {
    document.getElementById("click").play();
    setTimeout(call, 200);
    function call() {
        window.location.href = 'bubbleindex.html?view=play'; // Navigate to playButton
    }

});

// Navigate to the buttonsContainer view in newone.html
document.getElementById('nextButton').addEventListener('click', () => {
    document.getElementById("click").play();
    setTimeout(call, 300);
    function call() {
        window.location.href = 'index.html?view=buttons'; // Navigate to buttonsContainer
    }
});
