import {IconBox, InfoBox, InfoText} from "../screens/Home/styles";
import { TouchableOpacity } from 'react-native';
import React from "react";

interface InfoBoxProps {
    icon: React.ReactNode;
    text: string;
    bgColor: string;
    onPress: () => void;
}

export const InfoBoxComponent: React.FC<InfoBoxProps> = ({ icon, text, bgColor, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <InfoBox>
            <IconBox bgColor={bgColor}>
                {icon}
            </IconBox>
            <InfoText>{text}</InfoText>
        </InfoBox>
    </TouchableOpacity>
);
