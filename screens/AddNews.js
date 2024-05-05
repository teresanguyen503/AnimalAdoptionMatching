import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SafeScreen from "../components/SafeScreen";
import { useNavigation } from "@react-navigation/native";
// import articles from "../api/articles";

import colors from "../config/colors";

const { width } = Dimensions.get("window");

function AddNews() {
  const navigation = useNavigation();
  const [articleTitle, setTitle] = useState("");
  const [articleByline, setByline] = useState("");
  const [articleText, setArticleText] = useState("");
//   const [image, setImage] = useState(null);

//     /* Image Function */
//   useEffect(() => {
//     (async () => {
//       const galleryStatus =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       setHasGalleryPermission(galleryStatus.status === "granted");
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const submitForm = async (user) => {
//     try {
//       const result = await userAccounts.addUser(user);
//       if (!result.ok) {
//         if (result.problem === "CLIENT_ERROR" && result.status === 409) {
//           alert("Email already exists. Please use a different email");
//         } else {
//           alert("Could not register user. Try again");
//         }
//       } else {
//         alert("Success");
//       }
//     } catch (error) {
//       console.error("Error occurred: ", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

  return (
    <SafeScreen>
      <ScrollView>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity>
              <Icon
                style={styles.icon}
                name="keyboard-arrow-left"
                size={40}
                color="black"
                onPress={() => navigation.navigate("Home")}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>Add News Article</Text>
          </View>
        </View>

        {/* Adding News */}
        <View>
          <Text style={styles.title}>News Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter title"
            onChangeText={setTitle}
            value={articleTitle}
          />
          <Text style={styles.title}>Article Byline</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter byline"
            onChangeText={setByline}
            value={articleByline}
          />
          <Text style={styles.title}>Article Text</Text>
          <TextInput
            style={styles.longTextInput}
            placeholder="Enter text"
            onChangeText={setArticleText}
            value={articleText}
          />
        </View>

        {/* Image */}
        {/* <View style={styles.imageContainer}> */}
          {/* {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )} */}
          {/* <View style={styles.uploadBtnContainer}> */}
            {/* <TouchableOpacity onPress={pickImage} style={styles.uploadBtn}> */}
              {/* <AntDesign name="camera" size={20} color="black" /> */}
              {/* <Text>{image ? "Edit" : "Upload"} Image</Text> */}
            {/* </TouchableOpacity> */}
          {/* </View> */}
        {/* </View> */}

        {/* Button */}
        {/* <View style={styles.addArticleButton}> */}
          {/* <Button title="Add Article" onPress={submitForm}></Button> */}
        {/* </View> */}

        {/* Bottom Container */}
        {/* <View style={styles.bottomContainer}>
          <Text>
            Once added, the news story will be visible to adoption seekers.
          </Text>
        </View> */}
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  //  Header
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingLeft: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  icon: {
    paddingLeft: 0.5,
  },

  // Form
  title: {
    fontWeight: "bold",
    fontSize: "18",
    padding: 10,
    paddingStart: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    marginStart: "1%",
  },
  longTextInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    marginStart: "1%",
    maxHeight: 100, 
    multiline:"true",
  },

  // Image
  imageContainer: {
    marginTop: 12,
    elevation: 2,
    height: 200,
    width: 200,
    left: 65,
    backgroundColor: "#efefef",
    position: "relative",
    overflow: "hidden",
    marginLeft: 5,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Button
  addArticleButton: {
    width: "90%",
    paddingTop: 45,
    marginLeft: 18,
    marginTop: -25,
  },

  // Bottom Container
  bottomContainer: {
    backgroundColor: "lightgray",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AddNews;
