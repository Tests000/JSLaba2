"use strict";

const data = {
    timer: document.getElementById('timer'),
    cells: [],
    lvlNumber: 1,
    curValue: 0,
    points: 0
};

function startTimer() {
    resetTimer();
    initializeGridButton();
    initCells();
    data.timerId = setTimeout(function tick() {
        data.timer.value -= 1;
        if (data.timer.value <= 0) {
            resetTimer();
            alert('Игра окончена\n' + data.points);
            data.points = 0;
            data.lvlNumber = 1;
            return;
        }
        data.timerId = setTimeout(tick, 150);
    }, 150);
}

function getIntRandomValue() {
    return Math.floor(Math.random() * data.cells.length);
}

function shuffle(arr) {
    return arr.sort(() => Math.random() > 0.5 ? 1 : -1);
}

//переписать
function initializeGridButton() {
    shuffle(data.cells)
        .slice(0, getMaxValueLvl())
        .map((elem, index) => elem.value = index + 1);
}

function getMaxValueLvl() {
    return data.lvlNumber + 3;
}


function setTable() {
    data.cells = Array.from(document.getElementsByClassName('button'));
}

function initCell(element) {
    element.onclick = () => {
        if ((data.curValue + 1).toString() === element.value) {
            data.curValue += 1;
            element.value = "";
            data.points += 1;
            if (data.curValue === getMaxValueLvl()) {
                data.lvlNumber += 1;
                if (data.lvlNumber > 6) {
                    data.lvlNumber = 1;
                    resetTimer();
                    alert('Победа\n' + data.points);
                    return;
                }
                startTimer();
            }
            return;
        }
        resetTimer();
        alert('Игра окончена\n' + data.points);
        data.lvlNumber = 1;
    };
}

function initCells() {
    data.cells.forEach(element => initCell(element));
}

function initPlayButton() {
    setTable();
    let playButton = document.getElementById('play')
    playButton.onclick = () => {
        startTimer();
        data.points = 0;
    }
}

function resetTimer() {
    clearTimeout(data.timerId);
    data.curValue = 0;
    data.timer.value = 150;
    data.cells.forEach(element => {
        element.value = "";
        element.onclick = () => { }
    });
}

function main() {
    initPlayButton();
}

main();