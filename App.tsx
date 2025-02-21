import {ThemeProvider} from "styled-components";
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import {Loading} from "./src/components/Loading";
import theme from "./src/global/styles/theme"
import {useState} from "react";
import SplashScreen from "./src/components/SplashScreen";
import MainNavigator from "./src/routes/mainNavigator";


export default function App() {
    const [showSplash, setShowSplash] = useState(true);

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold
    });

    if(!fontsLoaded) {
        return <Loading />;
    }

    return (
        <ThemeProvider theme={theme}>
            {showSplash ? (
                <SplashScreen onAnimationComplete={() => setShowSplash(false)} />
            ) : (
                <>
                    <MainNavigator />
                </>
            )}
        </ThemeProvider>
    );
}