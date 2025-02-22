import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import {Container,TimeButton,SelectedDate,TimeButtonText} from "./styles";
import theme from "../../global/styles/theme";

export default function CustomCalendar() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const availableTimes = ["14:00", "17:30"];

    return (
        <Container>
            <Calendar
                current={"2025-02-22"}
                minDate={"2025-02-22"}
                maxDate={"2025-08-30"}
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{
                    [selectedDate ?? ""]: {
                        selected: true,
                        selectedColor: `${theme.colors.primary200}`,
                    },
                }}
                theme={{
                    todayTextColor: `${theme.colors.highlight3}`,
                    textSectionTitleColor: `${theme.colors.primary300}`,
                    selectedDayBackgroundColor: `${theme.colors.primary200}`,
                    textDisabledColor: `${theme.colors.gray200}`,
                    arrowColor: `${theme.colors.primary200}`,
                    monthTextColor: `${theme.colors.primary300}`,
                }}
            />

            {selectedDate && (
                <>
                    <SelectedDate>Horários para {selectedDate}:</SelectedDate>
                    {availableTimes.map((time) => (
                        <TimeButton key={time} onPress={() => console.log(`Selecionado: ${time}`)}>
                            <TimeButtonText>{time}</TimeButtonText>
                        </TimeButton>
                    ))}
                </>
            )}
        </Container>
    );
}