import {useState} from 'react';

import {ComposedGesture, Gesture} from 'react-native-gesture-handler';
import {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {CardPosition} from '../../screens/History/animations/useAnimatedScroll';
import {CARD_HEIGHT} from '../HistoryCard/styles';

interface Props<T extends {id: string}> {
  list: T[];
  cardId: number;
  scrollY: SharedValue<number>;
}

export function useMovableCard<T extends {id: string}>({
  cardId,
  list,
  scrollY,
}: Props<T>) {
  const [moving, setMoving] = useState(false);
  const cardsPosition = useSharedValue<CardPosition>(listToObj(list));
  const cardPositionY = useSharedValue(
    cardsPosition.value[cardId] * CARD_HEIGHT,
  );

  const draggableGesture = Gesture.Pan()
    .activateAfterLongPress(300)
    .onBegin(() => {
      runOnJS(setMoving)(true);
    })
    .onUpdate(event => {
      cardPositionY.value = event.absoluteY + scrollY.value - CARD_HEIGHT;
    })
    .onFinalize(() => {
      runOnJS(setMoving)(false);
    });

  const animatedPosition = useAnimatedStyle(() => {
    return {
      top: cardPositionY.value - CARD_HEIGHT,
      opacity: withSpring(moving ? 1 : 0.4),
      zIndex: moving ? 1 : 0,
    };
  }, [moving, cardPositionY.value]);

  function listToObj<T extends {id: string}>(list: T[]) {
    return list.reduce<CardPosition>((acc, card, index) => {
      acc[+card.id] = index;

      return acc;
    }, {});
  }

  const composedGesture: ComposedGesture = Gesture.Race(draggableGesture);

  return {composedGesture, animatedPosition, draggableGesture, cardsPosition};
}
