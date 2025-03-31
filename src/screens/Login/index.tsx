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
import { makeRedirectUri } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

// ios 570429017028-c83tptvl1aepfcl9u0tr6urn0vgdmopq.apps.googleusercontent.com
// aindroid 570429017028-6n92r66vbp1k9mbfe1umrji6vm2130l0.apps.googleusercontent.com
// sh1 25:43:6F:97:6F:C0:E4:39:86:12:73:33:DF:A5:0E:02:22:97:6E:F5
export function Login() {
  const [userInfo, setUserInfo] = React.useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '570429017028-6n92r66vbp1k9mbfe1umrji6vm2130l0.apps.googleusercontent.com',
    iosClientId:
      '570429017028-c83tptvl1aepfcl9u0tr6urn0vgdmopq.apps.googleusercontent.com',
  });

  return (
    <Container>
      <Title style={{ textAlign: 'center' }}>Bem Vindo(a) ao</Title>
      <IconImage source={require('../../../assets/logo.png')} />
      <InitialImage source={require('../../../assets/initial-image.png')} />
      <LoginGoogle onPress={() => promptAsync()}>
        <ButtonBox style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="google" size={24} color="white" />
          <TextButton style={{ marginLeft: 10, color: 'white' }}>
            Entrar com o Google
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
