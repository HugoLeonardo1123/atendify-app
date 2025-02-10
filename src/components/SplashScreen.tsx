import React, { useEffect, useState } from "react";
import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import theme from "../global/styles/theme";

interface SplashScreenProps {
    onAnimationComplete?: () => void;
}

const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.gray50};
    align-items: center;
    justify-content: center;
`;

const AnimatedLogo = styled(Animated.Image)`
    width: ${Dimensions.get("window").width * 0.8}px;
    height: ${Dimensions.get("window").width * 0.8}px;
`;

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start(() => {
            if (onAnimationComplete) {
                onAnimationComplete();
            }
        });
    }, []);

    return (
        <Container>
            <AnimatedLogo
                source={require("../../assets/logo.png")}
                style={{
                    transform: [
                        {
                            scale: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.3, 1],
                            }),
                        },
                    ],
                    opacity: animation,
                }}
                resizeMode="contain"
            />
        </Container>
    );
};

export default SplashScreen;
