/**
 * 포트폴리오 초기 데이터
 * - sections 의 content 는 빈 줄(\n\n)로 문단을 구분합니다.
 * - showInHome 이 true 인 섹션만 Home 탭의 About Me 섹션에 요약되어 노출됩니다.
 * - skills 는 숙련도 상위 4개가 Home 탭에 노출됩니다.
 * - skills 의 projects 는 그 기술을 실제로 사용한 프로젝트 이름 목록입니다.
 */
const ALL_PROJECTS = ['Leetudy', 'our.gg', 'Portfolio'];

const PORTFOLIO_INITIAL_DATA = {
  basicInfo: {
    name: '이은혁',
    education: '목포대학교 소프트웨어학과',
    major: '소프트웨어학과',
    experience: '신입',
    photo: '', // TODO: 프로필 사진 추가 시 이미지 경로 입력
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content: [
        '처음 만든 화면이 브라우저에 떴던 순간을 아직 기억합니다. 몇 줄의 코드가 누군가 눌러볼 수 있는 버튼이 되고, 머릿속에만 있던 생각이 주소 하나로 공유되던 순간이었습니다. 그날 이후 개발은 과제가 아니라, 제가 가장 오래 붙잡고 있는 일이 되었습니다.',
        '목포대학교 소프트웨어학과에서 기초를 다지면서, 배운 것은 반드시 직접 만들어 보는 방식으로 공부해 왔습니다. 실시간 커뮤니티 Leetudy 와 모바일 퍼스트 소셜 웹앱 our.gg 는 기획에서 데이터베이스 설계, 화면 구현, 배포까지 처음부터 끝까지 완성해 본 프로젝트입니다.',
        '아직 신입이지만, "만들 수 있다"에서 멈추지 않고 "실제로 쓰이게 만든다"까지 가 본 경험이 저의 출발점입니다.',
      ].join('\n\n'),
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content: [
        '좋은 코드는 똑똑해 보이는 코드가 아니라, 다음 사람이 망설임 없이 읽을 수 있는 코드라고 믿습니다. 그 다음 사람은 대개 몇 달 뒤의 저 자신이기도 합니다.',
        '그래서 세 가지를 지키려 합니다. 첫째, 기술보다 사용자가 먼저입니다. 화면 너머에서 실제로 쓰는 사람의 흐름이 막히지 않는지를 먼저 봅니다. 둘째, 작게 만들고 빨리 확인합니다. 완벽한 설계를 기다리기보다 동작하는 것을 먼저 내놓고 다듬습니다. 셋째, 왜 이렇게 짰는지 설명할 수 있어야 합니다. 설명할 수 없는 코드는 아직 제 것이 아니라고 생각합니다.',
        '빠르게 변하는 도구 속에서도 변하지 않는 것은 기본기와 태도라고 생각하며, 오늘도 그 두 가지를 쌓고 있습니다.',
      ].join('\n\n'),
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content: [
        '모니터 밖의 저는 생각보다 느긋한 사람입니다. 급하게 결론을 내리기보다 한 걸음 물러서서 전체를 보는 편이고, 그 습관이 문제를 풀 때도 그대로 이어집니다.',
        '게임을 좋아합니다. 좋아하는 것을 더 잘 즐기고 싶다는 마음이 our.gg 를 만들게 한 이유였고, 좋아서 시작한 일이 가장 멀리 간다는 것을 그때 배웠습니다.',
        '이 포트폴리오의 세이지 그린 색감처럼, 화려하지 않아도 오래 보아 편안한 것을 좋아합니다. 함께 일하는 사람에게도 그런 동료가 되고 싶습니다.',
      ].join('\n\n'),
      showInHome: false,
    },
  ],
  skills: [
    { id: 1, icon: 'orange-diamond', name: 'HTML', level: 90, category: 'Frontend', description: '시맨틱 마크업과 웹 접근성을 고려한 구조 설계', projects: ALL_PROJECTS },
    { id: 2, icon: 'palette', name: 'CSS', level: 90, category: 'Frontend', description: '반응형 레이아웃과 애니메이션 구현', projects: ALL_PROJECTS },
    { id: 3, icon: 'zap', name: 'JavaScript', level: 80, category: 'Frontend', description: 'ES6+ 문법과 비동기 처리, React 기반 화면 개발', projects: ALL_PROJECTS },
    { id: 4, icon: 'terminal', name: 'Python', level: 80, category: 'Language', description: '자료구조와 알고리즘 문제 풀이', projects: [] },
    { id: 5, icon: 'chip', name: 'C/C++', level: 70, category: 'Language', description: '포인터와 메모리 구조에 대한 이해', projects: [] },
    { id: 6, icon: 'atom', name: 'React', level: 75, category: 'Framework', description: '컴포넌트 설계, 훅, Context, React Router 로 SPA 개발', projects: ALL_PROJECTS },
    { id: 7, icon: 'atom', name: 'MUI', level: 70, category: 'Framework', description: 'MUI 컴포넌트와 테마로 반응형 UI 구성', projects: ALL_PROJECTS },
    { id: 8, icon: 'server', name: 'Supabase', level: 65, category: 'Backend', description: '테이블 설계, RLS 정책, 클라이언트 연동', projects: ALL_PROJECTS },
    { id: 9, icon: 'wrench', name: 'Git / GitHub', level: 65, category: '도구 & 기타', description: '저장소 관리와 GitHub Actions 자동 배포', projects: ALL_PROJECTS },
  ],
};

export default PORTFOLIO_INITIAL_DATA;
