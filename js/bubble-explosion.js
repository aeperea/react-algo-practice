// Solution steps
// Find all “eligible” cells — cells that have at least 2 neighbors (up/down/left/right) with the same color.
// Mark cells to be removed:
// Every eligible cell is marked.
// Every neighbor of that eligible cell with the same color is also marked.
// All marks are based on the original board (no mid-step updates).
// Remove all marked cells at once (set them to 0).
// Apply gravity column by column so all non-zero bubbles “fall” down, and empty spaces are filled with 0 from the top.

// Supositions: all bubbles have a color

export default function bubbleExplosion(matrix) {
  // n x m matrix
  const n = matrix.length;
  const m = matrix[0].length;

  const eligibilityMatrix = Array.from({length: n}, () => Array(m).fill(false));

  // Find all coordinates that are to explode
  for (let rowIndex = 0; rowIndex < n; rowIndex++) {
    for (let columnIndex = 0; columnIndex < m; columnIndex++) {
      const color = matrix[rowIndex][columnIndex];
      let sameColorCount = 0;

      const upIndex = rowIndex - 1;
      const rightIndex = columnIndex + 1;
      const downIndex = rowIndex + 1;
      const leftIndex = columnIndex - 1;

      // up
      if (upIndex >= 0 && upIndex < n && matrix[upIndex][columnIndex] === color) {
        sameColorCount++;
      }
      // right
      if (rightIndex >= 0 && rightIndex < m && matrix[rowIndex][rightIndex] === color) {
        sameColorCount++;
      }
      // down
      if (downIndex >= 0 && downIndex < n && matrix[downIndex][columnIndex] === color) {
        sameColorCount++;
      }
      // left
      if (leftIndex >= 0 && leftIndex < m && matrix[rowIndex][leftIndex] === color) {
        sameColorCount++;
      }

      if (sameColorCount >= 2) {
        eligibilityMatrix[rowIndex][columnIndex] = true;
      }
    }
  }

  // console.log('initial Matrix')
  // console.table(matrix)
  // console.log('eligibilityMatrix')
  // console.table(eligibilityMatrix)

  const markedMatrix = Array.from({length: n}, () => Array(m).fill(false));

  // Update matrix with exploded elements
  for (let rowIndex = 0; rowIndex < n; rowIndex++) {
    for (let columnIndex = 0; columnIndex < m; columnIndex++) {
      if (eligibilityMatrix[rowIndex][columnIndex]) {
        const rowUpIndex = rowIndex - 1;
        const columnRightIndex = columnIndex + 1;
        const rowDownIndex = rowIndex + 1;
        const columnLeftIndex = columnIndex - 1;

        if (rowUpIndex >= 0) {
          markedMatrix[rowUpIndex][columnIndex] = true;
          matrix[rowUpIndex][columnIndex] = 0;
        }
        if (columnRightIndex < m) {
          markedMatrix[rowIndex][columnRightIndex] = true;
          matrix[rowIndex][columnRightIndex] = 0;
        }
        if (rowDownIndex < n) {
          markedMatrix[rowDownIndex][columnIndex] = true;
          matrix[rowDownIndex][columnIndex] = 0;
        }
        if (columnLeftIndex >= 0) {
          markedMatrix[rowIndex][columnLeftIndex] = true;
          matrix[rowIndex][columnLeftIndex] = 0;
        }
        markedMatrix[rowIndex][columnIndex] = true;
        matrix[rowIndex][columnIndex] = 0;
      }
    }
  }

  // console.table(markedMatrix)

  return applyGravity(matrix);
}

function applyGravity(matrix) {
  const n = matrix.length;
  const m = matrix[0].length;

  for (let columnIndex = 0; columnIndex < m; columnIndex++) {
    let writeRow = n - 1

    for (let rowIndex = n - 1; rowIndex >= 0; rowIndex--) {
      if (matrix[rowIndex][columnIndex] !== 0) {
        matrix[writeRow][columnIndex] = matrix[rowIndex][columnIndex];
        if (writeRow !== rowIndex) {
          matrix[rowIndex][columnIndex] = 0;
        }
        writeRow--;
      }
    }

    for (let rowIndex = writeRow; rowIndex >= 0; rowIndex--) {
      matrix[rowIndex][columnIndex] = 0;
    }
  }

  // console.log('matrix')
  // console.table(matrix);

  return matrix;
}

// const bubbles = [[3, 1, 2, 1], [1, 1, 1, 4], [3, 1, 2, 2], [3, 3, 3, 4]];
// const solution = [
//   [0, 0, 0, 1],
//   [0, 0, 0, 4],
//   [0, 0, 2, 2],
//   [3, 0, 2, 4],
// ];
// bubbleExplosion(bubbles);

// console.log('solution')
// console.table(solution)
