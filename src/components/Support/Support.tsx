import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Support() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Підтримка</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Написати в Тех. Підтримку</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Подзвонити в Тех. Підтримку</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        color: '#333',
        marginBottom: 12,
        fontWeight: '600',
    },
    buttonContainer: {
        gap: 12,
    },
    button: {
        backgroundColor: '#059c75',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});
