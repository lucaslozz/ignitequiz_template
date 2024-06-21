import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {Check} from 'phosphor-react-native';

import {THEME} from '../../styles/theme';

import {styles} from './styles';

export function ConfirmButton({...rest}: TouchableOpacityProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} {...rest}>
      <Text style={styles.title}>Confirmar</Text>

      <Check color={THEME.COLORS.WHITE} weight="bold" size={24} />
    </TouchableOpacity>
  );
}
