/**
 * 콜백이 화면 한 프레임에 최대 한 번만 실행되도록 묶습니다. (scroll, mousemove 같은 잦은 이벤트용)
 * @param {function} callback - 실행할 함수
 * @returns {function} 묶인 함수. cancel() 로 예약된 실행을 취소할 수 있습니다.
 */
export function rafThrottle(callback) {
  let frame = null;
  const throttled = (...args) => {
    if (frame !== null) {
      return;
    }
    frame = requestAnimationFrame(() => {
      frame = null;
      callback(...args);
    });
  };
  throttled.cancel = () => {
    if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  };
  return throttled;
}
