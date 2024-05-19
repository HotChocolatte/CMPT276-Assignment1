// Global variable tracking the number of rows.
let numOfRow = 0;

// Adds a new row to the calculator.
function genNewRow() {
    // Increment the global numOfRow value.
    numOfRow = numOfRow + 1;

    // Declare the table.
    var table = document.getElementById("activityTable");

    // Create a new row.
    var row = table.insertRow(numOfRow);

    // Create cells.
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.id = "tableText";
    cell2.id = "tableText";

    // Declare cell 1.
    cell1.innerHTML = "Activity " + numOfRow;

    // Declare cell 1.
    cell2.innerHTML = "A" + numOfRow;
    
    // Declare cell 3; first input area.
    var newInput = document.createElement("input");
    newInput.type = "number";
    newInput.id = "weight"
    cell3.appendChild(newInput);

    // Declare cell 4; two inputs.
    var input1 = document.createElement("input");
    input1.type = "number";
    input1.id = "gradeNum"
    input1.addEventListener('input', updateCell5);

    var input2 = document.createElement("input");
    input2.type = "number";
    input2.id = "gradeDen"
    input2.addEventListener('input', updateCell5);
    
    cell4.appendChild(input1);
    cell4.appendChild(document.createTextNode(" / "));
    cell4.appendChild(input2);

    // Function to perform calculations upon cell 4 and output into cell 5.
    function updateCell5() {
        const val1 = parseFloat(input1.value) || 0;
        const val2 = parseFloat(input2.value) || 1;  // Avoid division by zero.
        
        var final = (val1 / val2) * 100;
        final = final.toPrecision(3)
        cell5.innerHTML = parseFloat(final);
        cell5.appendChild(document.createTextNode("%"));
    }
}

function weightedGrades(){
    var table = document.getElementById("activityTable");

    var sumOfGrades = 0;
    var sumOfWeight = 0;

    for(var i = 1; i <= numOfRow; i++){
        var row = table.rows[i];
        var cell3 = row.cells[2].getElementsByTagName("input")[0];
        var cell5 = row.cells[4];

        var val5 = parseFloat(cell5.innerHTML) || 0;
        var val3 = parseFloat(cell3.value) || 0;

        sumOfGrades += ((val5 / 100) * val3);
        sumOfWeight += val3;
    }

    var final = sumOfWeight ? (sumOfGrades / sumOfWeight) : 0;

    displayRes(final)
}

function meanOfGrades(){
    var table = document.getElementById("activityTable");

    var sumOfGrades = 0;

    for(var i = 1; i <= numOfRow; i++){
        var row = table.rows[i];
        var cell = row.cells[4];

        var val = parseFloat(cell.innerHTML) || 0;

        sumOfGrades += (val / 100);
    }

    final = sumOfGrades / numOfRow;

    displayRes(final)
}

function displayRes(number){
    var resultItem = document.getElementById("resultArea");

    var calc = number;

    calc = (calc * 100)

    calc = calc.toPrecision(3)
    resultItem.innerHTML = parseFloat(calc);
    resultItem.appendChild(document.createTextNode("/"));
    resultItem.appendChild(document.createTextNode("100"));
}

// Body code.
const addRowButton = document.getElementById("addRow");
addRowButton.addEventListener("click", genNewRow);

genNewRow();

const weightedButton = document.getElementById("weightedButton");
weightedButton.addEventListener("click", weightedGrades);

const meanButton = document.getElementById("meanButton");
meanButton.addEventListener("click", meanOfGrades);