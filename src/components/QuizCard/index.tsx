import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from 'react-native';

import {QUIZZES} from '../../data/quizzes';
import {THEME} from '../../styles/theme';
import {LevelBars} from '../LevelBars';

import {styles} from './styles';

type Props = TouchableOpacityProps & {
  data: (typeof QUIZZES)[0];
};

export function QuizCard({data, ...rest}: Props) {
  const Icon = data.svg;

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={THEME.COLORS.GREY_100} />}
        </View>

        <LevelBars level={data.level} />
      </View>

      <Text style={styles.title}>{data.title}</Text>
    </TouchableOpacity>
  );
}
