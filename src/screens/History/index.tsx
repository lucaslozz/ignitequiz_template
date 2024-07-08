import {useEffect, useState} from 'react';
import {View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {HouseLine} from 'phosphor-react-native';
import Animated from 'react-native-reanimated';

import {Header} from '../../components/Header';
import {HistoryCard, HistoryProps} from '../../components/HistoryCard';
import {CARD_HEIGHT} from '../../components/HistoryCard/styles';
import {Loading} from '../../components/Loading';
import {MovableCard} from '../../components/MovableCard/MovableCard';
import {historyGetAll} from '../../storage/quizHistoryStorage';

import {useAnimatedScroll} from './animations/useAnimatedScroll';
import {styles} from './styles';

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryProps[]>([]);

  const {goBack} = useNavigation();

  const {onScroll, scrollY} = useAnimatedScroll();

  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  // async function remove(id: string) {
  //   await historyRemove(id);

  //   fetchHistory();
  // }

  // function handleRemove(id: string, index: number) {
  //   swipeableRefs.current[index].close();
  //   Alert.alert('Remover', 'Deseja remover esse registro?', [
  //     {
  //       text: 'Sim',
  //       onPress: () => remove(id),
  //     },
  //     {text: 'Não', style: 'cancel'},
  //   ]);
  // }

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header
        title="Histórico"
        subtitle={`Seu histórico de estudos${'\n'}realizados`}
        icon={HouseLine}
        onPress={goBack}
      />

      <Animated.ScrollView
        contentContainerStyle={[
          styles.history,
          {height: history.length * CARD_HEIGHT},
        ]}
        showsVerticalScrollIndicator={false}
        style={{height: 100}}
        scrollEventThrottle={16}
        onScroll={onScroll}>
        {history.map(item => (
          <MovableCard
            cardId={+item.id}
            key={item.id}
            list={history}
            scrollY={scrollY}
            cardsCount={history.length}>
            {/* <View
              style={{
                width: '100%',
                height: CARD_HEIGHT,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
              }}>
              <Text>teste</Text>
            </View> */}
            <HistoryCard data={item} />
          </MovableCard>
        ))}
      </Animated.ScrollView>
    </View>
  );
}
