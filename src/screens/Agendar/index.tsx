import { Container, Message } from './styles';
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { AvailabilitySchedule } from '../../api/types';
import { getUserAvailability, getUserUri } from '../../api/calendly';

export function Agendar() {
  const [schedules, setSchedules] = useState<AvailabilitySchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailabilitySchedule = async () => {
      try {
        const uri = await getUserUri();
        if (!uri) return;
        const response = await getUserAvailability(uri);

        setSchedules(response);
      } catch (error) {
        console.error('Error fetching availability schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilitySchedule();
  }, []);

  if (loading) {
    return (
      <Container>
        <AppHeader />
        {/* Add loading */}
      </Container>
    );
  }

  return (
    <Container>
      <AppHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        {schedules.length > 0 ? (
          <CustomCalendar availabilityRules={schedules[0].rules} />
        ) : (
          <>
            <Message>No schedules available</Message>
          </>
        )}
      </ScrollView>
    </Container>
  );
}
