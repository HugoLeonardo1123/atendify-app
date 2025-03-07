import theme from '../../global/styles/theme';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, TouchableOpacity } from 'react-native';
import { AvailabilityRule } from '../../api/types';

interface CustomCalendarProps {
  availabilityRules: AvailabilityRule[];
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  availabilityRules,
}) => {
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    const newMarkedDates: Record<string, any> = {};

    availabilityRules.forEach((rule) => {
      if (rule.type === 'date' && rule.date && rule.intervals.length > 0) {
        newMarkedDates[rule.date] = {
          marked: true,
          dotColor: theme.colors.highlight3,
        };
      }
    });

    setMarkedDates(newMarkedDates);
  }, [availabilityRules]);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);

    const ruleForDate = availabilityRules.find(
      (rule) => rule.type === 'date' && rule.date === day.dateString,
    );

    if (ruleForDate && ruleForDate.intervals.length > 0) {
      setAvailableTimes(
        ruleForDate.intervals.map(
          (interval) => `${interval.from} - ${interval.to}`,
        ),
      );
    } else {
      setAvailableTimes([]);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        minDate={new Date().toISOString().split('T')[0]}
        maxDate={'2025-12-31'}
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          ...(selectedDate
            ? {
                [selectedDate]: {
                  selected: true,
                  selectedColor: theme.colors.primary200,
                  marked: true,
                  dotColor: theme.colors.primary100,
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
        <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
            Available times for {selectedDate}:
          </Text>

          {availableTimes.length > 0 ? (
            availableTimes.map((time, index) => (
              <TouchableOpacity
                key={`${selectedDate}-${time}-${index}`}
                onPress={() => console.log(`Selected: ${time}`)}
                style={{
                  padding: 12,
                  backgroundColor: theme.colors.primary200,
                  borderRadius: 8,
                  marginBottom: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>{time}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ fontSize: 14, color: theme.colors.gray200 }}>
              Sem horarios disponíveis
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default CustomCalendar;
