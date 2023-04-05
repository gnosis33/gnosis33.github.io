let canvas;
const cellSize = 10;
let gridWidth;
let gridHeight;

let grid;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvas-container");
    resetGrid();
    frameRate(10);
}

function draw() {
  if (hasScreenSizeChanged()) {
    resizeCanvas(windowWidth, windowHeight);
    resetGrid(); 
  }
  background(220);
  displayGrid(grid);
  grid = updateGrid(grid);
}

function resetGrid() {
  gridWidth = Math.floor(width / cellSize);
  gridHeight = Math.floor(height / cellSize);
  grid = create2DArray(gridWidth, gridHeight);
  randomizeGrid(grid);
}

function hasScreenSizeChanged() {
  return (windowWidth !== width || windowHeight !== height);
}

function create2DArray(width, height) {
  let array = new Array(width);
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(height);
  }
  return array;
}

function randomizeGrid(grid) {
  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      grid[x][y] = Math.round(Math.random());
    }
  }
}

function displayGrid(grid) {
  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      if (grid[x][y] === 1) {
        let colorHue = map(x, 0, gridWidth, 0, 360); // Map x position to hue (0-360)
        colorMode(HSB);
        fill(colorHue, 255, 255); // Alive cell color
      } else {
        fill(0); // Dead cell color
      }
      noStroke(); // Remove cell border
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function updateGrid(grid) {
  const newGrid = create2DArray(gridWidth, gridHeight);

  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      const aliveNeighbors = countAliveNeighbors(grid, x, y);
      const currentState = grid[x][y];

      if (currentState === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
        newGrid[x][y] = 0; // Underpopulation or overpopulation
      } else if (currentState === 0 && aliveNeighbors === 3) {
        newGrid[x][y] = 1; // Reproduction
      } else {
        newGrid[x][y] = currentState; // Stable state
      }
    }
  }

  return newGrid;
}

function countAliveNeighbors(grid, x, y) {
  let count = 0;

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      if (xOffset === 0 && yOffset === 0) {
        continue; // Skip the cell itself
      }
      const neighborX = (x + xOffset + gridWidth) % gridWidth;
      const neighborY = (y + yOffset + gridHeight) % gridHeight;
      count += grid[neighborX][neighborY];
    }
  }

  return count;
}
