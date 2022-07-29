localStorage.clear()
const nameEl = document.querySelector("#name-el")
const startGame = document.querySelector("#start-game")
let userName = null

startGame.addEventListener("click", function () {
    if (nameEl.value != "") {
        userName = nameEl.value
        window.open("index2.html","_blank")
        setTimeout(window.close(),1)
        nameEl.style = `border:1px solid green;`
        localStorage.setItem("UserName", (userName))
    } else {
        nameEl.style = `border:3px solid red;`
    }
})