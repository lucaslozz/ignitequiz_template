import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function useAnimatedScale() {
  const scale = useSharedValue(1);
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
  transform: [{scale: scale.value}],
    };
  });

  function onPressIn() {
    scale.value = withTiming(1.1);
  }

  function onPressOut() {
    scale.value = withTiming(1.1);
  }
  return {onPressIn, onPressOut, animatedContainerStyle};
}
