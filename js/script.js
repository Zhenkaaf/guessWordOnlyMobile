const swiper = new Swiper('.swiper', {


    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    touchRatio: 0
});
let objData = {
    1: 'покушать',
    2: 'успокоил',
    3: 'стоящий',
    4: 'больше давай'
}
/* let long = document.querySelector('.longWord');
long.innerHTML = 'переверни телефон'; */
function shuffle(activeSlideID) {
    let array = objData[activeSlideID].split('');
    let originalWord = objData[activeSlideID].split('');
    let jumbledWord = array.sort(() => Math.random() - 0.5);
    if (jumbledWord == originalWord) {
        alert('если вдруг ты сразу увидишь загаданное слово,(буквы стоящие в правильной последовательностиб )сообщи мне об этом');
        return shuffle(activeSlideID);
    }
    return jumbledWord;
}

let butStart = document.querySelectorAll('.butStart');
for (let i = 0; i < butStart.length; i++) {
    butStart[i].addEventListener('click', start);
}
let butCheck = document.querySelectorAll('.butCheck')
for (let i = 0; i < butCheck.length; i++) {
    butCheck[i].addEventListener('click', checkWord);
}
//butStart.addEventListener('click', start);
function start() {
    let activeSlide = document.querySelector('.swiper-slide-active');
    let butCheck = document.querySelector('.swiper-slide-active .butCheck');
    let activeSlideID = activeSlide.getAttribute('id');
    let guessWord = shuffle(activeSlideID);
    appendTask(guessWord);
    //this.setAttribute('disabled', true);
    this.style.display = 'none';
    butCheck.style.display = 'block';
}



function checkWord() {
    let activeSlide = document.querySelector('.swiper-slide-active');
    let activeSlideID = activeSlide.getAttribute('id');
    let guessWord = shuffle(activeSlideID);
    let correctAnswer = objData[activeSlideID];
    let emptyArr = [];
    let boxRess = document.querySelector('.swiper-slide-active .boxRes');
    let childs = boxRess.children;


    let asd = document.querySelectorAll('.swiper-slide-active .noPlace')
    for (let i = 0; i < asd.length; i++) {
        asd[i].classList.remove('noPlace');
    }


    try {

        for (let i = 0; i < childs.length; i++) {
            let val = childs[i].children[0].value;
            emptyArr.push(val);
            // console.log(childs[i].children[0].value);
        }

    } catch (err) {
        alert('Эй! Нужно заполнить все пустые квадратики на нижней строке!');
        return;
    }

    let audio = document.getElementById('audio' + activeSlideID);

    let res = emptyArr.join('');
    if (res == correctAnswer) {
        alert('правильно))))');
        audio.style.display = 'block';
        this.style.display = 'none';
    }
    else {
        alert('ну что ты такое пишешь! ну нет же! не то(');
        let box = document.querySelector('.swiper-slide-active .wrap .box');
        const drag = document.querySelectorAll('.swiper-slide-active .drag');
        for (let i = 0; i < drag.length; i++) {
            drag[i].remove();
        }
        while (box.hasChildNodes()) {
            box.removeChild(box.firstChild);
        }
        let greenBox = document.querySelector('.swiper-slide-active .active');
        if (greenBox != null) {
            greenBox.classList.remove('active');
        }
        console.log(guessWord);
        for (let i = 0; i < guessWord.length; i++) {
            let word = document.createElement('div');
            let em = document.createElement('div');

            word.classList.add('drag');
            em.classList.add('empty');
            word.innerHTML = guessWord[i];
            word.value = guessWord[i];
            em.append(word);
            box.append(em);
        }
        wrapFn();
    }
}

function appendTask(guessWord) {

    let box = document.querySelector('.swiper-slide-active .wrap .box');
    let boxRes = document.querySelector('.swiper-slide-active .wrap .boxRes');
    for (let i = 0; i < guessWord.length; i++) {
        let word = document.createElement('div');
        let wordRes = document.createElement('div');
        let em = document.createElement('div');
        word.classList.add('drag');
        wordRes.classList.add('empty');
        em.classList.add('empty');
        word.innerHTML = guessWord[i];
        word.value = guessWord[i];
        em.append(word);
        box.append(em);
        boxRes.append(wordRes);
    }
    wrapFn();
}



function wrapFn() {

    const wrapper = document.querySelector('.swiper-slide-active .wrap');
    const empty = document.querySelectorAll('.swiper-slide-active .empty');
    const drag = document.querySelectorAll('.swiper-slide-active .drag');

    let startOffsetTop;
    let startOffsetLeft;
    let itemAppend;

    for (let i = 0; i < drag.length; i++) {
        drag[i].addEventListener('touchmove', dragMove);
        drag[i].addEventListener('touchend', dragDrop);
        drag[i].addEventListener('touchstart', touchStart);
    }

    function touchStart(event) {
        event.preventDefault();
        let drag = event.target;
        startOffsetTop = drag.offsetTop;
        startOffsetLeft = drag.offsetLeft; 
       
    }

    function dragMove(event) {
        event.preventDefault();
        let drag = event.target; 
        let touch = event.targetTouches[0];

        drag.style.top = `${touch.pageY - wrapper.offsetTop - (drag.offsetHeight / 2)}px`;
        drag.style.left = `${touch.pageX - wrapper.offsetLeft - (drag.offsetWidth / 2)}px`;

        empty.forEach(item => {
            if (
                drag.getBoundingClientRect().top + drag.offsetHeight / 2 < item.getBoundingClientRect().bottom &&
                drag.getBoundingClientRect().right - drag.offsetWidth / 2 > item.getBoundingClientRect().left &&
                drag.getBoundingClientRect().bottom - drag.offsetHeight / 2 > item.getBoundingClientRect().top &&
                drag.getBoundingClientRect().left + drag.offsetWidth / 2 < item.getBoundingClientRect().right
            ) {
                item.classList.add('active');
                itemAppend = item;
            }
            else {
                item.classList.remove('active');
            }
        })
    }

    function dragDrop() {
        if (itemAppend.hasChildNodes()) {
            this.style.top = startOffsetTop + 'px';
            this.style.left = startOffsetLeft + 'px';
        }
        else {
            itemAppend.append(this);
            this.style.top = `${itemAppend.offsetTop}px`;
            this.style.left = `${itemAppend.offsetLeft}px`;
            itemAppend.classList.add('noPlace');
        }
    }
}
let btnPrompt = document.querySelector('.butPrompt');
let firstLetter = document.querySelector('.firstLetter');
let lastLetter = document.querySelector('.lastLetter');
let prompts = document.querySelector('.prompts');
btnPrompt.addEventListener('click', promptTwoLetters);
function promptTwoLetters(event) {
    let activeSlide = document.querySelector('.swiper-slide-active');
    let activeSlideID = activeSlide.getAttribute('id');
    let word = objData[activeSlideID];
    firstLetter.innerHTML = `первая буква :  ${word[0]}`;
    lastLetter.innerHTML = `последняя буква :  ${word[word.length - 1]}`;
    //prompts.style.opacity = 1;
    prompts.style.visibility = 'visible';
    setTimeout(()=>{
        prompts.style.visibility = 'hidden';
        //prompts.style.opacity = 1;
    }, 2000);
    
}
