let openFormBtn = document.querySelector('#openForm')
let closeFormBtn = document.querySelector('#closeForm')
let addPlayersForm = document.querySelector('.add-player__form')
let playersInputs = document.querySelectorAll('.add-player__form--inputs input')
let addPlayerBtn = document.querySelector('#addPlayerBtn')
let addInputToForm = document.querySelector('#addInputToForm')
let playerCountElement = document.querySelector('.player-count')
let btnPlay = document.querySelector('.btn-play')
let winElement = document.querySelector('.winner')
let losElement = document.querySelector('.loser')
let winNameElement = document.querySelector('.win-name')
let loseNameElement = document.querySelector('.lose-name')
let themeBtn = document.querySelector('.theme-mode')
let htmlElement = document.documentElement

let similarityName = false
let players = JSON.parse(localStorage.getItem('playersName')) || []

playerCountElement.textContent = `عدد اللاعبين ${players.length}`

themeBtn.addEventListener('click', _ => {
    if (htmlElement.classList.contains('dark')) {
        themeBtn.classList.remove('dark')
        themeBtn.classList.add('light')
        htmlElement.classList.remove('dark')
        htmlElement.classList.add('light')
    } else {
        themeBtn.classList.remove('light')
        themeBtn.classList.add('dark')
        htmlElement.classList.remove('light')
        htmlElement.classList.add('dark')

    }
})

openFormBtn.addEventListener('click', _ => {
    showPlayerName()
    addPlayersForm.classList.add('show')
})
closeFormBtn.addEventListener('click', _ => {
    addPlayersForm.classList.remove('show')
    players = JSON.parse(localStorage.getItem('playersName')) || []
})

addInputToForm.addEventListener('click', createInput)
addPlayerBtn.addEventListener('click', addPlayers)

btnPlay.addEventListener('click', _ => {
    if (players.length) {
        btnPlay.innerHTML = `<div class="loader"></div>`
        btnPlay.classList.add('play')
        losElement.classList.add('show')
        winElement.classList.add('show')
        randomChoose()
    } else {
        addPlayersForm.classList.add('show')
    }
})

function showPlayerName() {
    if (players.length) {
        players.forEach((player, index) => {
            if (index > 1 && players.length > playersInputs.length) {
                createInput()
            }
            playersInputs[index].value = player
        })
        playersInputs.forEach((input, index) => {
            checkPlayerExists(input, index)
        });
    }
}

playersInputs.forEach((input, index) => {
    input.addEventListener('keyup', _ => {
        checkPlayerExists(input, index)
    })
});

function createInput() {
    let div = document.createElement('div')
    div.innerHTML = `${playersInputs.length + 1}: <input type="text" placeholder="ادخل اسم اللاعب" onkeyup="checkPlayerExists(this, ${playersInputs.length})"> <button onclick="removeInput(this, ${playersInputs.length})">حذف</button>`
    document.querySelector('.add-player__form--inputs').append(div)
    playersInputs = document.querySelectorAll('.add-player__form--inputs input')
    let a = document.querySelector('.overflow')
    a.scrollTo(0, a.scrollHeight)
}

function removeInput(e,index) {
    if (similarityName==index) {
        similarityName=false
    }
    e.parentElement.remove()
    playersInputs = document.querySelectorAll('.add-player__form--inputs input')

}

function checkPlayerExists(input, inputIndex) {
    players = []
    playersInputs.forEach(input => {
        input.value !== '' && players.push(input.value)
    })
    if (players.some((player, pIndex) => player.toLowerCase() == input.value.toLowerCase() && pIndex != inputIndex)) {
        input.style.borderColor = '#B80000'
        similarityName = inputIndex
    } else {
        input.style.borderColor = 'transparent'
        similarityName = false
    }
}


function addPlayers() {
    players = []
    playersInputs.forEach(input => {
        input.value !== '' && players.push(input.value)
    })
    if (players.length < 2) {
        alert('اقل عدد لاعبان')
        players = []
    } else if (similarityName) {
        playersInputs[similarityName].classList.add('animate__animated', 'animate__shakeX')
        setTimeout(() => {
            playersInputs[similarityName].classList.remove('animate__animated', 'animate__shakeX')

        }, 1000);
    } else {
        addPlayersForm.classList.remove('show')
        localStorage.setItem('playersName', JSON.stringify(players))
    }
    playerCountElement.textContent = `عدد اللاعبين ${players.length}`

}

function randomChoose() {
    let randomWin
    let randomLos
    let interval = setInterval(() => {
        randomWin = Math.floor(Math.random() * players.length)
        randomLos = Math.floor(Math.random() * players.length)
        if (randomWin !== randomLos) {
            winNameElement.textContent = players[randomWin]
            loseNameElement.innerHTML = players[randomLos]
        }
    }, 30);
    setTimeout(() => {
        btnPlay.innerHTML = `ابداء`
        btnPlay.classList.remove('play')
        clearInterval(interval)
    }, 2000);
}


