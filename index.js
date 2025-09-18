const todoList = [{
    listName: '',
    listDate: ''
}]
const inputText = document.querySelector('.inputText')
const inputDate = document.querySelector('.inputDate')
const inputButton = document.querySelector('.trigger')
const displayList = document.querySelector('.display-to-do-1')

let draggedItem = null

displayHTML()
function displayHTML(){
    let pushHTML = ''
    for (let i = 0; i < todoList.length; i++){
        const name = todoList[i]
        const listName = name.listName
        const listDate = name.listDate
        const html = `
            <div class="list-item" draggable="true" data-index="${i}">
                <p>${listName}<span class="separation">${listDate}</span></p>
                <button onclick="
                    todoList.splice(${i}, 1);
                    displayHTML();
                " class="js-button">delete</button>
            </div>
            `
        pushHTML = pushHTML + html
    }
    displayList.innerHTML = pushHTML
    addDragEvents()
}
function getInputButton() {
    const inputtedValue = inputText.value
    const inputtedDate = inputDate.value
    todoList.push({
        listName: inputtedValue , 
        listDate: inputtedDate
    })
    inputText.value = ''
    displayHTML()
}
inputButton.addEventListener('click', getInputButton)

function addDragEvents() {
    const listItems = document.querySelectorAll('.list-item');

    listItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = e.target;
            // Add a class for visual feedback during dragging
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
        });

        item.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
            draggedItem = null;
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault(); // This is essential to allow a drop
            const afterElement = getDragAfterElement(displayList, e.clientY);
            if (afterElement == null) {
                displayList.appendChild(draggedItem);
            } else {
                displayList.insertBefore(draggedItem, afterElement);
            }
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.list-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

inputButton.addEventListener('click', getInputButton);

inputButton.forEach(

















)