document.addEventListener("DOMContentLoaded",function() {
    console.log("connected");
    document.getElementById("profilepicture").addEventListener("click",function() {
        openclosesidebar();
    });

    document.querySelector(".btn-close").addEventListener("click",function() {
        document.querySelector(".sidebar").style.display = "none";
    });

    function openclosesidebar(){
        const sidebar = document.querySelector(".sidebar");
        switch(sidebar.style.display){
            case "none": 
                sidebar.style.display = "block";
                break;
            case "block":
                sidebar.style.display = "none";
                break;
            default:
                sidebar.style.display = "none";
        }
    }
});