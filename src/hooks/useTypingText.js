import { useEffect, useState } from 'react';

const TYPE_MS = 75;
const DELETE_MS = 35;
const HOLD_MS = 2400;
const NEXT_PHRASE_MS = 400;

/**
 * useTypingText 훅
 * 여러 문구를 한 글자씩 입력했다가 지우며 차례로 보여주는 타이핑 효과입니다.
 * @param {Array} phrases - 차례로 보여줄 문구 배열 (렌더링마다 바뀌지 않는 상수 배열이어야 함)
 * @param {boolean} isPaused - true 인 동안에는 글자가 멈춥니다 [기본값: false]
 * @returns {string} 지금 화면에 보여줄 글자
 */
function useTypingText(phrases, isPaused = false) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrase = phrases[phraseIndex];

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const isTyping = !isDeleting && length < phrase.length;
    const isHolding = !isDeleting && length === phrase.length;
    const isErasing = isDeleting && length > 0;

    let delay = NEXT_PHRASE_MS;
    if (isTyping) {
      delay = TYPE_MS;
    } else if (isHolding) {
      delay = HOLD_MS;
    } else if (isErasing) {
      delay = DELETE_MS;
    }

    const timer = setTimeout(() => {
      if (isTyping) {
        setLength((prev) => prev + 1);
      } else if (isHolding) {
        setIsDeleting(true);
      } else if (isErasing) {
        setLength((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [phrases, phrase, length, isDeleting, isPaused]);

  return phrase.slice(0, length);
}

export default useTypingText;
