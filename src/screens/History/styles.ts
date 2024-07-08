import {StyleSheet} from 'react-native';

import {THEME} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  history: {
    paddingHorizontal: 32,
    flex: 1,
    position: 'relative',
  },
  swipeableRemove: {
    width: 90,
    height: 90,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeableContainer: {
    width: '100%',
    height: 90,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
  },
});
