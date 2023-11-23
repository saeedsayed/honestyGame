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



playArea.addEventListener('touchmove',e=>{
    let top = e.touches[0].pageY
    let left = e.touches[0].pageX

    gameMode.classList.remove('show')
    liNumWin.classList.remove('show')
    header.style.top='-100%'
    playArea.innerHTML=`<div class="player" style='top:${top}px;left:${left}px'></div>`
})

playArea.addEventListener('touchend',_=>{
    playArea.innerHTML=``
    header.style.top='0'
})
