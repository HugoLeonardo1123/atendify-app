import styled from "styled-components/native";
import {TouchableOpacity} from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

export const TimeButton = styled(TouchableOpacity)`
  background-color: #fff;
  border: 1px solid #007bff;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  align-items: center;
`;

export const TimeButtonText = styled.Text`
  color: #007bff;
  font-size: 16px;
  font-weight: 600;
`;

export const SelectedDate = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;