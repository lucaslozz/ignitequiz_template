import {View} from 'react-native';

import Animated from 'react-native-reanimated';

import {useAnimatedProgress} from './animations/useAnimatedProgress';
import {styles} from './styles';

interface Props {
  total: number;
  current: number;
}

export function ProgressBar({total, current}: Props) {
  const {animatedProgressStyle} = useAnimatedProgress(current, total);
  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, animatedProgressStyle]} />
    </View>
  );
}
