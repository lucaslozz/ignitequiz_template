import {View} from 'react-native';

import {useAppSafeArea} from '../../hooks/useAppSafeArea';

interface ScreenContainerProps {
  children: React.ReactNode;
}

export function ScreenContainer({children}: ScreenContainerProps) {
  const {bottom, top} = useAppSafeArea();
  return (
    <View style={{paddingTop: top, paddingBottom: bottom, flex: 1}}>
      {children}
    </View>
  );
}
