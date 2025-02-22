import styled from "styled-components/native"
import theme from "../../global/styles/theme";
import { TouchableOpacity} from "react-native";


export const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.gray50};
    padding: 16px;
`;

export const HorariosContainer = styled.View`
    flex: 1;
    display: flex;
    align-items: center;
`

export const HorarioTitle = styled.Text`
    color: ${theme.colors.primary300};
    align-self: self-start;
    font-size: 24px;
    font-weight: 600;
`

export const HorarioBox = styled.View`
    margin-top: 24px;
    width: 95%;
    border-radius: 6px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${theme.colors.white};
    padding: 24px 12px;
`

export const HorarioDate = styled.Text`
    color: ${theme.colors.primary300};
    font-weight: 600;
    font-size: 20px;
`

export const ButtonCancel = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.highlight1};
    width: 100px;
    border-radius: 4px;
    padding: 8px 10px;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;
