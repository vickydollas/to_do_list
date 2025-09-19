const todoList = [{
    listName: '',
    listDate: ''
}]
const inputText = document.querySelector('.inputText')
// const inputDate = document.querySelector('.inputDate')
const inputButton = document.querySelector('.trigger')
const displayList = document.querySelector('.display-to-do-1')
let draggedItem = null

displayHTML()
function displayHTML(){
    let pushHTML = ''
    for (let i = 0; i < todoList.length; i++){
        const name = todoList[i]
        const listName = name.listName
        // const listDate = name.listDate
        const html = `
            <div class="list-item" draggable="true" data-index="${i}">
                <p>${listName}</p>
                <div>
                    <img src="./images/delete.svg" onclick="
                    todoList.splice(${i}, 1);
                    displayHTML();
                " class="js-button">
                    <img src="./images/edit.svg" onclick="
                    editItem(${i})
                "
                    class="js-button-1">
                </div>
            </div>
            `
        pushHTML = pushHTML + html
    }
    displayList.innerHTML = pushHTML
    addDragEvents()
}
function editItem(index) {
    const item = document.querySelector(`[data-index="${index}"]`);
    const originalText = todoList[index].listName;
    
    // Replace the paragraph with an input field
    item.innerHTML = `
        <input type="text" class="edit-input" value="${originalText}">
        <div>
            <img src="./images/save.svg" onclick="saveEdit(${index})" class="js-button-1">
            <img src="./images/delete.svg" onclick="todoList.splice(${index}, 1); displayHTML();" class="js-button">
        </div>
    `;
    
    // Set focus on the input field for immediate editing
    item.querySelector('.edit-input').focus();
}

function saveEdit(index) {
    const editedInput = document.querySelector(`[data-index="${index}"] .edit-input`);
    const newValue = editedInput.value;

    if (newValue) {
        todoList[index].listName = newValue;
        displayHTML(); // Re-render the list with the new value
    }
}

function getInputButton() {
    const inputtedValue = inputText.value
    todoList.push({
        listName: inputtedValue
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