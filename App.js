import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
    const [goal, setGoal] = useState('');
    const [goals, setGoals] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedText, setEditedText] = useState('');

    const addGoalHandler = () => {
        if (goal.trim().length === 0) return;
        setGoals((currentGoals) => [...currentGoals, { id: Math.random().toString(), value: goal, completed: false }]);
        setGoal('');
    };

    const deleteGoalHandler = (goalId) => {
        setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== goalId));
    };

    const toggleCompletionHandler = (goalId) => {
        setGoals((currentGoals) =>
            currentGoals.map((goal) =>
                goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
            )
        );
    };

    const startEditingHandler = (goalId, currentText) => {
        setEditingId(goalId);
        setEditedText(currentText);
    };

    const saveEditedGoalHandler = (goalId) => {
        setGoals((currentGoals) =>
            currentGoals.map((goal) =>
                goal.id === goalId ? { ...goal, value: editedText } : goal
            )
        );
        setEditingId(null);
        setEditedText('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>To-Do List</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter your goal"
                    style={styles.input}
                    value={goal}
                    onChangeText={(text) => setGoal(text)}
                />
                <TouchableOpacity style={styles.button} onPress={addGoalHandler}>
                    <Text style={styles.buttonText}>ADD GOAL</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={goals}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.listItem, item.completed && styles.completedItem]}>
                        {editingId === item.id ? (
                            <TextInput
                                style={styles.input}
                                value={editedText}
                                onChangeText={(text) => setEditedText(text)}
                            />
                        ) : (
                            <Text style={styles.listText}>{item.value}</Text>
                        )}
                        <View style={styles.buttonContainer}>
                            {editingId === item.id ? (
                                <TouchableOpacity style={styles.editButton} onPress={() => saveEditedGoalHandler(item.id)}>
                                    <Text style={styles.buttonText}>SAVE</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.editButton} onPress={() => startEditingHandler(item.id, item.value)}>
                                    <Text style={styles.buttonText}>EDIT</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity style={styles.completeButton} onPress={() => toggleCompletionHandler(item.id)}>
                                <Text style={styles.buttonText}>{item.completed ? 'UNDO' : 'COMPLETE'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteGoalHandler(item.id)}>
                                <Text style={styles.buttonText}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'purple',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        flex: 1,
        marginRight: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'purple',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    listItem: {
        backgroundColor: 'purple',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        flexDirection: 'column',
    },
    completedItem: {
        backgroundColor: 'green',
    },
    listText: {
        color: 'white',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#007BFF',
        padding: 5,
        borderRadius: 5,
    },
    completeButton: {
        backgroundColor: '#28A745',
        padding: 5,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#DC3545',
        padding: 5,
        borderRadius: 5,
    },
});
