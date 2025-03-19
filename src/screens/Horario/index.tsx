import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  Container,
  HorariosContainer,
  HorarioTitle,
  HorarioBox,
  HorarioDate,
  HorarioTime,
  HorarioDetails,
  ButtonCancel,
  ButtonText,
  EmptyListMessage,
  LoadingContainer,
  EventInfoContainer,
} from './styles';

import { AppHeader } from '../../components/AppHeader/AppHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import theme from '../../global/styles/theme';
import { ScheduledEvent } from '../../api/types';
import { cancelScheduledEvent, fetchEventsByEmail } from '../../api/calendly';
import { formatEventTime } from '../../api/utils';
import { TEST_EMAIL } from '@env';

export function Horario() {
  const [events, setEvents] = useState<ScheduledEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userEmail = TEST_EMAIL;

  const fetchEvents = useCallback(async () => {
    try {
      setError(null);
      const response = await fetchEventsByEmail(userEmail);

      const sortedEvents = [...response].sort(
        (a, b) =>
          new Date(b.start_time).getTime() - new Date(a.start_time).getTime(),
      );

      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Não foi possível carregar seus agendamentos. Tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEvents();
  }, [fetchEvents]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getEventName = (event: ScheduledEvent) => {
    const uriParts = event.uri.split('/');
    const eventId = uriParts[uriParts.length - 1];
    return event.name || `Agendamento #${eventId.substring(0, 6)}`;
  };

  const handleCancel = async (eventUri: string) => {
    try {
      Alert.alert(
        'Cancelar agendamento',
        'Tem certeza que deseja cancelar este agendamento?',
        [
          { text: 'Não', style: 'cancel' },
          {
            text: 'Sim',
            onPress: async () => {
              setLoading(true);
              const success = await cancelScheduledEvent(eventUri);
              if (success) {
                setEvents(events.filter((event) => event.uri !== eventUri));
                Alert.alert('Sucesso', 'Agendamento cancelado com sucesso.');
              } else {
                Alert.alert(
                  'Erro',
                  'Não foi possível cancelar o agendamento. Tente novamente.',
                );
              }
              setLoading(false);
            },
          },
        ],
      );
    } catch (error) {
      console.error('Error canceling event:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar cancelar o agendamento.');
    }
  };

  if (loading && !refreshing) {
    return (
      <Container>
        <AppHeader />
        <HorarioTitle>AGENDAMENTOS:</HorarioTitle>
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary200} />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <AppHeader />
      <HorarioTitle>AGENDAMENTOS:</HorarioTitle>
      {error ? (
        <EmptyListMessage>{error}</EmptyListMessage>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 20,
            flexGrow: events.length === 0 ? 1 : undefined,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary200]}
            />
          }
        >
          {events.length === 0 ? (
            <EmptyListMessage>Você não possui agendamentos.</EmptyListMessage>
          ) : (
            <HorariosContainer>
              {events.map((event) => {
                const isPast = new Date(event.start_time) < new Date();
                return (
                  <HorarioBox key={event.uri}>
                    <EventInfoContainer>
                      <HorarioDate>{formatDate(event.start_time)}</HorarioDate>
                      <HorarioTime>{formatEventTime(event)}</HorarioTime>
                      <HorarioDetails>{getEventName(event)}</HorarioDetails>
                    </EventInfoContainer>
                    {isPast ? (
                      <FontAwesome
                        name="check-square"
                        size={32}
                        color={theme.colors.highlight4}
                      />
                    ) : (
                      <ButtonCancel onPress={() => handleCancel(event.uri)}>
                        <ButtonText>Cancelar</ButtonText>
                      </ButtonCancel>
                    )}
                  </HorarioBox>
                );
              })}
            </HorariosContainer>
          )}
        </ScrollView>
      )}
    </Container>
  );
}
