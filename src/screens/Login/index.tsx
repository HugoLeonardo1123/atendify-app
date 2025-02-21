import {Container, Title, IconImage, InitialImage, LoginGoogle, TextButton, ButtonBox, LoginApple} from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';

export function Login({ onLogin }: { onLogin: () => void }) {
    return (
        <Container>
            <Title style={{ textAlign: "center" }}>Bem Vindo(a) ao</Title>
            <IconImage source={require('../../../assets/logo.png')} />
            <InitialImage source={require('../../../assets/initial-image.png')} />
            <LoginGoogle onPress={onLogin}>
                <ButtonBox style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="google" size={24} color="white" />
                    <TextButton style={{ marginLeft: 10, color: "white" }}>Entrar com o Google</TextButton>
                </ButtonBox>
            </LoginGoogle>

            <LoginApple onPress={onLogin}>
                <ButtonBox style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="apple1" size={24} color="white" />
                    <TextButton style={{ marginLeft: 10, color: "white" }}>Entrar com a Apple</TextButton>
                </ButtonBox>
            </LoginApple>
        </Container>
    );
}
