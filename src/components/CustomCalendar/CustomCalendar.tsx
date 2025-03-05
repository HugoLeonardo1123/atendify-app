import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { Container, TimeButton, SelectedDate, TimeButtonText } from './styles';
import theme from '../../global/styles/theme';
import { AvailabilitySchedule, TimeInterval } from '../../api/types';

type Props = {
  schedules: AvailabilitySchedule[];
};

export default function CustomCalendar({ schedules }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});

  const getDayOfWeek = (date: string): string => {
    return new Date(date)
      .toLocaleString('en-US', { weekday: 'long' })
      .toLowerCase();
  };

  useEffect(() => {
    const newMarkedDates: { [date: string]: any } = {};

    schedules.forEach((schedule) => {
      schedule.rules.forEach((rule) => {
        if (rule.type === 'date' && rule.intervals.length > 0) {
          if (rule.date) {
            newMarkedDates[rule.date] = {
              marked: true,
              dotColor: theme.colors.highlight3,
            };
          }
        } else if (rule.type === 'wday' && rule.intervals.length > 0) {
          const startDate = new Date('2025-02-22');
          const endDate = new Date('2025-08-30');
          const currentDate = new Date(startDate);

          while (currentDate <= endDate) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            const dayOfWeek = getDayOfWeek(formattedDate);

            if (dayOfWeek === rule.wday) {
              newMarkedDates[formattedDate] = {
                marked: true,
                dotColor: theme.colors.highlight3,
              };
            }

            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      });
    });

    setMarkedDates(newMarkedDates);
  }, [schedules]);

  const getAvailableTimesForDate = (date: string) => {
    const dayOfWeek = getDayOfWeek(date);
    const availableIntervals: TimeInterval[] = [];

    schedules.forEach((schedule) => {
      const dateRule = schedule.rules.find(
        (rule) => rule.type === 'date' && rule.date === date,
      );

      if (dateRule) {
        availableIntervals.push(...dateRule.intervals);
        return;
      }

      const weekdayRule = schedule.rules.find(
        (rule) =>
          rule.type === 'wday' &&
          rule.wday === dayOfWeek &&
          rule.intervals.length > 0,
      );

      if (weekdayRule) {
        availableIntervals.push(...weekdayRule.intervals);
      }
    });

    return availableIntervals
      .flatMap((interval) => generateTimesInInterval(interval))
      .filter((time, index, self) => self.indexOf(time) === index)
      .sort();
  };

  const generateTimesInInterval = (interval: TimeInterval): string[] => {
    const times: string[] = [];
    const [startHour, startMinute] = interval.from.split(':').map(Number);
    const [endHour, endMinute] = interval.to.split(':').map(Number);

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute <= endMinute)
    ) {
      const timeString = `${currentHour
        .toString()
        .padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      times.push(timeString);

      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour++;
        currentMinute -= 60;
      }
    }

    return times;
  };

  useEffect(() => {
    if (selectedDate) {
      const times = getAvailableTimesForDate(selectedDate);
      setAvailableTimes(times);
    }
  }, [selectedDate, schedules]);

  return (
    <Container>
      <Calendar
        current={'2025-02-22'}
        minDate={'2025-02-22'}
        maxDate={'2025-08-30'}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          ...(selectedDate
            ? {
                [selectedDate]: {
                  selected: true,
                  selectedColor: theme.colors.primary200,
                },
              }
            : {}),
        }}
        theme={{
          todayTextColor: theme.colors.highlight3,
          textSectionTitleColor: theme.colors.primary300,
          selectedDayBackgroundColor: theme.colors.primary200,
          textDisabledColor: theme.colors.gray200,
          arrowColor: theme.colors.primary200,
          monthTextColor: theme.colors.primary300,
        }}
      />

      {selectedDate && (
        <>
          <SelectedDate>Horários para {selectedDate}:</SelectedDate>
          {availableTimes.length > 0 ? (
            availableTimes.map((time, index) => (
              <TimeButton
                key={`${selectedDate}-${time}-${index}`}
                onPress={() => console.log(`Selecionado: ${time}`)}
              >
                <TimeButtonText>{time}</TimeButtonText>
              </TimeButton>
            ))
          ) : (
            <SelectedDate>Sem horários disponíveis</SelectedDate>
          )}
        </>
      )}
    </Container>
  );
}
