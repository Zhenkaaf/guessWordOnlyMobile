const wrapper = document.querySelector('.wrapper');
const empty = document.querySelectorAll('.empty');
const drag = document.querySelectorAll('.drag');
const button = document.querySelector('.button')

button.addEventListener('click', checkWord);
for (let i = 0; i < drag.length; i++) {
    drag[i].addEventListener('touchmove', dragMove);
    drag[i].addEventListener('touchend', dragDrop);
}


let itemAppend;

function dragMove(event) {
    let drag = event.target;
    event.preventDefault();
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
    if (itemAppend.classList.contains('active')) {
        itemAppend.append(this);
        this.style.top = `${itemAppend.offsetTop}px`;
        this.style.left = `${itemAppend.offsetLeft}px`
    }
    else {
        this.style.top = `${itemAppend.offsetTop}px`;
        this.style.left = `${itemAppend.offsetLeft}px`
    }
}

function checkWord() {
    let arr = document.querySelectorAll('.res');
    let audio =  document.getElementById('planB');
    let newArr = [];
    let correctAnswer = 'kris';
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i].innerText);
    }
    let res = newArr.join('');
    if (res == correctAnswer) {
        alert('правильно))))');
       audio.style.display = 'block';
    }
    else {
        alert('не то(');
    }
    /*  let test = arr[1].childNodes;
     let test2 = test[0].innerHtml;
     console.log(test2); */
}
