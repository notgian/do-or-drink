/* 
modes:
1 classic
2 playing it safe
3 clean
4 dangerous
5 pure chaos
*/

function getQuestions(mode) {
    if (mode == 1) return whiteCards.concat(blackCards)
    else if (mode == 2) return whiteCards.concat(whiteCards).concat(blackCards)
    else if (mode == 3) return whiteCards
    else if (mode == 4) return whiteCards.concat(blackCards).concat(blackCards)
    else if (mode == 5) return blackCards
}

var gameQuestions = []
let gq = []

function startGame(mode) {
    gameQuestions = getQuestions(mode);
    gq = [...gameQuestions]
    
    document.getElementById("gameModal").style.visibility = "visible";
    document.getElementById("gameModal").style.opacity = "100%";

    
}

const questionEvent = new CustomEvent("question", {})

function nextQuestion() {
    let gameModal = document.getElementById("gameModal")
    let gameCard = gameModal.getElementsByClassName("gameCard")[0]

    let newQuestion = gameQuestions[Math.floor(Math.random() * (gameQuestions.length))]

    if (gameCard.classList.contains('cardColor-white')) gameCard.classList.remove("cardColor-white")
    if (gameCard.classList.contains('cardColor-black')) gameCard.classList.remove("cardColor-black")

    gameCard.classList.add("cardColor-"+newQuestion.type)

    gameCard.children[0].innerText = newQuestion.question
    
    document.dispatchEvent(questionEvent)

}































let c = false

document.addEventListener('keydown', (e) => {
    if (e.key == "z" || e.key == "Z") {
        gameQuestions = [new Question("black", "7 minutes in heaven. If you refuse or leave early, do 3 seconds.")]
        c = true
    }

    else if (e.key == "c" || e.key == "C") {
        gameQuestions = [new Question("black", "Kiss someone in the game or do 2 seconds."),]
        c = true
    }

    else if (e.key == "l" || e.key == "L") {
        gameQuestions = [new Question("black", "Sit on the lap of the person to your right until the next round or do 2 seconds.")]
        c = true
    }
})

document.addEventListener('question', e => {
    if (c) {
        c = false
        gameQuestions = gq
    }
})