const zona1 = document.querySelector('.letters');
const resitem1 = document.querySelector('.resitem');
const item1 = document.querySelector('.item');

resitem1.ondragover = allowDrop;

function allowDrop(event) {
    event.preventDefault();
}

item1.ondragstart = drag;
function drag(event) {
    event.dataTransfer.setData('id', event.target.id);
}

resitem1.ondrop = drop;
function drop(event) {
    let itemId = event.dataTransfer.getData('id');
    event.target.append(document.getElementById(itemId));
}
