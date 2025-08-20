const todoList = [{
    listName: '',
    listDate: ''
}]
const inputText = document.querySelector('.inputText')
const inputDate = document.querySelector('.inputDate')
const inputButton = document.querySelector('.trigger')

displayHTML()
function displayHTML(){
    let pushHTML = ''
    for (let i = 0; i < todoList.length; i++){
        const name = todoList[i]
        const listName = name.listName
        const listDate = name.listDate
        const html = `
            <p>
                ${listName} ${listDate}
                <button onclick="
                    todoList.splice(${i}, 1)
                    displayHTML()
                ">delete</button>
            </p>`
        pushHTML = pushHTML + html
    }
    document.querySelector('.display-to-do-1').innerHTML = pushHTML
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


