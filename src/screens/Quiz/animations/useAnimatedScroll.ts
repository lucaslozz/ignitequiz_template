import {ViewStyle} from 'react-native';

import {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {useAppSafeArea} from '../../../hooks/useAppSafeArea';
import {THEME} from '../../../styles/theme';

export function useAnimatedScroll() {
  const {top} = useAppSafeArea();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const fixedProgressBarStyleAnimated = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      zIndex: 1,
      paddingTop: top,
      opacity: interpolate(scrollY.value, [0, 30], [0, 1], Extrapolation.CLAMP),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 30],
            [-100, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
      ...$fixedProgressBar,
    };
  });

  const headerStyleAnimated = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 30], [1, 0], Extrapolation.CLAMP),
    };
  });

  return {
    scrollHandler,
    scrollY,
    fixedProgressBarStyleAnimated,
    headerStyleAnimated,
  };
}

const $fixedProgressBar: ViewStyle = {
  backgroundColor: THEME.COLORS.GREY_500,
  width: '110%',
  left: '-5%',
  justifyContent: 'center',
  alignItems: 'center',
};
