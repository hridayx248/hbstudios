import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * DecryptedText component that creates a decryption effect for text.
 * 
 * @param {string} text - The text to be displayed.
 * @param {number} speed - The speed of the decryption effect.
 * @param {number} maxIterations - The number of iterations before the final character is revealed.
 * @param {boolean} sequential - Whether the decryption should be sequential.
 * @param {string} revealDirection - The direction of the reveal (start, end, center).
 * @param {boolean} useOriginalCharsOnly - Whether to use only the original characters for the effect.
 * @param {string} characters - The characters to be used for the effect.
 * @param {string} className - The CSS class for the component.
 * @param {string} encryptedClassName - The CSS class for the encrypted characters.
 * @param {string} parentClassName - The CSS class for the parent container.
 * @param {boolean} animateOn - When to start the animation (view, hover).
 */
export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover', // 'view', 'hover'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let iteration = 0;

    const startAnimation = () => {
      setIsRevealing(true);
      iteration = 0;
      
      interval = setInterval(() => {
        setDisplayText((prevText) =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / maxIterations) return text[index];
              
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        iteration++;

        if (iteration >= text.length * maxIterations) {
          setDisplayText(text);
          setIsRevealing(false);
          setHasAnimated(true);
          clearInterval(interval);
        }
      }, speed);
    };

    if (animateOn === 'view' && !hasAnimated) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }

    if (animateOn === 'hover' && isHovering && !isRevealing) {
      startAnimation();
    }

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, characters, isHovering, animateOn, hasAnimated, isRevealing]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <span className={className}>
        {displayText.split('').map((char, index) => {
          const isRevealed = isRevealing ? index < (displayText.length * (displayText.indexOf(char) / displayText.length)) : true;
          return (
            <span
              key={index}
              className={char !== text[index] ? encryptedClassName : ''}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
