/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
const playButton = document.getElementById('playButton');
const buttonsContainer = document.getElementById('buttonsContainer');
const homeButton = document.getElementById('homeButton');
const backbutton = document.getElementById('bcbtn');

// Array of letters A to Z
const letters = Array.from(Array(26)).map((_, i) => String.fromCharCode(65 + i));

// Preloading sound effects
const clickSound = document.getElementById('level');
clickSound.preload = 'auto'; // Preload the sound

// Function to generate buttons with gradients and animations
function createButtons() {
  letters.forEach((letter, index) => {
    const button = document.createElement('button');
    button.classList.add('letter-button');
    button.innerText = letter;

    // Assigning a random gradient to each button
    const gradientAngle = Math.floor(Math.random() * 360); // Random angle for gradient
    const gradientStart = `hsl(${Math.random() * 360}, 80%, 60%)`; // Random color
    const gradientEnd = `hsl(${Math.random() * 360}, 80%, 60%)`; // Random color

    button.style.background = `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`;
    button.style.animation = `gradientMove 5s ease infinite`;

    // Add click event listener with sound effect and interaction
    button.addEventListener('click', () => {
      // Play the sound on click
      clickSound.play();

      // Resetting the animation to allow it to run again
      button.style.animation = 'none';
      button.offsetHeight; // Force reflow
      button.style.animation = 'growAndShake 1s ease';

      // Change the gradient color to a random one on click
      const newGradientStart = `hsl(${Math.random() * 360}, 80%, 60%)`;
      const newGradientEnd = `hsl(${Math.random() * 360}, 80%, 60%)`;
      button.style.background = `linear-gradient(45deg, ${newGradientStart}, ${newGradientEnd})`;

      // Create cracker effect around the clicked letter
      for (let i = 0; i < 10; i++) {
        const cracker = document.createElement('div');
        cracker.classList.add('cracker');
        cracker.style.left = `${button.offsetLeft + Math.random() * button.offsetWidth}px`;
        cracker.style.top = `${button.offsetTop + Math.random() * button.offsetHeight}px`;
        buttonsContainer.appendChild(cracker);

        // Remove cracker after animation
        setTimeout(() => {
          cracker.remove();
        }, 1200);
      }

      // Store clicked letter in localStorage and navigate to the next page
      localStorage.setItem('clickedLetter', letter); // Save clicked letter
      setTimeout(() => {
        window.location.href = 'gamescreen.html'; // Replace with your new page URL
      }, 1000); // Adjust delay based on animation duration
    });

    buttonsContainer.appendChild(button);
  });
}

// Check URL parameters to decide what to display
const urlParams = new URLSearchParams(window.location.search);
const view = urlParams.get('view');

if (view === 'play') {
  playButton.style.display = 'block';
  buttonsContainer.style.display = 'none';
  homeButton.style.display = 'none';
  

} else if (view === 'buttons') {
  playButton.style.display = 'none';
  buttonsContainer.style.display = 'grid';
  homeButton.style.display = 'block';
  backbutton.style.display = 'none';
  createButtons();
}

playButton.addEventListener('click', () => {

  document.getElementById("menu").play();
  playButton.style.display = 'none';
  buttonsContainer.style.display = 'grid';
  homeButton.style.display = 'block';
  createButtons();
});
document.getElementById('homeButton').addEventListener('click', () => {
  document.getElementById("men").play();
  // setTimeout(call, 200);
  //     function call(){
  playButton.style.display = 'block';
  buttonsContainer.style.display = 'none';
  homeButton.style.display = 'none';

  //}

});

// Request fullscreen mode first for better compatibility
document.documentElement.requestFullscreen().then(() => {
    // Lock the screen orientation to landscape
    screen.orientation.lock('landscape').catch((error) => {
        console.error('Failed to lock orientation:', error);
    });
});

// Optional: Add an event listener to react to orientation changes
screen.orientation.onchange = () => {
    console.log('Orientation changed to:', screen.orientation.type);
};
const fullscreen_btn = document.querySelector("#fullscreen_button");
fullscreen_btn.addEventListener("click", () => {
  const container = document.querySelector("#game_container"); // Replace with your game container element ID
  container.requestFullscreen().catch((error) => {
    console.error(`Failed to enter fullscreen: ${error}`); 
  });
});
screen.orientation.lock("landscape").then(() => {
  console.log('Orientation locked to landscape');
}).catch((error) => {
  console.error('Failed to lock orientation:', error);
});

