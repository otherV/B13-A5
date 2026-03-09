const mainContainer = document.getElementById("main-container");

function login() {
    if (document.getElementById("usr").value === "admin" && document.getElementById("pwd").value === "admin123") {
        //mainContainer.innerHTML = "";
        window.location.href = "issues.html";
    }
}

document.getElementById("signin").addEventListener('click', login);
