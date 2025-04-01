import {
  HeaderComponent,
  LogoutButton,
  StudentName,
  StudentPhoto,
  StudentProfile,
} from './styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Alert } from 'react-native';

export function AppHeader() {
  const { user, signOut } = useContext(AuthContext);

  const userName = user?.name || 'Usuário';
  const userPhoto = user?.picture || null;

  const handleLogout = async () => {
    try {
      Alert.alert('Logout', 'Tem certeza que deseja sair?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            console.log('Initiating logout...');
            await signOut();
            console.log('Logout completed');
          },
        },
      ]);
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
    }
  };

  return (
    <HeaderComponent>
      <StudentProfile>
        <StudentPhoto
          source={
            userPhoto
              ? { uri: userPhoto }
              : require('../../../assets/default-avatar-48.png')
          }
        />
        <StudentName>{userName}</StudentName>
      </StudentProfile>

      <LogoutButton onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="white" />
      </LogoutButton>
    </HeaderComponent>
  );
}
