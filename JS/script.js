document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const groups = document.querySelectorAll(".image-group");
    let currentIndex = 0;

    const forceReflow = (element) => {
        void element.offsetWidth; // Trigger reflow
    };
    
    const updateSlider = (index) => {
        slides.forEach((slide, idx) => {
            if (idx === index) {
                forceReflow(slide); // Reapply animation
                slide.classList.add("active");
                const groupID = slide.getAttribute("data-group");
                updateImageGroup(groupID);
            } else {
                slide.classList.remove("active");
            }
        });
    
        dots.forEach((dot, idx) => {
            dot.classList.remove("active");
            if (idx === index) {
                dot.classList.add("active");
            }
        });
    };

    // Function to update the image group visibility
    const updateImageGroup = (groupID) => {
        groups.forEach((group) => {
            if (group.id === groupID) {
                group.style.display = "flex"; // Show the group of images
            } else {
                group.style.display = "none"; // Hide other groups
            }
        });
    };

    // Function to go to the next slide
    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length; // Wrap around when going forward
        updateSlider(currentIndex);
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Wrap around when going back
        updateSlider(currentIndex);
    };

    // Initialize the slider on page load
    updateSlider(currentIndex);

    // Add click event listeners to each slide to toggle the description
    slides.forEach((slide) => {
        slide.addEventListener("click", () => {
            const description = slide.querySelector(".description");
            if (description.style.opacity === "1") {
                description.style.opacity = "0"; // Hide the description
            } else {
                description.style.opacity = "1"; // Show the description
            }
        });
    });

    // Add event listeners for touch and click navigation
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

    // Handle swipe functionality
    const handleSwipe = () => {
        if (touchEndX < touchStartX) {
            nextSlide(); // Swiped left
        }
        if (touchEndX > touchStartX) {
            prevSlide(); // Swiped right
        }
    };

    // Add click event listeners to each image in the groups to show the popup
    const images = document.querySelectorAll(".image-group img");

    images.forEach((image) => {
        image.addEventListener("click", () => {
            // Set image and description dynamically
 popupImage.src = image.src;
            popupDescription.textContent = image.alt; // Use 'alt' as the description

            // Show the popup
            popup.style.display = "flex";
        });
    });

    // Popup handling
    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popupImage");
    const popupDescription = document.getElementById("popupDescription");
    const closePopup = document.getElementById("closePopup");

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

    // Arrow button events
    document.querySelector(".prev-btn").addEventListener("click", prevSlide);
    document.querySelector(".next-btn").addEventListener("click", nextSlide);

    // Dot navigation
    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
            currentIndex = idx;
            updateSlider(currentIndex);
        });
    });
});