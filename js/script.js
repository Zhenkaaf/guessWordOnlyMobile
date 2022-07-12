const swiper = new Swiper('.swiper', {


    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    touchRatio: 0
});
let objData = {
    1: 'я',
    2: 'напомнить',
    3: 'снег',
    4: 'харькову',
    5: 'комплименты',
    6: 'о это мы с мамой',
    7: 'чужие',
    8: 'идеал',
    9: 'обруч',
    10: 'милашка',
    11: 'почтомата',
    12: 'в борще',
    13: 'чудо',
    14: 'мишки',
    15: 'слон',
    16: 'краб',
    17: 'крокодил',
    18: 'медведь',
    19: 'шедевр',
    20: 'крылья',
    21: 'гордон',
    22: 'кушать',
    23: 'картошка',
    24: 'убивают',
    25: 'молодец',
    26: 'анджелина джоли',
    27: 'это шо такое',
    28: 'волшебство',
    29: 'милая',
    30: 'будоражащая',
    31: 'рождество',
    32: 'кайфовать',
    33: 'бонифаций',
    34: 'догадливая',
    35: 'дубина',
    36: 'элис',
    37: 'мозг',
    38: 'умная',
    39: 'я гуляю',
    40: 'чудеса',
    41: 'пиво',
    42: 'никита литвинков',
    43: 'идеальная женщина',
    44: 'нет',
    45: 'ванная',
    46: 'авокадо',
    47: 'картошку',
    48: 'суп',
    49: 'да',
    50: 'суп',
    51: 'тюльпан',
    52: 'принца',
    53: 'мои',
    54: 'гриба',
    55: 'борщ',
    56: 'с зубами',
    57: 'сон',
    58: 'покушать',
    59: 'маразм',
    60: 'яблоко-груша',
    61: 'ломают голову',
    62: 'шоколадом',
}
let compliments = ['Молодец!',
                    'Умничка!',
                    'Как ты догадалась?',
                    'Умница!',
                    'Как тебе это удаётся?',
                    'Таки да!',
                    'Ну я прям не знаю, ты талантище!',
                    'Ты просто чемпион по разгадыванию!',
                    'Ты умеешь разгадывать загадки!',
                    'Восхищаюсь твоим умом!',
                    'Это была сложная загадка, но ты смогла!',
                    'Молодчинка!',
                    'Ты талантище!',
                    'Аплодирую стоя!',
                    'Восхищаюсь твоей сообразительностью!',
                    'Ты такая догадливая!',
                    'У меня просто нет слов!',
                    'Умничка!',
                    'Это была самая сложная загадка, но ты справилась!',
                    'У тебя талант разгадывать загадки!',
                    'Да, да, да!',
                    'Ну конечно же!',
                    'Бесспорно!',
                    'Абсолютно!',
                    'Умничка, молодец!'
                ];
/* let long = document.querySelector('.longWord');
long.innerHTML = 'переверни телефон'; */
function shuffle(activeSlideID) {
    let array = objData[activeSlideID].split('');
    let originalWord = objData[activeSlideID].split('');
    let jumbledWord = array.sort(() => Math.random() - 0.5);
    let strOriginalWord = originalWord.toString();
    let strJumbledWord = jumbledWord.toString();
    if (strOriginalWord.length == 1) {
        return jumbledWord;
    }
    if (strOriginalWord == strJumbledWord) {
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

/* let mql = window.matchMedia("(orientation: portrait)");
    // Прослушка события изменения ориентации
mql.addListener(function (m) {
    if ((document.querySelector('.swiper-slide-active .butCheck_longWord')) == true) {
        alert('try');
    }
    let butCheckActive = document.querySelector('.swiper-slide-active .butCheck_longWord');
    let butStartActive = document.querySelector('.swiper-slide-active .butStart');
    if (m.matches) {
        // Изменено на портретный режим
        butCheckActive.style.display = 'none';
        butStartActive.style.display = 'none';
    }
    else {
        // Изменено на горизонтальный режим
        butCheckActive.style.display = 'block';
    }
}); */
let audioNo = document.getElementById('no');
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
        let randomCompliment = Math.floor(Math.random() * compliments.length);
        alert(`${compliments[randomCompliment]}
        правильно!)`);
        audio.style.display = 'block';
        this.style.display = 'none';
    }
    else {
        audioNo.play(); 
        alert('Эй, ну нет!)');
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
