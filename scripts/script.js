const mainContainer = document.getElementById("main-container");

function login(){
if(document.getElementById("usr").value === "admin" && document.getElementById("pwd").value === "admin123"){
        mainContainer.innerHTML = "";
    }
}

document.getElementById("signin").addEventListener('click', login);
