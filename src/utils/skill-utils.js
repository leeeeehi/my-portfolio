/**
 * 스킬 카테고리 설정
 * color: 카테고리 구분 색상, icon: 스킬 추가 시 기본으로 쓰는 아이콘 키
 */
export const SKILL_CATEGORIES = {
  Frontend: { color: '#7A9B6E', icon: 'code' },
  Framework: { color: '#5B9AA0', icon: 'atom' },
  Design: { color: '#B58BC2', icon: 'target' },
  Backend: { color: '#C98A4B', icon: 'server' },
  Language: { color: '#E8967A', icon: 'terminal' },
  '도구 & 기타': { color: '#8C8C6A', icon: 'wrench' },
};

/**
 * '스킬 추가' 에서 바로 고를 수 있는 기술 목록
 */
export const SKILL_PRESETS = [
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'React', category: 'Framework' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: 'Figma', category: 'Design' },
  { name: 'Git', category: '도구 & 기타' },
  { name: 'React Native', category: '도구 & 기타' },
  { name: 'MongoDB', category: '도구 & 기타' },
];

/**
 * 스킬을 숙련도 높은 순으로 정렬한 새 배열을 반환합니다.
 * @param {Array} skills - 스킬 배열
 * @returns {Array} 숙련도 내림차순으로 정렬된 스킬 배열
 */
export function sortSkillsByLevel(skills) {
  return [...skills].sort((a, b) => b.level - a.level);
}

/**
 * 숙련도 상위 N개의 스킬을 반환합니다.
 * @param {Array} skills - 스킬 배열
 * @param {number} count - 가져올 개수
 * @returns {Array} 숙련도 상위 count 개의 스킬 배열
 */
export function getTopSkills(skills, count) {
  return sortSkillsByLevel(skills).slice(0, count);
}

/**
 * 스킬을 카테고리별로 묶습니다. 카테고리 순서는 SKILL_CATEGORIES 정의 순서를 따릅니다.
 * @param {Array} skills - 스킬 배열
 * @returns {Array} [{ category, skills }] 형태의 그룹 배열 (스킬이 없는 카테고리는 제외)
 */
export function groupSkillsByCategory(skills) {
  return Object.keys(SKILL_CATEGORIES)
    .map((category) => ({
      category,
      skills: sortSkillsByLevel(skills.filter((skill) => skill.category === category)),
    }))
    .filter((group) => group.skills.length > 0);
}
