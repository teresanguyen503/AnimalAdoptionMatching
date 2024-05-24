import React, { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SafeScreen from "../components/SafeScreen";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import articles from "../api/articles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import colors from "../config/colors";

const { width } = Dimensions.get("window");

function AddNews(props) {
  const navigation = useNavigation();
  const [articleTitle, setTitle] = useState("");
  const [articleByline, setByline] = useState("");
  const [articleText, setArticleText] = useState("");
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

    /* Image Function */
  useEffect(() => {
    (async () => {
      // const grantedStorage = await ImagePicker._requestStoragePermissions();
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      // setHasGalleryPermission(galleryStatus.status === "granted" || grantedStorage.status === "granted");
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submitForm = async () => {
    const article = {
      articleTitle: articleTitle, 
      articleByline: articleByline, 
      articleText: articleText, 
      image: image
    }; 
    if(!articleTitle || !articleByline || !articleText ){
      alert('Please check required fields (i.e., title, byline, and text). Images are optional.')
      return;
    }
    try {
      const result = await articles.addArticle(article);
      if (!result.ok) {
          alert("Could not add article. Try again");
      } else {
        alert("Success");
        setTitle(""); 
        setByline(""); 
        setArticleText(""); 
        setImage(null); 
      }
    } catch (error) {
      console.error("Error occurred: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const resetButton = () => {
    Alert.alert(
      "Confirmation", 
      "Are you sure you want to reset?", 
      [
        {
          text: "No", 
          style: "cancel", 
        }, 
        {
          text: "Yes", 
          onPress: () => {
            setTitle(""); 
            setByline(""); 
            setArticleText(""); 
            setImage(null); 
          },
        },
      ],
      { cancelable: false }
    ) 
  }

  return (
    <SafeScreen>
      <KeyboardAwareScrollView>
        <View>
          <Text style={styles.title}>News Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Title"
            onChangeText={setTitle}
            value={articleTitle}
          />
          <Text style={styles.title}>Article Byline</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Byline"
            onChangeText={setByline}
            value={articleByline}
          />
          <Text style={styles.title}>Article Text</Text>
          <TextInput
            multiline
            numberOfLines={100}
            style={styles.longTextInput}
            placeholder="Enter Text"
            onChangeText={setArticleText}
            value={articleText}
          />
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <View style={styles.uploadBtnContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.uploadBtn}>
              <AntDesign name="camera" size={20} color="black" />
              <Text>{image ? "Edit" : "Upload"} Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={submitForm}>
            <Text>Publish Article</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetButton}>
            <Text>Reset Article</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
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
    fontSize: 18,
    padding: 10,
    paddingStart: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "95%",
    padding: 10,
    marginStart: "3%",
  },
  longTextInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "95%",
    padding: 10,
    marginStart: "3%",
    maxHeight: 100, 
  },

  // Image
  imageContainer: {
    marginTop: 12,
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    justifyContent: "center",
    marginStart: "25%",
    alignItems: "center",
    flexDirection: "row",
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
  buttonContainer: {
    paddingTop: 45,
    marginLeft: 18,
    marginTop: -30,
    flexDirection: "row", 
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    fontSize: 45,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    marginTop:5,
    marginLeft: 50,
  }
});

export default AddNews;