// Hamburger Menu Toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('menu-active');
}

// Close Menu Function
function closeMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('menu-active');
}

// Close the menu when clicking outside of it
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('menu-active')) {
        navMenu.classList.remove('menu-active');
    }
});

// About Me Toggle
function togglePersonalInfo() {
    const professionalInfo = document.getElementById('professionalInfo');
    const personalInfo = document.getElementById('personalInfo');
    const toggle = document.getElementById('togglePersonal');

    if (toggle.checked) {
        professionalInfo.style.display = 'none';
        personalInfo.style.display = 'block';
    } else {
        professionalInfo.style.display = 'block';
        personalInfo.style.display = 'none';
    }
}

// Image Switcher for Personal Photos
let imageIndex = 1;
function changeImage(element) {
    imageIndex++;
    const totalImages = 3; // Update this to the total number of personal images you have
    if (imageIndex > totalImages) {
        imageIndex = 1;
    }
    element.src = `assets/images/personal-photo${imageIndex}.jpg`;
}