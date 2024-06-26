import {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import Animated from 'react-native-reanimated';

import {ConfirmButton} from '../../components/ConfirmButton';
import {Loading} from '../../components/Loading';
import {OutlineButton} from '../../components/OutlineButton';
import {ProgressBar} from '../../components/ProgressBar';
import {Question} from '../../components/Question';
import {QuizHeader} from '../../components/QuizHeader';
import {QUIZ} from '../../data/quiz';
import {historyAdd} from '../../storage/quizHistoryStorage';

import {useAnimatedScroll} from './animations/useAnimatedScroll';
import {useAnimatedShake} from './animations/useAnimatedShake';
import {styles} from './styles';

interface Params {
  id: string;
}

type QuizProps = (typeof QUIZ)[0];

export function Quiz() {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(
    null,
  );

  const {animatedShakeStyle, shakeAnimation} = useAnimatedShake();
  const {scrollHandler, fixedProgressBarStyleAnimated, headerStyleAnimated} =
    useAnimatedScroll();
  const {navigate} = useNavigation();

  const route = useRoute();
  const {id} = route.params as Params;

  function handleSkipConfirm() {
    Alert.alert('Pular', 'Deseja realmente pular a questão?', [
      {text: 'Sim', onPress: () => handleNextQuestion()},
      {text: 'Não', onPress: () => {}},
    ]);
  }

  async function handleFinished() {
    await historyAdd({
      id: new Date().getTime().toString(),
      title: quiz.title,
      level: quiz.level,
      points,
      questions: quiz.questions.length,
    });

    navigate('finish', {
      points: String(points),
      total: String(quiz.questions.length),
    });
  }

  function handleNextQuestion() {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prevState => prevState + 1);
    } else {
      handleFinished();
    }
  }

  async function handleConfirm() {
    if (alternativeSelected === null) {
      return handleSkipConfirm();
    }

    if (quiz.questions[currentQuestion].correct === alternativeSelected) {
      setPoints(prevState => prevState + 1);
    } else {
      shakeAnimation();
    }

    setAlternativeSelected(null);

    handleNextQuestion();
  }

  function handleStop() {
    Alert.alert('Parar', 'Deseja parar agora?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => navigate('home'),
      },
    ]);

    return true;
  }

  useEffect(() => {
    const quizSelected = QUIZ.filter(item => item.id === id)[0];
    setQuiz(quizSelected);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (quiz.questions) {
      handleNextQuestion();
    }
  }, [points]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={fixedProgressBarStyleAnimated}>
        <Text style={styles.title}>{quiz.title}</Text>

        <ProgressBar
          total={quiz.questions.length}
          current={currentQuestion + 1}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.question}
        onScroll={scrollHandler}>
        <Animated.View style={[headerStyleAnimated, styles.header]}>
          <QuizHeader
            title={quiz.title}
            currentQuestion={currentQuestion + 1}
            totalOfQuestions={quiz.questions.length}
          />
        </Animated.View>

        <Animated.View style={animatedShakeStyle}>
          <Question
            key={quiz.questions[currentQuestion].title}
            question={quiz.questions[currentQuestion]}
            alternativeSelected={alternativeSelected}
            setAlternativeSelected={setAlternativeSelected}
          />
        </Animated.View>

        <View style={styles.footer}>
          <OutlineButton title="Parar" onPress={handleStop} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}
