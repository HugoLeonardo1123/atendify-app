import {
  Container,
  HomeBody,
  ProfessorInfo,
  ProfessorName,
  ProfessorPhoto,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { InfoBoxComponent } from '../../components/InfoBoxContent';
import theme from '../../global/styles/theme';
import { RootStackParamList } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navegarParaAgendamentos = () => {
    navigation.navigate('Agendar');
  };

  const navegarParaHorarios = () => {
    navigation.navigate('Horario');
  };

  return (
    <Container>
      <AppHeader />
      <HomeBody>
        <ProfessorInfo>
          <ProfessorPhoto
            source={require('../../../assets/default-avatar-48.png')}
          ></ProfessorPhoto>
          <ProfessorName>Leonardo</ProfessorName>
        </ProfessorInfo>
        <InfoBoxComponent
          onPress={navegarParaHorarios}
          icon={<MaterialIcons name="schedule" size={24} color="white" />}
          text="Ver agendamentos"
          bgColor={theme.colors.highlight2}
        />
        <InfoBoxComponent
          onPress={navegarParaAgendamentos}
          icon={<MaterialIcons name="event" size={24} color="white" />}
          text="Novo agendamento"
          bgColor={theme.colors.highlight3}
        />
      </HomeBody>
    </Container>
  );
}
