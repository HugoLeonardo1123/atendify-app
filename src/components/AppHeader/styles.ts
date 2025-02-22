import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const HeaderComponent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
`;

export const StudentProfile = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const StudentPhoto = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: ${theme.colors.primary200};
    margin-right: 10px;
`;

export const StudentName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${theme.colors.primary200};
`;


export const LogoutButton = styled.TouchableOpacity`
    background-color: ${theme.colors.highlight3};
    padding: 10px;
    border-radius: 8px;
`;