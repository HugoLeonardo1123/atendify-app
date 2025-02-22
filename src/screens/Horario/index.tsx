import { ScrollView } from "react-native";
import {
    Container,
    HorariosContainer,
    HorarioTitle,
    HorarioBox,
    HorarioDate,
    ButtonCancel,
    ButtonText
} from "./styles";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import theme from "../../global/styles/theme";

export function Horario() {
    return (
        <Container>
            <AppHeader />
            <HorarioTitle>AGENDAMENTOS:</HorarioTitle>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                <HorariosContainer>
                    <HorarioBox>
                        <HorarioDate>10/03/2025</HorarioDate>
                        <ButtonCancel>
                            <ButtonText onPress={() => console.log("Cancel Pressed")}>Cancelar</ButtonText>
                        </ButtonCancel>
                    </HorarioBox>

                    <HorarioBox>
                        <HorarioDate>10/03/2025</HorarioDate>
                        <ButtonCancel>
                            <ButtonText onPress={() => console.log("Cancel Pressed")}>Cancelar</ButtonText>
                        </ButtonCancel>
                    </HorarioBox>

                    <HorarioBox>
                        <HorarioDate>10/03/2025</HorarioDate>
                        <ButtonCancel>
                            <ButtonText onPress={() => console.log("Cancel Pressed")}>Cancelar</ButtonText>
                        </ButtonCancel>
                    </HorarioBox>

                    <HorarioBox>
                        <HorarioDate>10/03/2025</HorarioDate>
                        <ButtonCancel>
                            <ButtonText onPress={() => console.log("Cancel Pressed")}>Cancelar</ButtonText>
                        </ButtonCancel>
                    </HorarioBox>

                    <HorarioBox>
                        <HorarioDate>10/03/2025</HorarioDate>
                        <FontAwesome name="check-square" size={32} color={theme.colors.highlight4} />
                    </HorarioBox>

                    <HorarioBox>
                        <HorarioDate>10/03/2025</HorarioDate>
                        <FontAwesome name="check-square" size={32} color={theme.colors.highlight4} />
                    </HorarioBox>

                    <HorarioBox>
                        <HorarioDate>10/03/2025</HorarioDate>
                        <FontAwesome name="check-square" size={32} color={theme.colors.highlight4} />
                    </HorarioBox>

                    <HorarioBox>
                        <HorarioDate>10/03/2025</HorarioDate>
                        <FontAwesome name="check-square" size={32} color={theme.colors.highlight4} />
                    </HorarioBox>
                </HorariosContainer>
            </ScrollView>
        </Container>
    );
}
