import { ContentContainer, SafeContainer } from './styles';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import CalendlyCalendar from '../../components/CalendlyCalendar/CalendlyCalendar';
import { Platform } from 'react-native';

export function Agendar() {
  return (
    <SafeContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ContentContainer>
        <AppHeader />
        <CalendlyCalendar />
      </ContentContainer>
    </SafeContainer>
  );
}
