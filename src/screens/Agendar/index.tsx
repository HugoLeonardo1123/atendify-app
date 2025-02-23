import { Container } from "./styles";
import CustomCalendar from "../../components/CustomCalendar/CustomCalendar";
import {AppHeader} from "../../components/AppHeader/AppHeader";
import {ScrollView} from "react-native";

export function Agendar() {
    return (
        <Container>
            <AppHeader />
            <ScrollView  showsVerticalScrollIndicator={false}>
                <CustomCalendar />
            </ScrollView >
        </Container>
    );
}
