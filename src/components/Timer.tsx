import { useState, useEffect, useCallback, useRef } from 'react';
import './Timer.css';

// Props for the Timer component
interface TimerProps {
  title: string;      // The title of the timer
  endTime: number;    // Total duration of the timer in seconds
  elapsedTime?: number; // Optional: Initial elapsed time
}

const Timer = ({ title, endTime, elapsedTime = 0 }: TimerProps) => {

  // State variables
  const [time, setTime] = useState(elapsedTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [points, setPoints] = useState(99);
  const [level, setLevel] = useState(1);

  // Refs for managing audio and animations
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationTimeoutRef = useRef<number | null>(null);
  const countingAudioRef = useRef<HTMLAudioElement | null>(null);

  // Constants for the circular progress bar
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progressPercentage = (time / endTime) * 100;
  const progressStroke = circumference - (progressPercentage / 100) * circumference;

  // Initializing audio and validate end time
  useEffect(() => {
    if (endTime > 3599) {
      throw new Error('Timer supports a maximum of 59 minutes and 59 seconds');
    }
    countingAudioRef.current = new Audio('/counting.mp3');
  }, [endTime]);

  // Formating seconds to MM:SS as per requirement
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculating time left
  const calculateTimeLeft = useCallback(() => {
    return Math.max(0, endTime - time);
  }, [endTime, time]);

  // Main timer logic
  useEffect(() => {
    if (isRunning && time < endTime) {
      const timeout = setTimeout(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          const timeLeft = endTime - newTime;

          // Playing counting audio in the last 10 seconds
          if (timeLeft <= 10 && countingAudioRef.current) {
            if (countingAudioRef.current.paused) {
              countingAudioRef.current.currentTime = 10 - timeLeft;
              countingAudioRef.current.play();
            }
          }

          // Handling timer completion
          if (newTime >= endTime) {
            setAnimationActive(true);
            setIsRunning(false);
            setIsCompleted(true);
            
            if (audioRef.current) {
              audioRef.current.play();
            }

            // Stopping animation after 5 seconds
            animationTimeoutRef.current = window.setTimeout(() => {
              setAnimationActive(false);
            }, 5000);
          }
          return newTime;
        });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isRunning, time, endTime]);

  // Timer control handling functions
  const handleStart = () => {
    setIsRunning(true);
    const timeLeft = calculateTimeLeft();
    if (timeLeft <= 10 && countingAudioRef.current) {
      countingAudioRef.current.currentTime = 10 - timeLeft;
      countingAudioRef.current.play();
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    if (countingAudioRef.current) {
      countingAudioRef.current.pause();
    }
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setIsCompleted(false);
    setAnimationActive(false);
    setShowCongrats(false);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    if (countingAudioRef.current) {
      countingAudioRef.current.pause();
      countingAudioRef.current.currentTime = 0;
    }
  };

  // Keyboard shortcuts to access timer controls - play, pause and reset
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      switch (event.key.toLowerCase()) {
        case 's': handleStart(); break;
        case 'p': handlePause(); break;
        case 'r': handleReset(); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // handling points and level up - once points for particular level is greater than 100 then -> Next level
  useEffect(() => {
    if (isCompleted) {
      const earnedPoints = Math.floor(endTime / 60);
      setPoints(prevPoints => {
        const newPoints = prevPoints + earnedPoints;
        const newLevel = Math.floor(newPoints / 100) + 1;
        
        if (newLevel !== level) {
          setLevel(newLevel);
          setShowCongrats(true);
          setTimeout(() => setShowCongrats(false), 5000);
        }
        
        return newPoints;
      });
    }
  }, [isCompleted, endTime, level]);

  return (
    <div className="timer">
      <h2 className="timer-title">{title}</h2>
      {/* Circular progress bar */}
      <div className="timer-circle">
        <svg className="progress-ring" width="200" height="200">
          {/* Background circle */}
          <circle
            className={`progress-ring__circle ${animationActive ? 'alternating-color' : ''}`}
            stroke="#545576"
            strokeWidth="20"
            fill="transparent"
            r={radius}
            cx="100"
            cy="100"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: 0,
            }}
          />
          {/* Progress circle */}
          <circle
            className={`progress-ring__circle ${animationActive ? 'alternating-color' : ''}`}
            stroke="#67cb88"
            strokeWidth="20"
            fill="transparent"
            r={radius}
            cx="100"
            cy="100"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: progressStroke,
              transition: 'stroke-dashoffset 0.35s',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>
        <div className="timer-display">
          <div className="time">{formatTime(calculateTimeLeft())}</div>
          <div className="time-left">{formatTime(calculateTimeLeft())} left</div>
        </div>
      </div>
      {/* Timer controls */}
      <div className="timer-controls">
        <button onClick={handleStart} disabled={isRunning || isCompleted}>Start</button>
        <button onClick={handlePause} disabled={!isRunning}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {/* added Gamification */}
      <div className="gamification-info">
        <p>Level: {level}</p>
        <p>Points: {points}</p>
      </div>
      {/* Congratulations message */}
      {showCongrats && (
        <div className="congrats-message">
          <span>Congratulations! You've reached level <span className="congrats-message-level-text"> {level} </span>!</span>
        </div>
      )}
    </div>
  );
};

export default Timer;