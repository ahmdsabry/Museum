let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
// let slideInterval; // Comment this out or remove it if not needed

// Function to show the next slide
function showNextSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('next');
        slide.classList.remove('prev');
        if (i === index) {
            slide.classList.add('next');
        }
    });
}

// Function to show the previous slide
function showPrevSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('next');
        slide.classList.remove('prev');
        if (i === index) {
            slide.classList.add('prev');
        }
    });
}

// Function to go to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showNextSlide(currentIndex);
}

// Function to go to the previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showPrevSlide(currentIndex);
}

// Remove or comment out the interval code
// function startAutoSlide() {
//     slideInterval = setInterval(nextSlide, 7000);
// }

// Start the slider on the first slide manually
showNextSlide(currentIndex);

// Add event listeners for touch and click navigation only
let touchStartX = 0;
let touchEndX = 0;
const slider = document.getElementById('slider');

// Touch start event listener
slider.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

// Touch end event listener
slider.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

// Click event listener for arrows
slider.addEventListener('click', (event) => {
    const sliderWidth = slider.clientWidth;
    const clickX = event.clientX;

    if (clickX > sliderWidth / 2) {
        nextSlide();
    } else {
        prevSlide();
    }
});

// Handle swipe functionality
function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextSlide();
    }
    if (touchEndX > touchStartX) {
        prevSlide();
    }
}



document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const groups = document.querySelectorAll(".image-group");
    let currentIndex = 0;

    const updateSlider = (index) => {
        slides.forEach((slide, idx) => {
            slide.classList.toggle("active", idx === index);
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === index);
        });

        groups.forEach((group, idx) => {
            group.style.display = idx === index ? "flex" : "none";
        });
    };

    document.querySelector(".prev-btn").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(currentIndex);
    });

    document.querySelector(".next-btn").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
            currentIndex = idx;
            updateSlider(currentIndex);
        });
    });

    // Initialize the slider
    updateSlider(currentIndex);
});




document.addEventListener("DOMContentLoaded", () => {
    // Popup elements
    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popupImage");
    const popupDescription = document.getElementById("popupDescription");
    const closePopup = document.getElementById("closePopup");

    // All images under the main slider
    const images = document.querySelectorAll(".image-group img");

    // Add click event listeners to each image
    images.forEach((image) => {
        image.addEventListener("click", () => {
            // Set image and description dynamically
            popupImage.src = image.src;
            popupDescription.textContent = image.alt; // Use 'alt' as the description

            // Show the popup
            popup.style.display = "flex";
        });
    });

    // Close popup when the close button is clicked
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Close popup when clicking outside the content
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    // Popup elements
    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popupImage");
    const popupDescription = document.getElementById("popupDescription");
    const closePopup = document.getElementById("closePopup");

    // Image groups with their descriptions
    const descriptions = {
        group1: "Description of Egyptian Museum - Group 1: Ancient artifacts and statues.",
        group2: "Description of Egyptian Museum - Group 2: Mummies and hieroglyphs.",
        group3: "Description of Egyptian Museum - Group 3: Historical paintings and jewelry."
    };

    // All images under the main slider
    const images = document.querySelectorAll(".image-group img");

    // Add click event listeners to each image
    images.forEach((image) => {
        image.addEventListener("click", () => {
            // Set the image and description dynamically
            popupImage.src = image.src;

            // Get the group description using the parent group ID
            const groupID = image.closest(".image-group").id;
            popupDescription.textContent = descriptions[groupID];

            // Show the popup
            popup.style.display = "flex";
        });
    });

    // Close popup when the close button is clicked
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Close popup when clicking outside the content
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});