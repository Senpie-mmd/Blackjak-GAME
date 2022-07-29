const usernameEl = document.querySelector("#user-name-el")
const robonameEl = document.querySelector("#robo-name-el")
const userchipsEl = document.querySelector("#user-chips-el")
const robochipsEl = document.querySelector("#robo-chips-el")
const userpoinEl = document.querySelector("#user-point-el")
const robopointEl = document.querySelector("#robo-point-el")
const catch25 = document.querySelector("#catch25")
const catch50 = document.querySelector("#catch50")
const catch100 = document.querySelector("#catch100")
const takeCard = document.querySelector("#take-card")
const finishTurn = document.querySelector("#finish-turn")
const backMenu = document.querySelector("#back-menu")
const messageDialog = document.querySelector("#message-dialog")
const Message = document.querySelector("#message")

let isBetSet = false
let isGameStarted = false
let isGameFinished = true
let isGameRestarting = false

let gambleAmount = 0
let userCards = 0
let roboCards = 0
let userCatch = 400
let roboCatch = 400
let userWon = 0
let roboWon = 0

InsertDetails(usernameEl, userchipsEl, userpoinEl, userCatch, userWon, userCards, "")
InsertDetails("", robochipsEl, robopointEl, roboCatch, roboWon, roboCards, "")

function InsertDetails(Name = "", Chips = "", Won = "", ChipsAmount = "", WonTime = "", cards = 0, defaultROBO = "") {
    if (ChipsAmount === userCatch && Name !== "") {
        Name.textContent = `${localStorage.getItem("UserName")}: `

    } if (Chips !== "" && ChipsAmount !== "") {
        Chips.textContent = `Chips: $${ChipsAmount}`

    } if (Won !== "" && WonTime !== "") {
        Won.textContent = `Won: ${WonTime}`

    } if (cards !== 0 && Name !== "") {
        Name.textContent = `${localStorage.getItem("UserName")}: ${cards}`

    } if (Name === "" && cards !== 0 && defaultROBO === "") {
        robonameEl.textContent = `Robo: ${cards}`
    } if (Name === "" && defaultROBO !== "") {
        robonameEl.textContent = "Robo:"
    }
}

function roboCardsPicker() {
    for (let i = 1; i <= 8; i++) {
        if (roboCards < 16) {
            roboCards += GetRandowCard()
        }
    }
}

function previousBet() {
    userCatch += gambleAmount
    isFirstCartTaken = false
}

function unClick(x) {
    x.style = `color:green; background-color:goldenrod;`
    gambleAmount = 0
    isBetSet = false
}

function ShowDialog(message, color) {
    Message.textContent = message
    messageDialog.style = `display:block;`
    Message.style = `color:${color};`
}

function GetRandowCard() {
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 4, 3, 2]
    const randomnunmber = Math.floor(Math.random() * 13)
    return cards[randomnunmber]
}

