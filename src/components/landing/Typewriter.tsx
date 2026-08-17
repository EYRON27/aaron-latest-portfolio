import { useState, useEffect } from 'react';

export interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
  cursorColor?: string;
}

export const Typewriter = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  delay = 2000,
  cursorColor = '#f59e0b',
}: TypewriterProps) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[idx];
    const timer = setTimeout(() => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, -1));
        if (text.length <= 1) {
          setIsDeleting(false);
          setIdx((prev) => (prev + 1) % words.length);
        }
      } else {
        setText(currentWord.slice(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, idx, words, typingSpeed, deletingSpeed, delay]);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span>{text}</span>
      <span
        style={{
          display: 'inline-block',
          marginLeft: 3,
          color: cursorColor,
          fontWeight: 700,
          animation: 'blink 0.8s step-end infinite',
        }}
      >
        |
      </span>
    </span>
  );
};
