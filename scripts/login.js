document.addEventListener("DOMContentLoaded",function() {
    const login = document.forms.login;
    const email = login.email;

    const submit = document.getElementById("submit");

    submit.addEventListener("click",function() {
        if (email.value == "owner@email.com"){
            login.setAttribute("action","owner.html");
        }
        else{
            login.setAttribute("action","index2.html");
        }
    });
});