document.addEventListener("DOMContentLoaded",function() {
    const login = document.forms.login;
    const email = login.email;

    const submit = document.getElementById("submit");

    submit.addEventListener("click",function() {
        if (email.value == "owner@email.com"){
            login.setAttribute("action","/html/user-views/owner.html");
        }
        else{
            login.setAttribute("action","/html/user-views/index.html");
        }
    });
});