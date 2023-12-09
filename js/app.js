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
let themeBtn = document.querySelector('.theme-mode')
let htmlElement = document.documentElement
let players = []
if (localStorage.getItem('playersName')) {
    players = JSON.parse(localStorage.getItem('playersName'))
}

openFormBtn.addEventListener('click', _ => {
    addPlayersForm.classList.add('show')
})
closeFormBtn.addEventListener('click', _ => {
    addPlayersForm.classList.remove('show')
})

addInputToForm.addEventListener('click', _ => {
    let div = document.createElement('div')
    div.innerHTML = '<input type="text" placeholder="ادخل اسم اللاعب"> <button onclick=deleteInput(this)>حذف</button>'
    document.querySelector('.add-player__form--inputs').append(div)
    playersInputs = document.querySelectorAll('.add-player__form--inputs input')
})

btnPlay.addEventListener('click', _ => {
    if (players.length) {
        btnPlay.innerHTML=`<div class="loader"></div>`
        btnPlay.classList.add('play')
        losElement.classList.add('show')
        winElement.classList.add('show')
        randomChoose()
    } else {
        addPlayersForm.classList.add('show')
    }
})

addPlayerBtn.addEventListener('click', addPlayers)

themeBtn.addEventListener('click', _=>{
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

function deleteInput(e) {
    e.parentElement.remove()
}


function addPlayers() {
    players = []
    playersInputs.forEach(input => {
        input.value !== '' && players.push(input.value)
    })
    if (players.length < 2) {
        alert('enter greater than tow player')
        players = []
    } else {
        addPlayersForm.classList.remove('show')
        localStorage.setItem('playersName', JSON.stringify(players))
        console.log(players);
    }

}

async function randomChoose() {
    let randomWin
    let randomLos
    let interval = setInterval(() => {
        randomWin = Math.floor(Math.random() * players.length)
        randomLos = Math.floor(Math.random() * players.length)
        if (randomWin !== randomLos) {
            winNameElement.innerHTML = players[randomWin]
            loseNameElement.innerHTML = players[randomLos]
        }
    }, 40);
    setTimeout(() => {
        btnPlay.innerHTML=`ابداء`
        btnPlay.classList.remove('play')
        clearInterval(interval)
    }, 2000);
}
