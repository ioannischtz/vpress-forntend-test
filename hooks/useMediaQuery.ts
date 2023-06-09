import * as React from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const useMediaQuery = (width,) => {
  const [targetReached, setTargetReached] = React.useState(false);

  const updateTarget = React.useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(`screen and (min-width: ${width}px)`);
    // let media
    // if (width > 1366) {
    //   media = window.matchMedia(`(min-width: ${width}px), (-webkit-max-device-pixel-ratio: 1.4), (max-device-pixel-ratio: 1.4), (max-resolution: 190dpi)`);
    // } else {
    //   media = window.matchMedia(`(min-width: ${width}px), (-webkit-max-device-pixel-ratio: 1.4), (max-device-pixel-ratio: 1.4), (max-resolution: 190dpi)`);
    // }
    media.addEventListener('change', (e) => updateTarget(e));

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener('change', (e) => updateTarget(e));
  }, []);

  return targetReached;
};

export default useMediaQuery;
