document.addEventListener("DOMContentLoaded",function() {
    document.getElementById("logout").addEventListener("click", function() {
        console.log("logout");
        fetch("/logout", {
            method: "DELETE"
        }).then(function(response) {
            window.location.href = "/";
        });
    });
});