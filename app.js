let grid = document.querySelector(".grid");
const resultDisplay = document.querySelector('#result')
const timeLeftDisplay = document.querySelector('#time-left')
const startPauseButton = document.querySelector('#start-pause-button')

const gridWidth = 9

let squares = []
let leftLogIndexes = []
let rightLogsIndexes = []
let leftCarIndexes = []
let rightCarIndexes = []
let currentIndex = 76

let intervalId

function prepareGame() {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridWidth; j++) {
            let divElement = document.createElement("div");
            grid.appendChild(divElement)
            squares.push(divElement)

            if (i === 2 || i === 3) {
                divElement.classList.add('river')
            }

            if (i === 5 || i === 6) {
                divElement.classList.add('street')
            }

            if (i === 0 && j === 4) {
                divElement.classList.add('endingBlock')
            }

            if (i === 8 && j === 4) {
                divElement.classList.add('startingBlock')
            }
        }
    }

    squares[currentIndex].classList.add('frog')

    for (let i = 0; i < 3; i++) {
        squares[2 * 9 + i].classList.add('log')
        leftLogIndexes.push(2 * 9 + i)
        squares[2 * 9 + 5 + i].classList.add('log')
        leftLogIndexes.push(2 * 9 + 5 + i)

        squares[3 * 9 + 1 + i].classList.add('log')
        rightLogsIndexes.push(3 * 9 + 1 + i)
        squares[3 * 9 + 6 + i].classList.add('log')
        rightLogsIndexes.push(3 * 9 + 6 + i)
    }

    for (let i = 0; i < 2; i++) {
        squares[5 * 9 + i].classList.add('car')
        leftCarIndexes.push(5 * 9 + i)
        squares[5 * 9 + 5 + i].classList.add('car')
        leftCarIndexes.push(5 * 9 + 5 + i)

        squares[6 * 9 + 1 + i].classList.add('car')
        rightCarIndexes.push(6 * 9 + 1 + i)
        squares[6 * 9 + 6 + i].classList.add('car')
        rightCarIndexes.push(6 * 9 + 6 + i)
    }


}

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')

    switch (e.key) {
        case 'ArrowUp':
            if (currentIndex - gridWidth >= 0) {
                currentIndex -= gridWidth
            }
            break
        case 'ArrowDown':
            if (currentIndex + gridWidth < squares.length) {
                currentIndex += gridWidth
            }
            break
        case 'ArrowLeft':
            if (currentIndex % gridWidth !== 0) {
                currentIndex -= 1
            }
            break
        case 'ArrowRight':
            if ((currentIndex + 1) % gridWidth !== 0) { //8, 17, 26
                currentIndex += 1
            }
    }
    squares[currentIndex].classList.add('frog')

    checkCollisions()
}

function moveLogs() {
    //left logs
    leftLogIndexes.forEach(i => {
        squares[i].classList.remove('log')
    })

    leftLogIndexes = leftLogIndexes.map(i => {
        if (i % gridWidth === 0) {
            i += gridWidth
        }
        return i - 1;
    })

    leftLogIndexes.forEach(i => {
        squares[i].classList.add('log')
    })

    //right logs
    rightLogsIndexes.forEach(i => {
        squares[i].classList.remove('log')
    })

    rightLogsIndexes = rightLogsIndexes.map(i => {
        if ((i + 1) % gridWidth === 0) {
            i -= gridWidth
        }
        return i + 1;
    })

    rightLogsIndexes.forEach(i => {
        squares[i].classList.add('log')
    })
}

function moveCars() {
    //left cars
    leftCarIndexes.forEach(i => {
        squares[i].classList.remove('car')
    })

    leftCarIndexes = leftCarIndexes.map(i => {
        if (i % gridWidth === 0) {
            i += gridWidth
        }
        return i - 1;
    })

    leftCarIndexes.forEach(i => {
        squares[i].classList.add('car')
    })

    //right cars
    rightCarIndexes.forEach(i => {
        squares[i].classList.remove('car')
    })

    rightCarIndexes = rightCarIndexes.map(i => {
        if ((i + 1) % gridWidth === 0) {
            i -= gridWidth
        }
        return i + 1;
    })

    rightCarIndexes.forEach(i => {
        squares[i].classList.add('car')
    })
}

function checkCollisions() {
    if (isRiverCollision() || isStreetCollision()) {
        setTimeout(() => alert('YOU LOST!'), 1)
        clearInterval(intervalId)
        document.removeEventListener('keydown', moveFrog)
    }

    if (squares[currentIndex].classList.contains('endingBlock')) {
        setTimeout(() => alert('YOU WON!'), 1)
        clearInterval(intervalId)
        document.removeEventListener('keydown', moveFrog)
    }
}

function isRiverCollision() {
    return squares[currentIndex].classList.contains('river')
        && !squares[currentIndex].classList.contains('log')
}

function isStreetCollision() {
    return squares[currentIndex].classList.contains('street')
        && squares[currentIndex].classList.contains('car')
}

function gameLoop() {
    moveLogs()
    moveCars()
    checkCollisions()
}

prepareGame()
document.addEventListener('keydown', moveFrog)
intervalId = setInterval(gameLoop, 1000);
