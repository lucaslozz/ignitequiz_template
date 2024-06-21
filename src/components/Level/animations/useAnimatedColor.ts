import {useEffect} from 'react';

import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {THEME} from '../../../styles/theme';

export const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
};

type Props = {
  type: keyof typeof TYPE_COLORS;
};

export function useAnimatedColor(isChecked: boolean, type: Props['type']) {
  const COLOR = TYPE_COLORS[type];
  const checked = useSharedValue(0);

  const animatedBgColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', COLOR],
      ),
    };
  });

  const animatedTextColor = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [COLOR, THEME.COLORS.GREY_100],
      ),
    };
  });

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0);
  }, [isChecked]);

  return {animatedBgColorStyle, COLOR, animatedTextColor};
}
