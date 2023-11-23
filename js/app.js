
let btnOptionTow = document.querySelector('.option-tow button')
let gameMode = document.querySelector('.option-tow ul')
let playArea = document.querySelector('.body')
let header = document.querySelector('header')
let openFormBtn = document.querySelector('#openForm')
let closeFormBtn = document.querySelector('#closeForm')
let addPlayersForm = document.querySelector('.add-player__form')
let playersInputs = document.querySelectorAll('.add-player__form--inputs input')
let addPlayerBtn = document.querySelector('#addPlayerBtn')
let addInputToForm = document.querySelector('#addInputToForm')
let btnPlay = document.querySelector('.btn-play')
let winElement = document.querySelector('.winner')
let losElement = document.querySelector('.loser')
let winNameElement = document.querySelector('.win-name')
let loseNameElement = document.querySelector('.lose-name')

let players = []
if (localStorage.getItem('playersName')) {
    players = JSON.parse(localStorage.getItem('playersName'))
}
let winner = ''
let loser = ''

openFormBtn.addEventListener('click', _ => {
    addPlayersForm.classList.add('show')
})
closeFormBtn.addEventListener('click', _ => {
    addPlayersForm.classList.remove('show')
})

addInputToForm.addEventListener('click', _ => {
    let div = document.createElement('div')
    div.innerHTML = '<input type="text"> <button onclick=deleteInput(this)>حذف</button>'
    document.querySelector('.add-player__form--inputs').append(div)
    playersInputs = document.querySelectorAll('.add-player__form--inputs input')
})

btnPlay.addEventListener('click', _ => {
    if (players.length) {
        losElement.classList.add('show')
        winElement.classList.add('show')
        randomChoose()
    } else {
        addPlayersForm.classList.add('show')
    }
})

addPlayerBtn.addEventListener('click', addPlayers)

function deleteInput(e) {
    e.parentElement.remove()
}


function addPlayers() {
    players = []
    playersInputs.forEach(input => {
        input.value !== '' && players.push(input.value)
    })
    addPlayersForm.classList.remove('show')
    localStorage.setItem('playersName', JSON.stringify(players))
    console.log(players);
}

function randomChoose() {
    let randomWin = Math.floor(Math.random() * players.length)
    let randomLos = Math.floor(Math.random() * players.length)
    let interval = setInterval(() => {
        randomWin = Math.floor(Math.random() * players.length)
        randomLos = Math.floor(Math.random() * players.length)
        winNameElement.innerHTML = players[randomWin]
        loseNameElement.innerHTML = players[randomLos]
    }, 30);
    setTimeout(() => {
        clearInterval(interval)
    }, 2000);
    if (randomLos != randomWin) {
        winNameElement.innerHTML = players[randomWin]
        loseNameElement.innerHTML = players[randomLos]
    } else {
        randomChoose()
    }
}
