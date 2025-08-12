import {FlatList, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from 'react';

export const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    // In a real app, you would fetch notifications from an API
    useEffect(() => {
        // Simulating API call
        setLoading(true);
        setTimeout(() => {
            setNotifications([]);
            setLoading(false);
        }, 1000);
    }, []);

    const renderItem = ({item}) => (
        <View style={styles.notificationItem}>
            <View style={styles.notificationDot}/>
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
        </View>
    );

    const EmptyNotifications = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No New Notifications</Text>
            <Text style={styles.emptySubtitle}>You're all caught up! We'll notify you when there's something new.</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={EmptyNotifications}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    listContainer: {
        flexGrow: 1,
        padding: 16
    },
    notificationItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2
    },
    notificationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#4CAF50',
        marginTop: 5,
        marginRight: 12
    },
    notificationContent: {
        flex: 1
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        color: '#333333'
    },
    notificationMessage: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 8
    },
    notificationTime: {
        fontSize: 12,
        color: '#999999',
        alignSelf: 'flex-end'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 40
    },
    emptyImage: {
        width: 120,
        height: 120,
        marginBottom: 24,
        tintColor: '#A8B5DB'
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Nunito-Medium',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 12
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        fontFamily: 'Nunito-Medium',
        lineHeight: 24
    }
})