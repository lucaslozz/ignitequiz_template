import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function useAppSafeArea() {
  const {top, bottom} = useSafeAreaInsets();

  return {
    top: Math.max(top, 50),
    bottom: Math.max(bottom, 50),
  };
}
