import { useContext } from 'react';
import PortfolioContext from '../context/portfolio-context.js';

/**
 * usePortfolio 훅
 * PortfolioProvider 가 제공하는 포트폴리오 데이터와 수정 함수에 접근합니다.
 */
function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio 는 PortfolioProvider 안에서만 사용할 수 있습니다.');
  }
  return context;
}

export default usePortfolio;