function SetBetBTN(Amount = 0) {
    if (isGameStarted === false && isGameFinished === true) {
        if (gambleAmount === 0) {
            switch (Amount) {
                case 25:
                    catch25.style = `color:goldenrod; background-color:white;`
                    catch50.style = `color:green; background-color:goldenrod;`
                    catch100.style = `color:green; background-color:goldenrod;`
                    gambleAmount = 25
                    userCatch -= 25
                    roboCatch -= 25
                    break;
                case 50:
                    catch25.style = `color:green; background-color:goldenrod;`
                    catch50.style = `color:goldenrod; background-color:white;`
                    catch100.style = `color:green; background-color:goldenrod;`
                    gambleAmount = 50
                    userCatch -= 50
                    roboCatch -= 50
                    break;
                case 100:
                    catch25.style = `color:green; background-color:goldenrod;`
                    catch50.style = `color:green; background-color:goldenrod;`
                    catch100.style = `color:goldenrod; background-color:white;`
                    gambleAmount = 100
                    userCatch -= 100
                    roboCatch -= 100
                    break;
            }
            isBetSet = true
        } else {
            userCatch += gambleAmount
            roboCatch += gambleAmount
            switch (Amount) {
                case 25:
                    if (gambleAmount !== 25) {
                        catch25.style = `color:goldenrod; background-color:white;`
                        catch50.style = `color:green; background-color:goldenrod;`
                        catch100.style = `color:green; background-color:goldenrod;`
                        gambleAmount = 25
                        userCatch -= 25
                        roboCatch -= 25
                        isBetSet = true
                    } else {
                        catch25.style = `color:green; background-color:goldenrod;`
                        gambleAmount = 0
                        isBetSet = false
                    }
                    break;
                case 50:
                    if (gambleAmount !== 50) {
                        catch25.style = `color:green; background-color:goldenrod;`
                        catch50.style = `color:goldenrod; background-color:white;`
                        catch100.style = `color:green; background-color:goldenrod;`
                        gambleAmount = 50
                        userCatch -= 50
                        roboCatch -= 50
                        isBetSet = true
                    } else {
                        catch50.style = `color:green; background-color:goldenrod;`
                        gambleAmount = 0
                        isBetSet = false
                    }
                    break;
                case 100:
                    if (gambleAmount !== 100) {
                        catch25.style = `color:green; background-color:goldenrod;`
                        catch50.style = `color:green; background-color:goldenrod;`
                        catch100.style = `color:goldenrod; background-color:white;`
                        gambleAmount = 100
                        userCatch -= 100
                        roboCatch -= 100
                        isBetSet = true
                    } else {
                        catch100.style = `color:green; background-color:goldenrod;`
                        gambleAmount = 0
                        isBetSet = false
                    }
                    break;
            }
        }
    } else {
        ShowDialog("Can't Change Bet RightNow!", "red")
    }
}

function CheckANDSetPlayersCatch(Amount = 0) {
    switch (Amount) {
        case 25:
            if (userCatch >= 25 && roboCatch >= 25) {
                SetBetBTN(25)
            } else if (userCatch < 25) {
                ShowDialog("You Completly Out of Money! Back to Menu", "red")
            } else if (roboCatch < 25) {
                ShowDialog("You WipedOut Robo! Back to Menu", "green")
            }
            break;
        case 50:
            if (userCatch >= 50 && roboCatch >= 50) {
                SetBetBTN(50)
            } else if (userCatch < 50 && userCatch < 25) {
                ShowDialog("You Completly Out of Money! Back to Menu", "red")
            } else if (userCatch < 50 && userCatch >= 25) {
                ShowDialog("You don't have enough money! try a lesser amount", "yellow")
            } else if (roboCatch < 50 && roboCatch < 25) {
                ShowDialog("You WipedOut Robo! Back to Menu", "green")
            } else if (roboCatch < 50 && roboCatch >= 25) {
                ShowDialog("Robo doesn't have enough money! try a lesser amount", "yellow")
            }
            break;
        case 100:
            if (userCatch >= 100 && roboCatch >= 100) {
                SetBetBTN(100)
            } else if (userCatch < 100 && userCatch < 25) {
                ShowDialog("You Completly Out of Money! Back to Menu", "red")
            } else if (userCatch < 100 && userCatch >= 25) {
                ShowDialog("You don't have enough money! try a lesser amount", "yellow")
            } else if (roboCatch < 100 && roboCatch < 25) {
                ShowDialog("You WipedOut Robo! Back to Menu", "green")
            } else if (roboCatch < 100 && roboCatch >= 25) {
                ShowDialog("Robo doesn't have enough money! try a lesser amount", "yellow")
            }
    }
    InsertDetails("", userchipsEl, "", userCatch, "", "", "")
    InsertDetails("", robochipsEl, "", roboCatch, "", "", "")
}

