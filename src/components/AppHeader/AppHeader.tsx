import {HeaderComponent, LogoutButton, StudentName, StudentPhoto, StudentProfile} from "./styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

export function AppHeader() {
    return (
        <HeaderComponent>
            <StudentProfile>
                <StudentPhoto></StudentPhoto>
                <StudentName>Mateus Borges</StudentName>
            </StudentProfile>

            <LogoutButton>
                <MaterialIcons name="logout" size={24} color="white" />
            </LogoutButton>
        </HeaderComponent>
    )
}