import useMediaQuery from './useMediaQuery';

export const useScreenType = () => {
  const isDesktop = useMediaQuery(1601);
  const isTablet = useMediaQuery(1025);
  const isSmallTablet = useMediaQuery(600);

  if (isDesktop) {
    return 'isDesktop';
  }
  if (isTablet) {
    return 'isTablet';
  }
  if (isSmallTablet) {
    return 'isSmallTablet';
  }

  return 'isMobile';
};
