import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function useAnimatedScale() {
  const scale = useSharedValue(1);
  const animatedScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  function onPressIn() {
    scale.value = withTiming(1.2);
  }

  function onPressOut() {
    scale.value = withTiming(1);
  }
  return {onPressIn, onPressOut, animatedScaleStyle};
}
