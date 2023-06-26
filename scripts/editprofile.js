document.addEventListener("DOMContentLoaded",function() {
    let pic = document.querySelector("#uploadbtn");

    pic.addEventListener('change', function() {
        readURL(pic);
    });
    function readURL(input) {
        let profilepic = document.querySelector("#profilepic");
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            profilepic.setAttribute('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
        } 
        else {
          alert('select a file to see preview');
            profilepic.setAttribute('src', '/images/assets/2logo.png');
        }
      }
});