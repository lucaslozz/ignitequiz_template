import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export interface CardPosition {
  [key: string]: number;
}

export function useAnimatedScroll() {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return {
    onScroll,
    scrollY,
  };
}
