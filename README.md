# Maze Escape - Navigate the rat to food!

I developed this game where the objective is to guide a rat through a challenging, randomly generated maze to reach its food. By utilizing the p5.js library, I optimized the rendering of graphics, enhancing overall interactivity. To elevate the user experience, I incorporated audio/sound effects using p5.sound.js, aiming for both visual appeal and engagement. In addition, I also utilized development tools such as **ESLint** (used for identifying and fixing coding mistakes, and for maintaining code quality), **Prettier** (used for clean and consistent code formatting), and **Husky** (used for automatically applying linting and formatting before each commit by utilizing pre-commit hook and lint-staged) to ensure code quality and adherence to best practices. This project showcases my proficiency in javascript, p5.js, Object-Oriented Programming (OOPs), and familiarity with various development tools for robust web project development.

## Quick Demo

- **Live link** - https://ankit-matth.github.io/maze-escape/ 


https://github.com/Ankit-Matth/maze-escape/assets/146843890/74964465-581c-4036-8c1b-4c7d35a8bc6a

I employed various built-in functions such as `setup(), draw(), keyPressed(), loadSound(), play(), stop(), etc.` provided by p5.js and p5.sound.js to develop this game and integrate audio into it. In the game, players have the task of guiding a rat to its food source using arrow keys or on-screen buttons. The game offers three difficulty levels - `"Easy," "Medium," and "Hard"` - giving players the choice of their preferred challenge level. To enhance the gaming experience, two buttons, **"Hint"** (providing guidance on the path from the rat to the food) and **"Solve"** (automatically guiding the rat through the maze to reach the food), introduce interactive elements and strategic options for players to explore and enjoy.

## Technologies Used

1. HTML, CSS, JavaScript
2. p5.js and p5.sound.js
3. Dev Tools: ESLint, Prettier, Husky

## Algorithms Used

1. **For Maze Generation**: To generate the maze, I've utilized the `Recursive Backtracking Algorithm`. This algorithm commences from the starting cell of the grid and explores as far as possible along each branch before backtracking. It recursively visits neighboring cells until it encounters a dead-end, backtracking when necessary. During this process, it eliminates walls between cells to create passages, resulting in a maze with a single possible path between any two cells. This process persists until all cells have been visited, resulting in a maze with a single path between the start (source cell) of the grid and the end (destination cell) of the grid.

2. **For Pathfinding**: To find a path from the player's position to the destination, I've employed the `recursive depth-first search (DFS) algorithm`. This algorithm explores the maze by recursively searching through each possible path until it locates the destination cell. This approach ensures that every cell is visited at most once and that the single path from the starting cell to the destination cell is discovered.

3. **For Path Highlighting**: After identifying the path, the code marks each cell in the path to visually indicate the solution. It accomplishes this by recursively traversing the path from the destination cell back to the starting cell, marking each cell along the way by setting the `isExistInPath` property to `true`.

4. **For Auto-Solution**: The auto-solving feature is implemented using timeouts and pathfinding. When the user clicks the "Solve" button, the code determines the path from the player's current position to the destination using the pathfinding algorithm. Then, it moves the player along the path at intervals using timeouts, simulating an automated solution process.

## Getting Started 

**Note:** *Make sure Node.js(npm) is installed before proceeding.*

Follow the steps below to install and run the project on your local machine.

**1. Clone this repository:**
  ```bash
  git clone https://github.com/Ankit-Matth/maze-escape
  ```

**2. Go to the project directory:**
  ```bash
  cd maze-escape
  ```
**3. Install dependencies:**
  ```bash
  npm install
  ```
**4. Start development server:**
  ```bash
  npm start
  ```
**5. Visit `http://127.0.0.1:3000/` to see the magic.**

### Additionally

**For formatting (Prettier):**
  ```bash
  npm run format
  ```
  
**For linting (ESLint):**
  ```bash
  npm run lint
  ```
