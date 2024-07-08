import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {SharedValue} from 'react-native-reanimated';

import {styles} from '../Loading/styles';

import {useMovableCard} from './useMovableCard';

interface MovableCardProps<T extends {id: string}> {
  cardId: number;
  children: React.ReactElement;
  scrollY: SharedValue<number>;
  cardsCount: number;
  list: T[];
}

export function MovableCard<T extends {id: string}>({
  children,
  cardId,
  scrollY,
  list,
}: MovableCardProps<T>) {
  const {composedGesture, animatedPosition} = useMovableCard({
    cardId,
    scrollY,
    list,
  });

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[animatedPosition, styles.container]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
