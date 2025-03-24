import styled from 'styled-components/native';
import theme from '../../global/styles/theme';
import { KeyboardAvoidingView } from 'react-native';

export const SafeContainer = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${theme.colors.gray50};
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: 16px;
`;
