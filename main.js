//holes
const $$holes = document.querySelectorAll('.hole');


//moles
const $$moles = document.querySelectorAll('.mole')

//score
const $$score = document.querySelector('.score');

//endgame
let endGame = false;

//score
let score = 0;

//lastHole
let lastHole;


//retorna un numero aleatorio entre el min(incluido) y max(incluido)
const timeRandom = (max,min) => {
    return Math.random() * (max - min) + min;
}


//randomHole 
const randomHole = ($$holes)=>{
    let n = Math.floor(Math.random()* $$holes.length);
    const hole = $$holes[n];
    
    if(hole === lastHole){
        return randomHole($$holes);
    }
    lastHole = hole;
    return hole;
}

//timeRandom hole

const timeHoleRandom = ()=>{

    const hole = randomHole($$holes);
    const time = timeRandom(1000,500);
    hole.classList.add('up')
    setTimeout(()=>{
        hole.classList.remove('up');
        if(!endGame){
            timeHoleRandom();
        }
    }, time);

}

function startGame() {
    $$score.textContent = 0;
    endGame = false;
    score = 0;
    timeHoleRandom();
    setTimeout(() => endGame = true, 15000) //show random moles for 15 seconds
}

const wack = (e) => {
    if(!e.isTrusted) return; 
    //lineas que se ejecutan si el click es correcto
    score++;
    e.target.parentNode.classList.remove('up');
    $$score.textContent =score;
}

$$moles.forEach((mole)=>{
    mole.addEventListener('click', wack)
})