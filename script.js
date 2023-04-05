document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn");
    let delay = 100;
  
    buttons.forEach((button) => {
      setTimeout(() => {
        button.classList.add("fade-in");
      }, delay);
  
      delay += 100;
    });
  });

const targetText = 'Portfolio';
const targetElement = document.querySelector('.portfolio');
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const delay = 150; // in milliseconds
let currentIndex = 0;

function getRandomCharacter() {
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

function slotMachineEffect() {
  if (currentIndex < targetText.length) {
    let randomText = '';

    for (let i = 0; i < targetText.length; i++) {
      if (i <= currentIndex) {
        randomText += targetText.charAt(i);
      } else {
        randomText += getRandomCharacter();
      }
    }

    targetElement.textContent = randomText;
    currentIndex++;

    setTimeout(slotMachineEffect, delay);
  }
}

slotMachineEffect(); 