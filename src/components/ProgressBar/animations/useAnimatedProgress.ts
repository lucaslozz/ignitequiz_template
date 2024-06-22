import {useEffect} from 'react';

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function useAnimatedProgress(current: number, total: number) {
  const percentage = Math.round((current / total) * 100);
  const progress = useSharedValue(percentage);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: progress.value,
    };
  });

  useEffect(() => {
    progress.value = withTiming(percentage);
  }, [percentage]);

  return {
    animatedProgressStyle,
  };
}
