import * as React from 'react';
import {
  Container,
  Title,
  IconImage,
  InitialImage,
  LoginGoogle,
  TextButton,
  ButtonBox,
  LoginApple,
} from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { Alert } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

WebBrowser.maybeCompleteAuthSession();

export function Login() {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '570429017028-6n92r66vbp1k9mbfe1umrji6vm2130l0.apps.googleusercontent.com',
    iosClientId:
      '570429017028-c83tptvl1aepfcl9u0tr6urn0vgdmopq.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    const handleSignIn = async () => {
      if (response?.type === 'success') {
        try {
          setIsSubmitting(true);
          const { authentication } = response;
          if (authentication?.accessToken) {
            const userInfoResponse = await fetch(
              'https://www.googleapis.com/userinfo/v2/me',
              {
                headers: {
                  Authorization: `Bearer ${authentication.accessToken}`,
                },
              },
            );
            const userData = await userInfoResponse.json();

            await AsyncStorage.setItem('@user', JSON.stringify(userData));

            setUser(userData);
            setIsAuthenticated(true);
          }
        } catch (error) {
          Alert.alert('Erro', 'Falha ao buscar informações do usuário.');
          console.log('Error fetching user info:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    handleSignIn();
  }, [response]);

  return (
    <Container>
      <Title style={{ textAlign: 'center' }}>Bem Vindo(a) ao</Title>
      <IconImage source={require('../../../assets/logo.png')} />
      <InitialImage source={require('../../../assets/initial-image.png')} />

      <LoginGoogle
        disabled={!request || isSubmitting}
        onPress={() => promptAsync()}
      >
        <ButtonBox style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="google" size={24} color="white" />
          <TextButton style={{ marginLeft: 10, color: 'white' }}>
            {isSubmitting ? 'Entrando...' : 'Entrar com o Google'}
          </TextButton>
        </ButtonBox>
      </LoginGoogle>

      <LoginApple>
        <ButtonBox style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="apple1" size={24} color="white" />
          <TextButton style={{ marginLeft: 10, color: 'white' }}>
            Entrar com a Apple
          </TextButton>
        </ButtonBox>
      </LoginApple>
    </Container>
  );
}
