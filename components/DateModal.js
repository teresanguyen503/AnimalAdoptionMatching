import React, { useState }from 'react';
import { Text, StyleSheet, TextInput, View, Button, TouchableOpacity, Modal } from 'react-native';
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

const DateModal = ({  onDateSelect }) => {
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [startedDate, setStartedDate] = useState("2024/04/14");
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
     {/* Date Function */}
     const today = new Date();
     const startDate = getFormatedDate(
       today.setDate(today.getDate() + 1),
       "YYYY/MM/DD"
     );

     const onDoneDate = () => {
         setOpenStartDatePicker(!openStartDatePicker);
         onDateSelect(selectedStartDate)
       //  date = selectedStartDate;
        // console.log("date:", date)
       };

     const onCancelDate = () => {
         setOpenStartDatePicker(!openStartDatePicker);
         setSelectedStartDate(startedDate);
         onDateSelect(startedDate)
       };

    return (

        <View>
             {/* <Text style={styles.name}>Date Available</Text> */}
                <TouchableOpacity
                style={styles.textInputs}
                onPress={onDoneDate}
                >
                {/* <Text>{selectedStartDate}</Text> */}
                </TouchableOpacity>


      <Modal animationType="slide" transparent={true} visible={openStartDatePicker}>
             <View style={styles.centeredView}>
   <View style={styles.modalView}>
     <DatePicker
       mode="calendar"
       minimumDate={startDate}
        selected={startedDate}
   // selected={selectedStartDate}
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
    );
};

export default DateModal;

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        paddingTop: 0.6,
        paddingLeft: 5,
        paddingBottom: 10,
        fontWeight: 'bold',
        marginTop: 1,
    },
    textInputs: {
        //  borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        paddingLeft: 10,
        width: '90%',
        marginTop: -24,
        // height: '20%',
    },

 /* Date/Calendar Styling */
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