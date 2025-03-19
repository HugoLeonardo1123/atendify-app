import { Container } from './styles';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import CalendlyCalendar from '../../components/CalendlyCalendar/CalendlyCalendar';

export function Agendar() {
  return (
    <Container>
      <AppHeader />
      <CalendlyCalendar />
    </Container>
  );
}
