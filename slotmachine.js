function runSlotMachine() {
    const targetText = 'Portfolio';
    const targetElement = document.querySelector('.portfolio');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const delay = 20; // in milliseconds (lower value = faster spinning)
    const spinDuration = 1000; // in milliseconds (total time for each letter to spin)
    let currentIndex = 0;

    function getRandomCharacter() {
    return characters.charAt(Math.floor(Math.random() * characters.length));
    }

    function slotMachineEffect() {
        if (currentIndex < targetText.length) {
            let endTime = Date.now() + spinDuration;

            const spinLetter = (index) => {
            if (Date.now() < endTime) {
                let randomText = '';

                for (let i = 0; i < targetText.length; i++) {
                if (i < index) {
                    randomText += targetText.charAt(i);
                } else if (i === index) {
                    randomText += getRandomCharacter();
                } else {
                    randomText += '-';
                }
                }

                targetElement.textContent = randomText;
                setTimeout(() => spinLetter(index), delay);
            } else {
                let newText = targetElement.textContent.slice(0, index) + targetText.charAt(index) + targetElement.textContent.slice(index + 1);
                targetElement.textContent = newText;
                currentIndex++;
                setTimeout(slotMachineEffect, delay);
            }
            };

            spinLetter(currentIndex);
        }
        return;
    }
    slotMachineEffect();
}
  
export { runSlotMachine };



