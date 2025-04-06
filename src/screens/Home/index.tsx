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
import React, { useEffect, useState } from 'react';
import { fetchUserInfo } from '../../api/calendly';
import { AppHeader } from '../../components/AppHeader/AppHeader';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [professorName, setProfessorName] = useState('Carregando...');

  useEffect(() => {
    const loadUser = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo?.name) {
        setProfessorName(userInfo.name);
      } else {
        setProfessorName('Professor');
      }
    };

    loadUser();
  }, []);

  const navegarParaAgendamentos = () => {
    navigation.navigate('Agendar');
  };

  const navegarParaHorarios = () => {
    navigation.navigate('Horario');
  };

  const nome = professorName.split(' ')[0];
  let sobrenome;
  if (professorName.split(' ').length > 2) {
    sobrenome = professorName.split(' ')[1];
  }

  return (
    <Container>
      <AppHeader />
      <HomeBody>
        <ProfessorInfo>
          <ProfessorPhoto
            source={require('../../../assets/default-avatar-48.png')}
          ></ProfessorPhoto>
          <ProfessorName>
            {nome} {sobrenome && ` ${sobrenome}`}
          </ProfessorName>
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
