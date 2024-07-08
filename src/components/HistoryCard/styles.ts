import {StyleSheet} from 'react-native';

import {THEME} from '../../styles/theme';

export const HEIGHT = 90;
export const MARGIN_BOTTOM = 12;
export const CARD_HEIGHT = HEIGHT + MARGIN_BOTTOM;
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEIGHT,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.GREY_700,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: THEME.COLORS.GREY_100,
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: 16,
  },
  subtitle: {
    color: THEME.COLORS.GREY_300,
    fontSize: 12,
  },
});
