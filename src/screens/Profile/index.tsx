import { Container } from "./styles";
import { Text, Button } from "react-native";

export function Profile({ onLogout }: { onLogout: () => void }) {
    return (
        <Container>
            <Text style={{ textAlign: "center" }}>Profile</Text>
            <Button title="Logout" onPress={onLogout} />
        </Container>
    );
}
