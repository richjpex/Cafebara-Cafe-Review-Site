document.addEventListener("DOMContentLoaded",function() {
//???????????????????????
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    for (const [name, value] of urlParams.entries()) {
        console.log(`${name}: ${value}`);
        if (name !== 'message' && name !== 'email' && name !== 'password' && name !== 'confirmpassword') {
            const input = document.querySelector(`[name="${name}"]`);
            if (input) {            
                input.value = decodeURIComponent(value);
            
            }
        }
    }
    if (message) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = decodeURIComponent(message);
    }
});