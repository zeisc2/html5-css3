document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

// Add event listeners for the dropzone
const dropzone = document.getElementById('dropzone');
dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('drop', drop);
dropzone.addEventListener('dragleave', dragLeave);

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
    dropzone.classList.add('hover');
}

function dragLeave(event) {
    dropzone.classList.remove('hover');
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    dropzone.appendChild(draggableElement);
    dropzone.classList.remove('hover');
    alert('Dropped: ' + draggableElement.id);
}