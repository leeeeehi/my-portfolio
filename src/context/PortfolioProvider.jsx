import { useCallback, useMemo, useState } from 'react';
import PortfolioContext from './portfolio-context.js';
import PORTFOLIO_INITIAL_DATA from './portfolio-initial-data.js';
import { SKILL_CATEGORIES, getTopSkills } from '../utils/skill-utils.js';
import { summarizeText } from '../utils/summarize-text.js';

const HOME_SUMMARY_LENGTH = 100;
const HOME_SKILL_COUNT = 4;
/** 내용 수정·스킬 추가 UI 는 개발 서버에서만 노출하고, 배포된 사이트에서는 숨깁니다. */
const IS_EDITABLE = import.meta.env.DEV;

/**
 * PortfolioProvider 컴포넌트
 * About Me 데이터(기본 정보, 콘텐츠 섹션, 스킬)를 useState 로 관리하고,
 * Home 탭용 데이터(homeData)를 자동으로 만들어 Context 로 제공합니다.
 * (수정한 내용은 저장되지 않으며 새로고침하면 초기 데이터로 돌아갑니다.)
 *
 * Props:
 * @param {node} children - Context 를 사용할 하위 컴포넌트 [Required]
 *
 * Example usage:
 * <PortfolioProvider><App /></PortfolioProvider>
 */
function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState(PORTFOLIO_INITIAL_DATA);

  const updateSectionContent = useCallback((sectionId, content) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (
        section.id === sectionId ? { ...section, content } : section
      )),
    }));
  }, []);

  const updateSkillLevel = useCallback((skillId, level) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (
        skill.id === skillId ? { ...skill, level } : skill
      )),
    }));
  }, []);

  const addSkill = useCallback(({ name, level, category, description }) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: Math.max(0, ...prev.skills.map((skill) => skill.id)) + 1,
          icon: SKILL_CATEGORIES[category].icon,
          name,
          level,
          category,
          description,
          projects: [],
        },
      ],
    }));
  }, []);

  /** Home 탭용 데이터: showInHome 섹션 요약 + 숙련도 상위 스킬 + 기본 정보 */
  const homeData = useMemo(() => ({
    content: aboutMeData.sections
      .filter((section) => section.showInHome)
      .map((section) => ({
        id: section.id,
        title: section.title,
        summary: summarizeText(section.content, HOME_SUMMARY_LENGTH),
      })),
    skills: getTopSkills(aboutMeData.skills, HOME_SKILL_COUNT),
    basicInfo: aboutMeData.basicInfo,
  }), [aboutMeData]);

  const value = useMemo(() => ({
    aboutMeData,
    homeData,
    isEditable: IS_EDITABLE,
    updateSectionContent,
    updateSkillLevel,
    addSkill,
  }), [aboutMeData, homeData, updateSectionContent, updateSkillLevel, addSkill]);

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioProvider;
