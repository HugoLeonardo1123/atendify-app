import styled from 'styled-components/native';

import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray50};
  padding: 16px;
`;

export const HomeBody = styled.View`
  flex: 1;
`;

export const ProfessorInfo = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.highlight3};
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

export const ProfessorPhoto = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${theme.colors.primary200};
  margin-right: 10px;
`;

export const ProfessorName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.white};
`;

export const InfoBoxDisplay = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.gray50};
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

export const InfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.white};
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

export const IconBox = styled.View<{ bgColor: string }>`
  background-color: ${(props: { bgColor: any }) => props.bgColor};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  margin-right: 12px;
`;

export const InfoText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.primary300};
`;

export const InfoText2 = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.highlight3};
`;
