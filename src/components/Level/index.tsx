import {TouchableOpacityProps, Pressable} from 'react-native';

import Animated from 'react-native-reanimated';

import {TYPE_COLORS, useAnimatedColor} from './animations/useAnimatedColor';
import {useAnimatedScale} from './animations/useAnimatedScale';
import {styles} from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

export function Level({
  title,
  type = 'EASY',
  isChecked = false,
  ...rest
}: Props) {
  const {animatedScaleStyle, onPressIn, onPressOut} = useAnimatedScale();
  const {animatedBgColorStyle, COLOR, animatedTextColor} = useAnimatedColor(
    isChecked,
    type,
  );

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>
      <Animated.View
        style={[
          styles.container,
          animatedScaleStyle,
          animatedBgColorStyle,
          {
            borderColor: COLOR,
          },
        ]}>
        <Animated.Text style={[styles.title, animatedTextColor]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}
