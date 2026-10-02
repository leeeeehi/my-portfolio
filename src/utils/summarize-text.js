/**
 * 긴 글을 지정한 글자 수까지만 남기고 말줄임표를 붙여 요약합니다.
 * @param {string} text - 원본 글
 * @param {number} maxLength - 남길 최대 글자 수
 * @returns {string} 요약된 글 (maxLength 이하이면 원본 그대로)
 */
export function summarizeText(text, maxLength) {
  const singleLine = text.replace(/\s+/g, ' ').trim();
  if (singleLine.length <= maxLength) {
    return singleLine;
  }
  return `${singleLine.slice(0, maxLength).trimEnd()}...`;
}
