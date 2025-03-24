import styled from 'styled-components/native';

import { ActivityIndicator } from 'react-native';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${theme.colors.white};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.Text`
  margin-top: 10px;
  color: ${theme.colors.primary200};
  font-size: 16px;
  font-family: ${theme.fonts.medium};
`;

export const StyledActivityIndicator = styled(ActivityIndicator).attrs({
  size: 'large',
  color: theme.colors.primary200,
})``;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-family: ${theme.fonts.bold};
  margin-bottom: 12px;
  color: ${theme.colors.primary300};
`;

export const EventSelector = styled.View`
  margin-bottom: 20px;
`;

export const EventButton = styled.TouchableOpacity<{ selected?: boolean }>`
  padding: 12px;
  margin-right: 10px;
  background-color: ${(props) =>
    props.selected ? theme.colors.primary200 : theme.colors.gray50};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props) =>
    props.selected ? theme.colors.primary200 : theme.colors.gray200};
`;

export const EventButtonText = styled.Text<{ selected?: boolean }>`
  font-size: 14px;
  color: ${(props) =>
    props.selected ? theme.colors.white : theme.colors.primary300};
  font-family: ${theme.fonts.medium};
`;

export const CalendarContainer = styled.View``;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding-horizontal: 20px;
`;

export const ModalContent = styled.View`
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 12px;
  padding: 20px;
  max-height: 90%;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-family: ${theme.fonts.bold};
  margin-bottom: 15px;
  text-align: center;
  color: ${theme.colors.primary300};
`;

export const AppointmentInfo = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  color: ${theme.colors.primary200};
  font-family: ${theme.fonts.medium};
`;

export const TimesList = styled.ScrollView`
  max-height: 300px;
`;

export const TimeButton = styled.TouchableOpacity`
  background-color: ${theme.colors.gray50};
  padding: 15px;
  margin-vertical: 5px;
  border-radius: 8px;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.gray200};
`;

export const TimeButtonText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.primary300};
  font-family: ${theme.fonts.medium};
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: ${theme.colors.gray200};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  margin-top: 15px;
`;

export const CloseButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: ${theme.fonts.medium};
`;

export const FormGroup = styled.View`
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${theme.colors.primary300};
  font-family: ${theme.fonts.medium};
  margin-bottom: 5px;
`;

export const Input = styled.TextInput`
  background-color: ${theme.colors.gray50};
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.colors.gray200};
  font-family: ${theme.fonts.regular};
`;

export const TextArea = styled(Input)`
  min-height: 100px;
  text-align-vertical: top;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary200};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  flex: 0.48;
`;

export const ConfirmButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: ${theme.fonts.medium};
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: ${theme.colors.gray200};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  flex: 0.48;
`;

export const CancelButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: 16px;
  font-family: ${theme.fonts.medium};
`;

export const LegendContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

export const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LegendDot = styled.View<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 5px;
  background-color: ${(props: { color: any }) => props.color};
`;

export const LegendText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.primary300};
  font-family: ${theme.fonts.regular};
`;

export const calendarTheme = {
  calendarBackground: theme.colors.white,
  textSectionTitleColor: theme.colors.primary200,
  selectedDayBackgroundColor: theme.colors.primary200,
  todayTextColor: theme.colors.primary200,
  arrowColor: theme.colors.primary200,
  dotColor: theme.colors.highlight4,
  selectedDotColor: theme.colors.white,
};

export default theme;
