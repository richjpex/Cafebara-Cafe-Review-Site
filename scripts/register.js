document.addEventListener("DOMContentLoaded",function() {
    const formElement = document.forms.login;
    let formData = new FormData(formElement);

    
    const owner = "owner";
    const customer = "customer";
    
    const dropdown = document.querySelector("#usertype");
    
    let usertype = dropdown.value;

    displayCustomerRegistration();

    dropdown.addEventListener("change", function() {
        usertype = dropdown.value;
        changeForm(usertype);
    })

    function changeForm(usertype){
        if(usertype == customer){
            displayCustomerRegistration();
        }
        else if(usertype == owner){

        }
    }

    function displayCustomerRegistration(){

        const basicform = 
        `<label for="firstname">First Name</label><br>
        <input type="text" class = "inputfield" name="firstname" required><br>
        <label for="lastname">Last Name</label><br>
        <input type="text" class = "inputfield" name="lastname" required>
        <br>
        <label for="age">Age</label><br>
        <input type="text" class = "inputfield" name="age" required>
        <br>
        <label for="email">Email</label><br>
        <input type="email" class = "inputfield" name="email" required>
        <br>
        <label for="password">Password</label><br>
        <input type="password" class = "inputfield" name="password" required>
        <br>
        <label for="confirmpass">Confirm Password</label><br>
        <input type="password" class = "inputfield" name="confirmpass" required>
        <br>
        <input type = "button" id = "submit" name = "submit" value = "Sign In">`;

        document.querySelector("#registerform").innerHTML += basicform;
    }
});