function spiralTraverse(matrix, startCorner, size) {
    let result = "";
    let currentRowStart = 0;
    let currentRowEnd = size - 1;
    let currentColStart = 0;
    let currentColEnd = size - 1;

    let order;
    switch(startCorner) {
        case "top-left":
            order = ["down", "right", "up", "left"];
            break;
        case "top-right":
            order = ["left", "down", "right", "up"];
            break;
        case "bottom-right":
            order = ["up", "left", "down", "right"];
            break;
        case "bottom-left":
            order = ["right", "up", "left", "down"];
            break;
    }

    let step = 0;
    while (currentRowStart <= currentRowEnd && currentColStart <= currentColEnd) {
        let direction = order[step % 4];

        switch(direction) {
            case "right":
                for (let i = currentColStart; i <= currentColEnd; i++) {
                    result += matrix[currentRowEnd][i];
                }
                currentRowEnd--;
                break;

            case "down":
                for (let i = currentRowStart; i <= currentRowEnd; i++) {
                    result += matrix[i][currentColStart];
                }
                currentColStart++;
                break;

            case "left":
                for (let i = currentColEnd; i >= currentColStart; i--) {
                    result += matrix[currentRowStart][i];
                }
                currentRowStart++;
                break;

            case "up":
                for (let i = currentRowEnd; i >= currentRowStart; i--) {
                    result += matrix[i][currentColEnd];
                }
                currentColEnd--;
                break;
        }
        step++;
    }

    return result;
}

const encryptedText = "од_ёовт_олаб_и_,алз_олркилсе_,ялеоа_ет_иллад,кбн___змв___ыи___ееоыеб_?" +
    "___чзвбсыс____с_т_л__неё_иасоивыгляделет_бы_не_сущч";

const size = Math.ceil(Math.sqrt(encryptedText.length));

let matrix = [];
let k = 0;
for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
        if (k < encryptedText.length) {
            matrix[i][j] = encryptedText[k++];
        } else {
            matrix[i][j] = '_';
        }
    }
}


let matrixStr = '';
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        matrixStr += matrix[i][j] + ',';
    }
    matrixStr += '\n';
}


console.log(matrixStr);
let str1 = spiralTraverse(matrix, "top-left", size);
let str2 = spiralTraverse(matrix, "top-right", size);
let str3 = spiralTraverse(matrix, "bottom-right", size);
let str4 = spiralTraverse(matrix, "bottom-left", size);

console.log("Результаты дешифровки:");
console.log("1: " + str1);
console.log("2: "  + str2);
console.log("3: " + str3);
console.log("4: " + str4);