import styled from "styled-components/native"
import theme from "../../global/styles/theme";
import {TouchableOpacity} from "react-native";


export const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.gray50};
    gap: 16px;
    align-items: center;
    justify-content: center;
`;

export const ButtonsContainer = styled.View`
    background-color: ${theme.colors.white};
    align-self: flex-end;
    padding: 16px;
`;

export const Title = styled.Text`
    font-size: 40px;
    color: ${theme.colors.primary300};
    font-weight: 600;
`
export const IconImage = styled.Image`
    width: 100px;
    height: 65px;
`

export const InitialImage = styled.Image`
    width: 314px;
    height: 263px;
`
export const TextButton = styled.Text`
    font-size: 16px;
    color: ${theme.colors.white};
    font-weight: 600;
    margin-left: 10px;
`

export const ButtonBox = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const LoginGoogle = styled(TouchableOpacity)`
    width: 90%;
    padding: 16px;
    display: flex;
    background: ${theme.colors.primary200};
    border-radius: 8px;
    align-items: center; 
    justify-content: center;
`;

export const LoginApple = styled(TouchableOpacity)`
    width: 90%;
    padding: 16px;
    display: flex;
    background: ${theme.colors.highlight2};
    border-radius: 8px;
    align-items: center; 
    justify-content: center;
`;


