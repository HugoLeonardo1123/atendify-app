import styled from 'styled-components/native';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray50};
  padding: 20px;
`;

export const HorariosContainer = styled.View`
  margin-top: 20px;
`;

export const HorarioTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primary300};
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const HorarioBox = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: ${theme.colors.gray200};
  shadow-offset: 0px 2px;
`;

export const EventInfoContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const HorarioDate = styled.Text`
  font-size: 16px;
  font-family: ${theme.fonts.semibold};
  color: ${theme.colors.primary300};
  margin-bottom: 4px;
`;

export const HorarioTime = styled.Text`
  font-size: 14px;
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.primary200};
  margin-bottom: 6px;
`;

export const HorarioDetails = styled.Text`
  font-size: 14px;
  font-family: ${theme.fonts.medium};
  color: ${theme.colors.gray200};
`;

export const ButtonCancel = styled.TouchableOpacity`
  background-color: ${theme.colors.highlight1};
  padding: 8px 12px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.bold};
  font-size: 14px;
`;

export const EmptyListMessage = styled.Text`
  text-align: center;
  color: ${theme.colors.gray200};
  font-size: 16px;
  font-family: ${theme.fonts.medium};
  margin-top: 40px;
  align-self: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
