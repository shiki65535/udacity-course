window.onscroll = function() {popCard();};
window.onload = function() {mottoShower();};

/* section effect */
function popCard() {
    const cardSection = document.getElementById('section_cards');
    const cardLocation = cardSection.offsetTop;
    let card = document.getElementsByClassName('card_menu');

    for(let i = 0; i < card.length; i++) {
        if (cardLocation - window.pageYOffset  < 250) {
            card[i].style.left = '0';
        } else {
            card[i].style.left = '-1400px';
        }
    }

    const stepSection = document.getElementById('section_steps');
    const stepLocation = stepSection.offsetTop;
    let step = document.getElementById('steps');

    if (window.pageYOffset - stepLocation > -200) {
        step.classList.add('animated', 'bounceIn', 'slow');
    } else {
        step.classList.remove('animated', 'bounceIn', 'slow');
    }
}


/* break time message */
function mottoShower() {
    const mottoQuotes = [
        'Your limitation—it’s only your imagination.',
        'Sometimes later becomes never. Do it now.',
        'Dream it. Wish it. Do it.',
        'Don’t stop when you’re tired. Stop when you’re done.',
        'Wake up with determination. Go to bed with satisfaction.',
        'Little things make big days.',
        'The key to success is to focus on goals, not obstacles.',
    ]
    let mottoIndex = Math.floor(Math.random()*mottoQuotes.length);

    document.getElementById('motto').textContent = mottoQuotes[mottoIndex];
}

/* Tomato Timer */
let timerMin = document.getElementById('timer_min');
let timerSec = document.getElementById('timer_sec');
let start = document.getElementById('btn_start');
let pause = document.getElementById('btn_pause');
let stop = document.getElementById('btn_stop');
let bird= document.getElementById('bird');
let endTime = 25*60;
let ctlTime = endTime;
let record = 0;
let count = 0;
let status = 0;
let mins, secs;
let timer = endTime - count;

function audioPlay(){
    bird.play();
}

start.onclick = function() {
    if(!status) {
        status = 1;
        startTimer();
    }else{
        status = 1;
    }
}

pause.onclick = function() {
    status = 2;
};

stop.onclick = function() {
    status = 3;
};

function startTimer() {
    let timeId = setInterval(tomato, 1000);
    timer = ctlTime - count;

    function tomato() {
        if( status === 1) {
            timer--;
            count++;
            if (timer <= 0) {
                status = 0;
                clearInterval(timeId);
                timer = ctlTime;
                count = 0;
                record++;
                timerComplete();
                audioPlay();
            }
        } else if( status === 3 ) {
            status = 0;
            clearInterval(timeId);
            timer = ctlTime;
            count = 0;
        } 
        mins = parseInt( timer / 60, 10 );
        secs = parseInt( timer % 60, 10 );

        mins = mins < 10 ? `0${mins}` : mins;
        secs = secs < 10 ? `0${secs}` : secs;
        
        timerMin.textContent = mins;
        timerSec.textContent = secs;
    }
}

/* controller */
let ctlUp = document.getElementById('ctl_up');
let ctlDown = document.getElementById('ctl_down');

ctlUp.onclick = function() {
    if( status === 0 && ctlTime <= (60*59)) {
        ctlTime = ctlTime + 60;
        setCrl()        
    }
}
ctlDown.onclick = function() {
    if( status === 0 && ctlTime > 0 ) {
        ctlTime = ctlTime - 60;
        setCrl()
    }
}
function setCrl(){
    timer = ctlTime;
    mins = parseInt( timer / 60, 10);
    mins = mins < 10 ?  `0${mins}` : mins;
    timerMin.textContent = mins;
}

/* tracking timer */
function timerComplete() {
    let ctlmins = ( ctlTime / 60 );
    let setTime = new Date();
    let hour = addZero(setTime.getHours());
    let minute = addZero(setTime.getMinutes());
    let node = document.createElement('div');
    let medal = `<img src="./img/medal.png" height="30" />`;
    let textnode = document.createTextNode(`#${record} at ${hour}:${minute}, with ${ctlmins} mins focus.`);
    let award = `<img src="./img/award.png" height="30" />`;

    if( record % 4 == 0 ) {
        node.innerHTML = award;
    } else {
        node.innerHTML = medal;
    }
    node.appendChild(textnode);
    node.classList.add('tomato_record');
    document.getElementById('tomato_records').appendChild(node);
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  }