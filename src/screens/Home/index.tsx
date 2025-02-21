import {
    Container, HomeBody,
    HomeHeader, IconBox, InfoBox, InfoText, LogoutButton,
    ProfessorInfo, ProfessorName,
    ProfessorPhoto,
    StudentName,
    StudentPhoto,
    StudentProfile
} from "./styles";
import {useNavigation} from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import {InfoBoxComponent} from "../../components/InfoBoxContent";
import theme from "../../global/styles/theme";
import {RootStackParamList} from "../../types/types";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React from "react";



type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

export function Home() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const navigateToScheduling = () => {
        navigation.navigate('Agendar');
    };

    return (
        <Container>
            <HomeHeader>
                <StudentProfile>
                    <StudentPhoto></StudentPhoto>
                    <StudentName>Mateus Borges</StudentName>
                </StudentProfile>

                <LogoutButton>
                    <MaterialIcons name="logout" size={24} color="white" />
                </LogoutButton>
            </HomeHeader>

            <HomeBody>
                <ProfessorInfo>
                    <ProfessorPhoto></ProfessorPhoto>
                    <ProfessorName>Leonardo</ProfessorName>
                </ProfessorInfo>
                <InfoBox>
                    <IconBox bgColor={theme.colors.highlight1}>
                        <Octicons name="number" size={24} color="white" />
                    </IconBox>
                    <InfoText>4 agendamentos</InfoText>
                </InfoBox>
                <InfoBoxComponent
                    onPress={navigateToScheduling}
                    icon={<MaterialIcons name="schedule" size={24} color="white" />}
                    text="Ver agendamentos"
                    bgColor={theme.colors.highlight2}
                />
                <InfoBoxComponent
                    onPress={navigateToScheduling}
                    icon={<MaterialIcons name="event" size={24} color="white" />}
                    text="Novo agendamento"
                    bgColor={theme.colors.highlight3}
                />
            </HomeBody>
        </Container>
    );
}


