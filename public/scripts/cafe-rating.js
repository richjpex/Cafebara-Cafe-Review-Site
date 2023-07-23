  // Wrap the JavaScript code inside the DOMContentLoaded event listener
  document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    const selectedRatingInput = document.getElementById("selected-rating");

    // Initialize the rating based on the input value if present and valid
    const initialValue = parseInt(selectedRatingInput.value);
    if (!isNaN(initialValue) && initialValue > 0 && initialValue <= 5) {
      setSelectedRating(initialValue);
    }

    // Attach event listeners to stars
    stars.forEach(star => {
      star.addEventListener("click", () => {
        const rating = star.getAttribute("data-rating");
        setSelectedRating(rating);
        console.log("Rating selected: " + rating)
      });

      star.addEventListener("mouseenter", () => {
        const rating = star.getAttribute("data-rating");
        fillStars(rating);
      });

      star.addEventListener("mouseleave", () => {
        const currentRating = selectedRatingInput.value;
        fillStars(currentRating);
      });
    });

    // Function to set the selected rating
    function setSelectedRating(rating) {
      selectedRatingInput.value = rating;
      fillStars(rating);
    }

    // Function to fill the stars based on the given rating
    function fillStars(rating) {
      stars.forEach(star => {
        const starRating = star.getAttribute("data-rating");
        if (starRating <= rating) {
          star.classList.add("filled");
        } else {
          star.classList.remove("filled");
        }
      });
    }
  });