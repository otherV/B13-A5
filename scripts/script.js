
function login() {
    try {
        if (document.getElementById("usr").value === "admin" && document.getElementById("pwd").value === "admin123") {
            //mainContainer.innerHTML = "";
            window.location.href = "issues.html";
        }
    } catch (error) {
        console.error("error login:", error);
    }
}

try {
    document.getElementById("signin").addEventListener('click', login);
} catch (error) {
    //console.error("error event listener:", error);
}


