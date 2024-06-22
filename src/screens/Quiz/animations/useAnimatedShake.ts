import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export function useAnimatedShake() {
  const shake = useSharedValue(0);

  function shakeAnimation() {
    shake.value = withSequence(
      withTiming(3, {easing: Easing.ease}),
      withTiming(0),
    );
  }

  const animatedShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            shake.value,
            [0, 0.5, 1, 1.5, 2, 2.5, 3],
            [0, -15, 0, 15, 0, -15, 0],
          ),
        },
      ],
    };
  });

  return {
    shakeAnimation,
    animatedShakeStyle,
  };
}
