// It's usually preferred to have helper separately, but since the project is small,it's been included in the src directory

const TileType = {
  EMPTY: 0,
  SHIP: 1,
  // BUFFER indicates the space surrounding a ship
  BUFFER: 2,
  HIT: 3,
  MISS: 4,
};

const Direction = {
  Vertical: Symbol('Vertical'),
  Horizontal: Symbol('Horizontal'),
};

function create2DArray(initialValue = 0, rows = 10, cols = 10) {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < cols; j++) {
      arr[i][j] = initialValue;
    }
  }
  return arr;
}

// This function is used to verify the expected & received values are same in the unit test
function fillSpecificValues(shipLen, row, col, direction) {
  let inputRow = row - 1;
  let inputCol = col - 1;

  const arr = create2DArray();
  let counter = 0;
  const dr = direction === Direction.Vertical ? 1 : 0;
  const dc = direction === Direction.Horizontal ? 1 : 0;
  while (counter++ < shipLen) {
    arr[inputRow][inputCol] = TileType.SHIP;
    inputRow += dr;
    inputCol += dc;
  }
  // `row - 1` & `col - 1` to match the index
  fillInBuffer(arr, shipLen, row - 1, col - 1, direction);
  return arr;
}

function fillInBuffer(arr, shipLen, row, col, direction) {
  // row before; row after;
  // col before; col after;
  let counter = 0;
  let temp1, temp2;

  if (direction === Direction.Horizontal) {
    const aboveRow = row - 1;
    const belowRow = row + 1;
    const startCol = col - 1;
    const endCol = col + shipLen;

    temp1 = startCol;
    temp2 = startCol;
    // Fill buffer row-wise
    // `shipLen + 2` 'cause I'm filling the diagonal tiles in the same logic
    while (counter++ < shipLen + 2) {
      if (arr[aboveRow]?.[temp1] === TileType.EMPTY) {
        arr[aboveRow][temp1++] = TileType.BUFFER;
      }
      if (arr[belowRow]?.[temp2] === TileType.EMPTY) {
        arr[belowRow][temp2++] = TileType.BUFFER;
      }
    }

    // Fill buffer in cols
    if (arr[row]?.[startCol] === TileType.EMPTY) {
      arr[row][startCol] = TileType.BUFFER;
    }
    if (arr[row]?.[endCol] === TileType.EMPTY) {
      arr[row][endCol] = TileType.BUFFER;
    }
  } else if (direction === Direction.Vertical) {
    const startRow = row - 1;
    const endRow = row + shipLen;
    const leftCol = col - 1;
    const rightCol = col + 1;

    temp1 = startRow;
    temp2 = startRow;
    counter = 0;
    // Fill the sides of vertical ship w buffer along the ship length & diagonally
    while (counter++ < shipLen + 2) {
      if (arr[temp1]?.[leftCol] === TileType.EMPTY) {
        arr[temp1++][leftCol] = TileType.BUFFER;
      }
      if (arr[temp2]?.[rightCol] === TileType.EMPTY) {
        arr[temp2++][rightCol] = TileType.BUFFER;
      }
    }

    // Buffer the tile above & below the ship
    if (arr[startRow]?.[col] === TileType.EMPTY) {
      arr[startRow][col] = TileType.BUFFER;
    }
    if (arr[endRow]?.[col] === TileType.EMPTY) {
      arr[endRow][col] = TileType.BUFFER;
    }
  }
}

function print2DArray(arr) {
  process.stdout.write('--- Looking at the beautiful array ---\n');
  for (const row of arr) {
    process.stdout.write(row + '\n');
  }
}

export {
  create2DArray,
  fillInBuffer,
  fillSpecificValues,
  Direction,
  TileType,
  print2DArray,
};
