
// how to create rows and columns of 2d arrays with numbers...
const generateRow = (numCols) => {
    const arr = [];
    for(let i = 0; i < numCols; i++) {
        arr[i] = i;
    }

    return arr;
};

const generateGrid = (numRows, numCols) => {
    const arr = [];
    for(let i = 0; i < numRows; i++) {
        arr.push(generateRow(numCols));
    }

    return arr;
}

console.log(generateGrid(4, 4));