function MatchResult(amount = 0) {
    switch (amount) {
        case 0:
            if (roboCards > 21) {
                ShowDialog("DRAW !", "yellow")
                roboCatch += gambleAmount
                userCatch += gambleAmount
            } else {
                ShowDialog("Robo got the MONEY!", "red")
                roboCatch += gambleAmount * 2
                roboWon += 1
            }
            break;
        case 1:
            if (roboCards > 21) {
                ShowDialog("yeay! You got the MONEY!", "green")
                userCatch += gambleAmount * 2
                userWon += 1
            } else if (roboCards < 21) {
                if (roboCards > userCards) {
                    ShowDialog("Robo got the MONEY!", "red")
                    roboCatch += gambleAmount * 2
                    roboWon += 1
                } else if (roboCards === userCards) {
                    ShowDialog("DRAW !", "yellow")
                    roboCatch += gambleAmount
                    userCatch += gambleAmount
                } else {
                    ShowDialog("yeay! You got the MONEY!", "green")
                    userCatch += gambleAmount * 2
                    userWon += 1
                }
            } else {
                ShowDialog("Robo got the MONEY!", "red")
                roboCatch += gambleAmount * 2
                roboWon += 1
            }
            break;
        case 2:
            if (roboCards === 21) {
                ShowDialog("DRAW !", "yellow")
                roboCatch += gambleAmount
                userCatch += gambleAmount
            } else {
                ShowDialog("yeay! You got the MONEY!", "green")
                userCatch += gambleAmount * 2
                userWon += 1
            }
            break;
    }
    InsertDetails(usernameEl, userchipsEl, userpoinEl, userCatch, userWon, userCards, "")
    InsertDetails("", robochipsEl, robopointEl, roboCatch, roboWon, roboCards, "")
    ReStartGame()
}

function SetBetDefault() {
    catch25.style = `color:green; backfround-color:goldenrod`
    catch50.style = `color:green; backfround-color:goldenrod`
    catch100.style = `color:green; backfround-color:goldenrod`
}

function ReStartGame() {
    finishTurn.style = `display:none;`
    backMenu.style = `display:inline-block;`
    switch (gambleAmount) {
        case 25:
            catch50.style = `display:none;`
            catch100.style = `display:none;`
            break;
        case 50:
            catch25.style = `display:none;`
            catch100.style = `display:none;`
            break;
        case 100:
            catch25.style = `display:none;`
            catch50.style = `display:none;`
            break;
    }

    gambleAmount = 0
    userCards = 0
    roboCards = 0
    takeCard.textContent = "RESTART"
    isGameRestarting = true
    isGameStarted = false
    isGameFinished = true
}

catch25.addEventListener("click", function () {
    CheckANDSetPlayersCatch(25)
})
catch50.addEventListener("click", function () {
    CheckANDSetPlayersCatch(50)
})
catch100.addEventListener("click", function () {
    CheckANDSetPlayersCatch(100)
})


messageDialog.addEventListener("click", function () {
    messageDialog.style = `display:none;`
})

takeCard.addEventListener("click", function () {
    if (isBetSet === true && userCards < 21 && isGameRestarting === false) {
        isGameStarted = true
        userCards += GetRandowCard()
        InsertDetails(usernameEl, "", "", "", "", userCards, "")
        finishTurn.style = `display:inline-block;`
        backMenu.style = `display:none;`
        if (userCards === 21) {
            roboCardsPicker()
            MatchResult(2)
        } else if (userCards > 21) {
            roboCardsPicker()
            MatchResult(0)
        }
    } else if (isBetSet === false && isGameRestarting === false) {
        CheckANDSetPlayersCatch(25)
        isGameStarted = true
        userCards += GetRandowCard()
        finishTurn.style = `display:inline-block;`
        backMenu.style = `display:none;`
        InsertDetails(usernameEl, "", "", "", "", userCards, "")
    } else if (isGameRestarting === true) {
        takeCard.textContent = "Take Card"

        InsertDetails(usernameEl, userchipsEl, userpoinEl, userCatch, userWon, userCards, "")
        InsertDetails("", robochipsEl, robopointEl, roboCatch, roboWon, roboCards, "DefaultROBO")
        isBetSet = false
        isGameRestarting = false
        catch25.style = `display:inline-block;`
        catch50.style = `display:inline-block;`
        catch100.style = `display:inline-block;`
        SetBetDefault()
    }
})

finishTurn.addEventListener("click", function () {
        if (userCards < 21) {
            roboCardsPicker()
            MatchResult(1)
        } else {
            ShowDialog("Turn Already Finished!", "red")
        }
})

backMenu.addEventListener("click", function () {
    if (isGameStarted === false && isGameFinished === true) {
        window.open("index.html", "_blank")
        setTimeout(window.close(), 1)

        isBetSet = false
        isGameStarted = false
        isGameFinished = true

        gambleAmount = 0
        userCards = 0
        roboCards = 0
        userCatch = 400
        roboCatch = 400
        userWon = 0
        roboWon = 0
    } else {
        ShowDialog("Please Finish Turn First!", "red")
    }
})