import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {
  fetchEventTypes,
  fetchAvailableTimes,
  scheduleMeeting,
  fetchScheduledEvents,
} from '../../api/calendly';
import {
  groupAvailableTimesByDate,
  groupEventsByDate,
  formatTime,
  isTimeSlotAvailable,
  prepareCalendarMarkedDates,
} from '../../api/utils';
import {
  AvailableTime,
  EventType,
  ScheduledEvent,
  DateData,
  MarkedDates,
} from '../../api/types';

import theme, {
  Container,
  LoadingContainer,
  LoadingText,
  StyledActivityIndicator,
  SectionTitle,
  EventSelector,
  EventButton,
  EventButtonText,
  CalendarContainer,
  ModalContainer,
  ModalContent,
  ModalTitle,
  AppointmentInfo,
  TimesList,
  TimeButton,
  TimeButtonText,
  CloseButton,
  CloseButtonText,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonContainer,
  ConfirmButton,
  ConfirmButtonText,
  CancelButton,
  CancelButtonText,
  LegendContainer,
  LegendItem,
  LegendDot,
  LegendText,
  calendarTheme,
} from './styles';

const CalendlyCalendar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [groupedTimes, setGroupedTimes] = useState<
    Record<string, AvailableTime[]>
  >({});
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([]);
  const [groupedEvents, setGroupedEvents] = useState<
    Record<string, ScheduledEvent[]>
  >({});
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showTimesModal, setShowTimesModal] = useState<boolean>(false);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<AvailableTime | null>(null);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [question, setQuestion] = useState<string>('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await fetchEventTypes();

        if (eventsData.length === 0) {
          Alert.alert('Aviso', 'Nenhum tipo de evento disponível.');
          return;
        }

        setEvents(eventsData);
        setSelectedEvent(eventsData[0]);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        Alert.alert('Erro', 'Não foi possível carregar os tipos de eventos.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    loadCalendarData();
  }, [selectedEvent]);

  const loadCalendarData = async () => {
    if (!selectedEvent) return;

    try {
      setLoading(true);

      const booked = await fetchScheduledEvents(7, 30);
      setScheduledEvents(booked);

      const groupedBooked = groupEventsByDate(booked);
      setGroupedEvents(groupedBooked);

      const times = await fetchAvailableTimes(selectedEvent.uri, 30);

      const groupedAvailable = groupAvailableTimesByDate(times);
      setGroupedTimes(groupedAvailable);

      const availableDates = Object.keys(groupedAvailable);
      const bookedDates = Object.keys(groupedBooked);
      const combinedMarks = prepareCalendarMarkedDates(
        availableDates,
        bookedDates,
        selectedDate || undefined,
      );

      setMarkedDates(combinedMarks);
    } catch (error) {
      console.error('Erro ao carregar dados do calendário:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar horários disponíveis e eventos agendados.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (day: DateData) => {
    const dateString = day.dateString;

    if (!groupedTimes[dateString] || groupedTimes[dateString].length === 0) {
      Alert.alert('Aviso', 'Não há horários disponíveis nesta data.');
      return;
    }

    const availableDates = Object.keys(groupedTimes);
    const bookedDates = Object.keys(groupedEvents);
    const updatedMarks = prepareCalendarMarkedDates(
      availableDates,
      bookedDates,
      dateString,
    );

    setMarkedDates(updatedMarks);
    setSelectedDate(dateString);
    setShowTimesModal(true);
  };

  const selectTime = (time: AvailableTime) => {
    if (!isTimeSlotAvailable(time, scheduledEvents)) {
      Alert.alert(
        'Aviso',
        'Este intervalo de tempo já foi reservado por outro usuário.',
      );
      return;
    }

    setSelectedTime(time);
    setShowTimesModal(false);
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = async () => {
    if (!selectedTime || !name || !email) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (!isTimeSlotAvailable(selectedTime, scheduledEvents)) {
      Alert.alert(
        'Aviso',
        'Este intervalo de tempo já foi reservado por outro usuário. Selecione outro horário.',
      );
      setShowScheduleModal(false);
      return;
    }

    setLoading(true);

    const questions = [
      {
        question: 'Informações adicionais?',
        answer: question || 'Nenhuma',
      },
    ];

    const success = await scheduleMeeting(
      selectedTime.scheduling_url,
      name,
      email,
      questions,
    );

    setLoading(false);

    if (success) {
      Alert.alert('Sucesso', 'Sua reunião foi agendada!');
      setName('');
      setEmail('');
      setQuestion('');
      setSelectedTime(null);
      setShowScheduleModal(false);

      if (selectedEvent) {
        loadCalendarData();
      }
    } else {
      Alert.alert(
        'Erro',
        'Não foi possível agendar a reunião. Tente novamente.',
      );
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <StyledActivityIndicator />
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {events.length > 1 && (
        <EventSelector>
          <SectionTitle>Tipo de reunião:</SectionTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {events.map((event) => (
              <EventButton
                key={event.uri}
                selected={selectedEvent?.uri === event.uri}
                onPress={() => setSelectedEvent(event)}
              >
                <EventButtonText selected={selectedEvent?.uri === event.uri}>
                  {event.name} ({event.duration} min)
                </EventButtonText>
              </EventButton>
            ))}
          </ScrollView>
        </EventSelector>
      )}

      <CalendarContainer>
        <SectionTitle>Datas disponíveis:</SectionTitle>
        <LegendContainer>
          <LegendItem>
            <LegendDot color={theme.colors.highlight5} />
            <LegendText>Disponível</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendDot color={theme.colors.highlight1} />
            <LegendText>Reservado</LegendText>
          </LegendItem>
        </LegendContainer>
        <Calendar
          markingType="multi-dot"
          markedDates={markedDates}
          onDayPress={handleDateSelect}
          theme={calendarTheme}
        />
      </CalendarContainer>

      <Modal
        visible={showTimesModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimesModal(false)}
      >
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Horários Disponíveis - {selectedDate}</ModalTitle>

            <TimesList>
              {selectedDate &&
                groupedTimes[selectedDate]?.map((time, index) => (
                  <TimeButton key={index} onPress={() => selectTime(time)}>
                    <TimeButtonText>
                      {formatTime(time.start_time)}
                    </TimeButtonText>
                  </TimeButton>
                ))}
            </TimesList>

            <CloseButton onPress={() => setShowTimesModal(false)}>
              <CloseButtonText>Fechar</CloseButtonText>
            </CloseButton>
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Modal
        visible={showScheduleModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowScheduleModal(false)}
      >
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Agendar Reunião</ModalTitle>

            {selectedTime && (
              <AppointmentInfo>
                Data: {selectedDate} às {formatTime(selectedTime.start_time)}
              </AppointmentInfo>
            )}

            <FormGroup>
              <Label>Nome*</Label>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Seu nome completo"
              />
            </FormGroup>

            <FormGroup>
              <Label>Email*</Label>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="seu.email@exemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FormGroup>

            <FormGroup>
              <Label>Observações (opcional)</Label>
              <TextArea
                value={question}
                onChangeText={setQuestion}
                placeholder="Alguma informação adicional para o professor?"
                multiline
                numberOfLines={4}
              />
            </FormGroup>

            <ButtonContainer>
              <CancelButton onPress={() => setShowScheduleModal(false)}>
                <CancelButtonText>Cancelar</CancelButtonText>
              </CancelButton>

              <ConfirmButton onPress={handleScheduleSubmit}>
                <ConfirmButtonText>Confirmar</ConfirmButtonText>
              </ConfirmButton>
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default CalendlyCalendar;
