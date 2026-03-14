import { useEffect, useRef, useState } from 'react';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const getRandomChar = () => ALPHABETS[Math.floor(Math.random() * 26)];

const HyperText = ({ text, duration = 800, className = '', animateOnLoad = true }) => {
  const [displayText, setDisplayText] = useState(text.split(''));
  const [trigger, setTrigger] = useState(false);
  const iterations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    iterations.current = 0;
    setTrigger((t) => !t);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }

      if (iterations.current < text.length) {
        setDisplayText(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i <= iterations.current) return char;
            return getRandomChar();
          })
        );
        iterations.current += 0.1;
      } else {
        setDisplayText(text.split(''));
        clearInterval(interval);
      }
    }, duration / (text.length * 10));

    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  return (
    <span
      className={className}
      onMouseEnter={triggerAnimation}
      style={{ flexWrap: 'wrap', cursor: 'default' }}
    >
      {displayText.map((letter, i) => (
        <span key={i} style={letter === ' ' ? { width: '0.35em' } : undefined}>
          {letter}
        </span>
      ))}
    </span>
  );
};

export default HyperText;
