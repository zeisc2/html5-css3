// SHOW INFO PRODUCT    

document.addEventListener("DOMContentLoaded", function() {
    const eyeIcons = document.querySelectorAll('.show-info');

    eyeIcons.forEach(icon => {
        const overlay = icon.closest('.overlay');
        const infoBox = overlay.querySelector('.product-info');

        icon.addEventListener('click', function() {
            if (infoBox.style.display === 'block') {
                infoBox.style.display = 'none';
            } else {
                infoBox.style.display = 'block';
            }
        });

        overlay.addEventListener('mouseleave', function() {
            infoBox.style.display = 'none';
        });
    });
});

window.addEventListener('beforeunload', function() {
    const infoBoxes = document.querySelectorAll('.product-info');
    infoBoxes.forEach(infoBox => {
        infoBox.style.display = 'none';
    });
});

// CHECK CAPS LOCK IS ON
const inputField = document.getElementById('email');
const capsLockWarning = document.querySelector('.capslock');

inputField.addEventListener('keydown', (event) => {
    if (event.getModifierState('CapsLock')) {
        capsLockWarning.hidden = false;
    } else {
        capsLockWarning.hidden = true;
    }
});

inputField.addEventListener('keyup', (event) => {
    if (!event.getModifierState('CapsLock')) {
        capsLockWarning.hidden = true;
    }
});