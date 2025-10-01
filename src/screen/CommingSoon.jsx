import { Link } from 'react-router-dom';
import { GamepadIcon, Home, RotateCcw, Trophy } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Header from '../components/layout/Header';

const CommingSoonPage = () => {
  // Snake Game State
  const [gameBoard, setGameBoard] = useState([]);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('snakeHighScore')) || 0);
  const [gameOver, setGameOver] = useState(false);
  const snakeSpeed = 350;

  const BOARD_SIZE = 20;

  // Initialize game board
  useEffect(() => {
    const board = Array(BOARD_SIZE)
      .fill()
      .map(() => Array(BOARD_SIZE).fill(0));
    setGameBoard(board);
  }, []);

  // Generate random food position
  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  // Start game
  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameRunning(true);
    setGameOver(false);
  };

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 0, y: 0 });
    setScore(0);
    setGameRunning(false);
    setGameOver(false);
  };

  // Game loop
  useEffect(() => {
    if (!gameRunning) return;

    const gameInterval = setInterval(() => {
      setSnake((currentSnake) => {
        const newSnake = [...currentSnake];
        const head = { ...newSnake[0] };

        head.x += direction.x;
        head.y += direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
          setGameRunning(false);
          setGameOver(true);
          return currentSnake;
        }

        // Check self collision
        if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameRunning(false);
          setGameOver(true);
          return currentSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, snakeSpeed);

    return () => clearInterval(gameInterval);
  }, [gameRunning, direction, food, generateFood]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameRunning) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setDirection((prev) => (prev.y !== 1 ? { x: 0, y: -1 } : prev));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setDirection((prev) => (prev.y !== -1 ? { x: 0, y: 1 } : prev));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setDirection((prev) => (prev.x !== 1 ? { x: -1, y: 0 } : prev));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setDirection((prev) => (prev.x !== -1 ? { x: 1, y: 0 } : prev));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  // Render game cell
  const renderCell = (x, y) => {
    const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
    const isHead = snake[0] && snake[0].x === x && snake[0].y === y;
    const isFood = food.x === x && food.y === y;

    let cellClass = 'w-4 h-4 border border-project-200/30 ';

    if (isHead) {
      cellClass += 'bg-project-500 rounded-sm shadow-sm';
    } else if (isSnake) {
      cellClass += 'bg-project-400 rounded-sm';
    } else if (isFood) {
      cellClass += 'bg-danger-400 rounded-full animate-pulse';
    } else {
      cellClass += 'bg-project-100/50';
    }

    return <div key={`${x}-${y}`} className={cellClass} />;
  };

  return (
    <>
      <Header />
      <div className='from-project-100 to-project-200 flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br p-4 pt-24 text-center'>
        {/* Coming Soon Title */}
        <div className='mb-8'>
          <h1 className='text-project-500 mb-4 text-4xl font-bold md:text-6xl'>Coming Soon!!</h1>
          <p className='text-lg text-gray-600'>While you wait, enjoy this mini Snake game!</p>
        </div>

        {/* Game Container */}
        <div className='border-project-200 w-full max-w-lg rounded-2xl border bg-white/80 p-6 shadow-xl backdrop-blur-sm'>
          {/* Game Header */}
          <div className='mb-4 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <GamepadIcon className='text-project-400' size={24} />
              <h2 className='text-project-600 text-xl font-semibold'>Snake Game</h2>
            </div>
            <div className='flex items-center gap-4 text-sm'>
              <div className='flex items-center gap-1'>
                <span className='text-gray-600'>Score:</span>
                <span className='text-project-500 font-bold'>{score}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Trophy className='text-warning-400' size={16} />
                <span className='text-warning-400 font-bold'>{highScore}</span>
              </div>
            </div>
          </div>

          {/* Game Board */}
          <div className='bg-project-50 border-project-200 mb-4 rounded-lg border-2 p-4'>
            <div
              className='mx-auto grid gap-0'
              style={{
                gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                width: 'fit-content'
              }}
            >
              {gameBoard.map((row, y) => row.map((_, x) => renderCell(x, y)))}
            </div>
          </div>

          {/* Game Controls */}
          <div className='space-y-4'>
            {!gameRunning && !gameOver && (
              <button
                onClick={startGame}
                className='bg-project-400 hover:bg-project-500 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all duration-200 hover:scale-105'
              >
                <GamepadIcon size={20} />
                Start Game
              </button>
            )}

            {gameOver && (
              <div className='space-y-3 text-center'>
                <div className='text-danger-400 text-lg font-bold'>Game Over!</div>
                <div className='text-gray-600'>
                  Final Score: <span className='text-project-500 font-bold'>{score}</span>
                </div>
                {score === highScore && score > 0 && (
                  <div className='text-warning-400 font-medium'>🎉 New High Score!</div>
                )}
                <button
                  onClick={startGame}
                  className='bg-project-400 hover:bg-project-500 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all duration-200 hover:scale-105'
                >
                  <RotateCcw size={20} />
                  Play Again
                </button>
              </div>
            )}

            {gameRunning && (
              <div className='space-y-2 text-center'>
                <div className='text-success-400 font-medium'>Game Running...</div>
                <button
                  onClick={resetGame}
                  className='bg-secondary-200 hover:bg-secondary-300 text-secondary-400 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200'
                >
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>
            )}

            {/* Instructions */}
            <div className='bg-project-100/50 rounded-lg p-3 text-sm text-gray-600'>
              <div className='text-project-600 mb-2 font-medium'>How to play:</div>
              <div className='space-y-1'>
                <div>🎮 Use arrow keys to control the snake</div>
                <div>🍎 Eat the red food to grow and score points</div>
                <div>💀 Don&apos;t hit the walls or yourself!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className='mt-8 flex gap-4'>
          <Link
            to='/'
            className='bg-project-300 hover:bg-project-400 flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white no-underline transition-all duration-200 hover:scale-105'
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>

        {/* Fun Stats */}
        <div className='mt-6 text-sm text-gray-500'>🐍 Keep playing while we prepare something amazing for you!</div>
      </div>
    </>
  );
};

export default CommingSoonPage;
