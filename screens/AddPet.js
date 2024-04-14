import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

export default function AddPet() {
    const [name, setName] = useState('');
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [startedDate, setStartedDate] = useState("2024/04/14");
    const today = new Date();
    const startDate = getFormatedDate(
      today.setDate(today.getDate() + 1),
      "YYYY/MM/DD"
    );

    const onDoneDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
      };

    const onCancelDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
        setSelectedStartDate(startedDate);
      };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon style={styles.icon} name="keyboard-arrow-left" size={40} color="black" />
                    <Text style={styles.heading}>Add Pet</Text>
                </View>

            {/* Name Placeholder */}
            <View style={styles.contain}>
                <Text style={styles.name}>Animal Name</Text>
                <TextInput
                style={styles.textInput}
                placeholder="Enter name"
                onChangeText={setName}
                value={name}
                />

            {/* Date Placeholder */}
            <View>
                <Text style={styles.name}>Date Available</Text>
                <TouchableOpacity
                style={styles.textInput}
                onPress={onDoneDate}
                >
                <Text>{selectedStartDate}</Text>
                </TouchableOpacity>
            </View>

            {/* Date Picker Modal */}
            <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={startedDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />
                {/* Cancel Date */}
                <TouchableOpacity onPress={onCancelDate}>
                    <Text style={{ color: "white", marginRight: 150, }}>Cancel</Text>
                </TouchableOpacity>

                {/* Done Date */}
                <TouchableOpacity onPress={onDoneDate}>
                  <Text style={{ color: "white", marginLeft: 150, marginTop: -19,}}>Done</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>




            </View>
            </View>
        </ScrollView>

    );


}

const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row', // Align items in a row
        justifyContent: 'flex-start', // Align items to the start (left)
        alignItems: 'center', // Center vertically
        paddingHorizontal: 16, // Add padding for spacing
        paddingTop: 40,
        paddingLeft: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    icon:{
        paddingLeft: 0.5,
    },
    name:{
        fontSize: 20,
        paddingTop: 0.6,
        paddingLeft: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        marginTop: 1,
      },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        paddingLeft: 10,
        width: '90%',
    },
    contain: {
        paddingLeft: 20,
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,

    },
    modalView: {
        margin: 20,
        backgroundColor: "#080516",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 35,
        height: "45%",
        width: "80%",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
    },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
})