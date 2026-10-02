import { createContext } from 'react';

/**
 * About Me 탭과 Home 탭이 함께 쓰는 포트폴리오 데이터 Context 입니다.
 * 값은 PortfolioProvider 가 제공하고, usePortfolio 훅으로 읽습니다.
 */
const PortfolioContext = createContext(null);

export default PortfolioContext;
