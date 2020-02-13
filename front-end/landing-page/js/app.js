window.onscroll = function() {popCard();topButton();navsec();};
window.onload = function() {mottoShower();navList();};

/** ENVIRONMENT ELEMENT **/
/* navbar > list */
function navList() {
    let getNav = document.getElementById('navbar');
    let unList = document.createElement('ul');
    let name = ['⌛ Timer', '👏 Merits', '📑 Steps', '☕ Break'];
    let link = ['#top', '#section_cards', '#section_steps', '#section_motto'];
    let list, tag, text;

    for( let i = 0; i < name.length; i++) {
        list = document.createElement('li');
        tag = document.createElement('a');
        text = document.createTextNode(name[i]);

        tag.setAttribute('href', link[i]);
        tag.appendChild(text);
        list.appendChild(tag);
        list.classList.add('nav');
        unList.appendChild(list);
    }
    getNav.appendChild(unList);
}

/* navbar > show direction */
function navsec() {
    let current = window.pageYOffset;
    let fix = 100; // fix scroll to section lenghth
    let secList = document.getElementsByClassName('section');
    let navList = document.getElementsByClassName('nav');

    for (let i = 0; i < secList.length; i++) {
        if( secList[i].offsetTop - fix < current && current < secList[i].offsetTop + secList[i].offsetHeight -fix) {
            navList[i].classList.add('active');
        } else {
            navList[i].classList.remove('active');
        }
    }
}

/* go to top button */
gototop = document.getElementById('gotop');
gototop.onclick = () => {
   document.body.scrollTop = 0; 
   document.documentElement.scrollTop = 0;
}

function topButton() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    gototop.style.display = 'block';
  } else {
    gototop.style.display = 'none';
  }
}

/** SECTION EFFECT **/
/* pop up section */
const cardSection = document.getElementById('section_cards');
let card = document.getElementsByClassName('card_menu');

const stepSection = document.getElementById('section_steps');
let step = document.getElementById('steps');

function popCard() {
    for(let one of card) {
        if (cardSection.offsetTop - window.pageYOffset  < 350) {
            one.style.left = '0';
        } else {
            one.style.left = '-1400px';
        }
    }
    if (window.pageYOffset - stepSection.offsetTop > -400) {
        step.classList.add('animated', 'bounceIn', 'slow');
    } else {
        step.classList.remove('animated', 'bounceIn', 'slow');
    }
}

/* toggle section*/
let tglBtn1 = document.getElementById('toggle1');
let tglBtn2 = document.getElementById('toggle2');

tglBtn1.onclick = () => {
    for( let one of card) {
        if (one.style.display === 'none') {
            one.style.display = 'block';
            tglBtn1.innerHTML = '<i class="far fa-minus-square"></i>';
            one.classList.add('animated', 'lightSpeedIn');
        } else {
            one.style.display = 'none';
            tglBtn1.innerHTML = '<i class="far fa-plus-square"></i>';
            one.classList.remove('animated', 'lightSpeedIn');
        }
    }
  }
tglBtn2.onclick = () => {
    if (step.style.display === 'none') {
        step.style.display = 'block';
        tglBtn2.innerHTML = '<i class="far fa-minus-square"></i>';
        step.classList.add('animated', 'bounceIn', 'slow');
    } else {
        step.style.display = 'none';
        tglBtn2.innerHTML = '<i class="far fa-plus-square"></i>';
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

/** TOMATO TIMER **/
/* add "0" tool */
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
  }

/* timer > main */
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

// status: start, pause, stop
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
        if( status === 1) { // if play
            timer--;
            count++;
            if (timer <= 0) { // if time up
                status = 0;
                clearInterval(timeId);
                timer = ctlTime;
                count = 0;
                record++;
                timerComplete();
                audioPlay();
            }
        } else if( status === 3 ) { // if stop
            status = 0;
            clearInterval(timeId);
            timer = ctlTime;
            count = 0;
        } 
        //display minute and second
        mins = parseInt( timer / 60, 10 );
        secs = parseInt( timer % 60, 10 );
        mins = addZero(mins); // add 0 if less than 10
        secs = addZero(secs); // add 0 if less than 10
        
        timerMin.textContent = mins;
        timerSec.textContent = secs;
    }
}

/* timer > duration controller */
let ctlUp = document.getElementById('ctl_up');
let ctlDown = document.getElementById('ctl_down');

ctlUp.onclick = function() { // add time
    if( status === 0 && ctlTime <= (60*59)) {
        ctlTime = ctlTime + 60; // one click plus one minute
        setCrl();
    }
}
ctlDown.onclick = function() { // subtract time
    if( status === 0 && ctlTime > 0 ) {
        ctlTime = ctlTime - 60; // one click minus one minute
        setCrl();
    }
}

function setCrl(){
    timer = ctlTime;
    mins = parseInt( timer / 60, 10);
    mins = addZero(mins); // add 0 if less than 10
    timerMin.textContent = mins;
}

/* timer > tracking record */
function timerComplete() {
    let ctlmins = ( ctlTime / 60 );
    let setTime = new Date();
    let hour = addZero(setTime.getHours());
    let minute = addZero(setTime.getMinutes());
    let node = document.createElement('div');
    let medal = `<img src="./img/medal.png" height="30" />`;
    let textnode = document.createTextNode(`#${record} at ${hour}:${minute}, with ${ctlmins} mins focus.`);
    let award = `<img src="./img/award.png" height="30" />`;

    // 4 times 1 round
    if( record % 4 == 0 ) {
        node.innerHTML = award;
    } else {
        node.innerHTML = medal;
    }
    node.appendChild(textnode);
    node.classList.add('tomato_record');
    document.getElementById('tomato_records').appendChild(node);
}

/* timer > notice sound */
function audioPlay(){
    bird.play();
}