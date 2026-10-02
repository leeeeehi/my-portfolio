import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { keyframes } from '@mui/material/styles';
import HeroBackground from './HeroBackground.jsx';
import HeroRoleButton from './HeroRoleButton.jsx';
import HeroTypingLine from './HeroTypingLine.jsx';
import HeroCtaGroup from './HeroCtaGroup.jsx';
import HeroProjectMockup from './HeroProjectMockup.jsx';
import HeroScrollCue from './HeroScrollCue.jsx';
import HeroMarquee from './HeroMarquee.jsx';
import MorphingText from '../ui/MorphingText.jsx';
import CountUp from '../ui/CountUp.jsx';
import usePortfolio from '../../hooks/usePortfolio.js';
import useScrollProgressVar from '../../hooks/useScrollProgressVar.js';
import { scrollToSection } from '../../utils/scroll-to-section.js';

const MARQUEE_ITEMS = ['LEETUDY', 'OUR.GG', 'REACT', 'SUPABASE', 'MUI', 'GITHUB ACTIONS', '기획부터 배포까지'];

/** 헤드라인 아래에서 타이핑 효과로 차례로 보여주는 포지셔닝 문구 */
const TYPING_PHRASES = [
  '기획과 개발 사이의 말을 통역하는 개발자',
  '기획부터 배포까지, 끝까지 만드는 개발자',
  '신입이지만 배포는 세 번째입니다',
];

/** 인사말 끝에서 흐려지며 번갈아 바뀌는 단어 (텍스트 모핑) */
const GREETING_WORDS = ['개발합니다', '기획합니다', '디자인을 챙깁니다'];

/** 소개 문장 아래에 보여주는 수치: 실제로 배포한 프로젝트 */
const DEPLOYED_PROJECTS = ['Leetudy', 'our.gg', 'Portfolio'];

/** 상단 고정 메뉴(Navbar)의 높이. Hero 가 메뉴 아래 화면을 정확히 한 화면 채우도록 뺍니다. */
const NAVBAR_HEIGHT = { xs: 56, sm: 64 };

/** 헤드라인 전용 폰트 (두껍고 각진 디스플레이 서체). 없는 글자는 본문 폰트로 대체됩니다. */
const HEADLINE_FONT = '"Black Han Sans", "Pretendard Variable", sans-serif';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/** 차례로 떠오르는 등장 애니메이션. 움직임 줄이기 설정에서는 이동 없이 투명도만 바뀝니다. */
const fadeUpSx = (delay) => ({
  animation: `${fadeUp} 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both`,
  '@media (prefers-reduced-motion: reduce)': { animationName: `${fadeIn}` },
});

/**
 * HeroSection 컴포넌트
 * Home 페이지 최상단 Hero 섹션. 도트 그리드 배경 위에 '개발자 & 기획자' 듀얼 헤드라인,
 * 타이핑 문구, CTA 버튼 묶음(HeroCtaGroup), 실제 프로젝트 화면 목업,
 * 스크롤 유도, 계속 흐르는 마퀴 텍스트로 구성됩니다.
 * 첫 화면을 가득 채워 다음 섹션이 보이지 않도록 최소 높이를 화면 높이에 맞춥니다.
 * 스크롤해서 Hero 가 화면 밖으로 나가는 정도를 CSS 변수(--hero-scroll)로 기록해,
 * 배경·글자·목업이 서로 다른 속도로 움직이는 패럴랙스를 만듭니다.
 *
 * 반응형 기준 (MUI 테마 브레이크포인트):
 * - lg(1200px~): 2단, 넉넉한 여백과 가장 큰 헤드라인
 * - md(900~1199px): 2단, 간격과 글자를 한 단계 줄임
 * - sm(600~899px): 1단 세로 배치, 가운데 정렬
 * - xs(~599px): 1단 세로 배치, 버튼은 전체 너비로 쌓임
 */
