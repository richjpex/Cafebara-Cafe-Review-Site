document.addEventListener("DOMContentLoaded",function() {

    // Get the elements you need
    const ratingsDiv = document.querySelector('.ratings');
    const ratingContainerDiv = document.querySelector('.other-rating-container');
    const editBtn = document.getElementById('editbtn');
    const submitChangesBtn = document.getElementById('submitChanges');
    const selectedRatingInput = document.getElementById('selected-rating');
  
    // Add a click event listener to the "editbtn"
    editBtn.addEventListener('click', function() {
      // Show the "rating-container" and hide the "ratings" div
      ratingContainerDiv.classList.remove('hidden');
      ratingsDiv.classList.add('hidden');
    });
  
    // Add a click event listener to the "submitChanges" button
    submitChangesBtn.addEventListener('click', function() {
      // Get the data-rating value from the selectedRatingInput
      const dataRating = parseInt(selectedRatingInput.value);
  
      // Show the "ratings" div and hide the "rating-container" div
      ratingContainerDiv.classList.add('hidden');
      ratingsDiv.classList.remove('hidden');
  
      // Update the displayed images based on the data-rating value
      const fullImages = dataRating;
      const emptyImages = 5 - dataRating;
  
      const fullImageHTML = '<img src="../../images/ratings/full.png" />';
      const emptyImageHTML = '<img src="../../images/ratings/empty.png" />';
  
      let ratingsHTML = '';
  
      for (let i = 0; i < fullImages; i++) {
        ratingsHTML += fullImageHTML;
      }
  
      for (let i = 0; i < emptyImages; i++) {
        ratingsHTML += emptyImageHTML;
      }
  
      ratingsDiv.innerHTML = ratingsHTML;

      const editableforms = document.querySelectorAll(".editable");
      const review_title = editableforms[0].children[0].innerHTML;
      const review = editableforms[1].children[0].innerHTML;
      const parent = this.parentElement.parentElement.parentElement.parentElement;
      
      const rating = selectedRatingInput.value;
      const review_id = parent.children[1].children[0].innerHTML;
      fetch('/editReview', {
          method: 'PUT',
          body: JSON.stringify({review_id, review_title, review, rating}),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log(response.data);
          if (response.status == 200){
              console.log("A")
          }
          else
              console.log("An error has occurred");
      })
    });

    const deleteBtn = document.getElementById("deletebtn");
    deleteBtn.addEventListener("click",function() {
        let div = this.parentElement;
        for(let i = 0; i < 5; i++){
            div = div.parentElement;
        }
        console.log(div);

        const cafe_id = document.getElementById("#cafe_id").innerHTML;

        fetch('/deleteReview', {
            method: "DELETE",
            body: JSON.stringify({cafe_id}),
            headers: {
                'Content-Type': 'application/json'
        }
        }).then(response => {
            // location.reload();
            console.log(response.data);
        });

    });

});