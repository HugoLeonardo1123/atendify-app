import styled from 'styled-components/native';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray50};
  padding: 16px;
`;

export const Message = styled.Text`
  color: ${theme.colors.primary300};
  font-size: 24px;
`;
