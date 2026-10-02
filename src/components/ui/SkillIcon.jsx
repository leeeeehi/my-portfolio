import DiamondIcon from '@mui/icons-material/Diamond';
import PaletteIcon from '@mui/icons-material/Palette';
import BoltIcon from '@mui/icons-material/Bolt';
import TerminalIcon from '@mui/icons-material/Terminal';
import MemoryIcon from '@mui/icons-material/Memory';
import CodeIcon from '@mui/icons-material/Code';
import WidgetsIcon from '@mui/icons-material/Widgets';
import BrushIcon from '@mui/icons-material/Brush';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';

const SKILL_ICONS = {
  'orange-diamond': DiamondIcon,
  palette: PaletteIcon,
  zap: BoltIcon,
  terminal: TerminalIcon,
  chip: MemoryIcon,
  code: CodeIcon,
  atom: WidgetsIcon,
  target: BrushIcon,
  server: StorageIcon,
  wrench: BuildIcon,
};

/**
 * SkillIcon 컴포넌트
 * 스킬 데이터의 icon 키에 해당하는 MUI 아이콘을 보여줍니다. (모르는 키는 코드 아이콘으로 표시)
 *
 * Props:
 * @param {string} icon - 스킬 아이콘 키 (예: 'palette', 'zap') [Required]
 * @param {object} sx - 아이콘에 적용할 MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <SkillIcon icon="palette" sx={{ color: 'primary.dark' }} />
 */
function SkillIcon({ icon, sx }) {
  const Icon = SKILL_ICONS[icon] ?? CodeIcon;

  return <Icon sx={sx} />;
}

export default SkillIcon;
