let btnOptionOne= document.querySelector('.option-one button')
let liNumWin= document.querySelector('.option-one ul')
let btnOptionTow= document.querySelector('.option-tow button')
let gameMode= document.querySelector('.option-tow ul')
let playArea= document.querySelector('.body')
let header= document.querySelector('header')
btnOptionOne.addEventListener('click',_=>{
    liNumWin.classList.toggle('show')
})
btnOptionTow.addEventListener('click',_=>{
    gameMode.classList.toggle('show')
})



playArea.addEventListener('mousedown',_=>{
    gameMode.classList.remove('show')
    liNumWin.classList.remove('show')
    header.style.top='-100%'
    playArea.innerHTML=`<div class="player"></div>`
})
playArea.addEventListener('mousemove',e=>{
    let player=document.querySelector('.player')
    player?player.style=`top:${e.pageY}px;left:${e.pageX}px`:null;
})

playArea.addEventListener('mouseup',_=>{
    playArea.innerHTML=``
    header.style.top='0'
})