function HeroSection() {
  const { homeData } = usePortfolio();
  const { name } = homeData.basicInfo;
  const sectionRef = useScrollProgressVar('--hero-scroll');
  const [isTextPaused, setIsTextPaused] = useState(false);

  return (
    <Box
      ref={sectionRef}
      id="hero"
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: `calc(100svh - ${NAVBAR_HEIGHT.xs}px)`, sm: `calc(100svh - ${NAVBAR_HEIGHT.sm}px)` },
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
    >
      <HeroBackground />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, sm: 3 },
          pt: { xs: 4, sm: 6, lg: 8 },
          pb: { xs: 3, md: 4 },
          // 스크롤하면 내용이 배경보다 빨리 올라가며 서서히 흐려진다.
          transform: 'translate3d(0, calc(var(--hero-scroll, 0) * -60px), 0)',
          opacity: 'calc(1 - var(--hero-scroll, 0) * 1.1)',
          '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
        }}
      >
        <Grid container spacing={{ xs: 5, sm: 6, md: 4, lg: 8 }} sx={{ width: '100%', alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                sx={{
                  ...fadeUpSx(0),
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 1.25,
                  fontSize: { xs: '0.9rem', sm: '1rem', lg: '1.1rem' },
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  lineHeight: 1.5,
                  color: 'var(--color-text-primary)',
                  mb: { xs: 1.5, sm: 2, lg: 2.5 },
                  '&::before': {
                    content: '""',
                    width: { xs: 24, lg: 36 },
                    height: '2px',
                    backgroundColor: 'var(--color-accent)',
                  },
                }}
              >
                안녕하세요, {name}입니다
                <Box component="span" sx={{ display: { xs: 'none', md: 'inline' }, color: 'var(--color-accent)' }}>·</Box>
                <MorphingText
                  words={GREETING_WORDS}
                  isPaused={isTextPaused}
                  sx={{
                    flexBasis: { xs: '100%', md: 'auto' },
                    justifyItems: { xs: 'center', md: 'start' },
                    fontWeight: 700,
                  }}
                />
              </Typography>

              <Box
                component="h1"
                sx={{
                  ...fadeUpSx(0.12),
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  columnGap: { xs: 1.5, sm: 2, lg: 2.5 },
                  rowGap: 1,
                  m: 0,
                  fontFamily: HEADLINE_FONT,
                  fontSize: {
                    xs: 'clamp(2.4rem, 11vw, 3.75rem)',
                    md: 'clamp(3.2rem, 5.4vw, 4.4rem)',
                    lg: 'clamp(4.4rem, 5.4vw, 5.2rem)',
                  },
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-text-primary)',
                }}
              >
                <HeroRoleButton
                  label="개발자"
                  subLabel="Developer"
                  hoverColor="var(--color-button-primary)"
                  onClick={() => scrollToSection('skills')}
                  startDelay={0.15}
                />
                <Box component="span" sx={{ color: 'var(--color-accent)' }}>
                  &amp;
                </Box>
                <HeroRoleButton
                  label="기획자"
                  subLabel="Planner"
                  hoverColor="var(--color-accent)"
                  onClick={() => scrollToSection('about')}
                  startDelay={0.5}
                />
              </Box>

              <Box sx={{ ...fadeUpSx(0.24), mt: { xs: 2.5, sm: 3, lg: 4 }, mb: { xs: 1.5, lg: 2 } }}>
                <HeroTypingLine
                  phrases={TYPING_PHRASES}
                  isPaused={isTextPaused}
                  onTogglePause={() => setIsTextPaused((prev) => !prev)}
                />
              </Box>

              <Typography
                sx={{
                  ...fadeUpSx(0.36),
                  maxWidth: 520,
                  mx: { xs: 'auto', md: 0 },
                  fontSize: { xs: '0.95rem', sm: '1rem', lg: '1.1rem' },
                  lineHeight: 1.6,
                  color: 'var(--color-text-primary)',
                  wordBreak: 'keep-all',
                  mb: 1,
                }}
              >
                React 와 Supabase 로 스터디 커뮤니티와 전적 공유 SNS 를 기획부터 배포까지 직접 만들었습니다.
              </Typography>

              <Box
                sx={{
                  ...fadeUpSx(0.36),
                  fontSize: { xs: '0.85rem', md: '0.95rem' },
                  lineHeight: 1.6,
                  color: 'var(--color-text-secondary)',
                  mb: { xs: 3, sm: 3.5, lg: 4.5 },
                }}
              >
                배포한 프로젝트{' '}
                <CountUp
                  value={DEPLOYED_PROJECTS.length}
                  duration={900}
                  sx={{ fontFamily: HEADLINE_FONT, fontWeight: 400, fontSize: '1.5em', color: 'var(--color-accent)' }}
                />
                개 · {DEPLOYED_PROJECTS.join(' · ')}
              </Box>

              <Box sx={fadeUpSx(0.48)}>
                <HeroCtaGroup
                  onProjectsClick={() => scrollToSection('projects')}
                  onContactClick={() => scrollToSection('contact')}
                />
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={fadeUpSx(0.4)}>
              {/* 목업은 글자보다 조금 더 빨리 올라가는 가장 앞쪽 층 */}
              <Box
                sx={{
                  transform: 'translate3d(0, calc(var(--hero-scroll, 0) * -70px), 0)',
                  '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
                }}
              >
                <HeroProjectMockup />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          ...fadeUpSx(0.8),
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          pb: { xs: 2, md: 2.5 },
        }}
      >
        <HeroScrollCue onClick={() => scrollToSection('about')} />
      </Box>

      <Box sx={{ position: 'relative' }}>
        <HeroMarquee items={MARQUEE_ITEMS} />
      </Box>
    </Box>
  );
}

export default HeroSection;
