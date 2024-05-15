import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from 'axios';
import SafeScreen from "../components/SafeScreen";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";

const { width } = Dimensions.get("window");

function NewsPage() {

  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetchArticles();
  //   }, []);

  useEffect(() => {
    setLoading(true);
    fetchArticles(5, 0); // Fetch first 5 entries
    setLoading(false);
  }, []);

   // Function to fetch articles from the backend
   const fetchArticles = async (limit, skip) => {
    try {
        // Make HTTP GET request to fetch profile data
         const response = await axios.get('http://192.168.254.23:3000/getArticles');
        setData(response.data);
    } catch (error) {
    console.error(error);
    console.log(error);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    const newSkip = currentPage * 5; // Calculate new skip offset
    fetchData(5, newSkip);
    setCurrentPage(currentPage + 1);
    setLoading(false);
  };

  return (
    <SafeScreen>
      <ScrollView onEndReached={handleLoadMore}>
      <View style={styles.header}>
        <TouchableOpacity><Icon style={styles.icon} name="keyboard-arrow-left" size={40} color="black" onPress={() => navigation.navigate("Home")}/></TouchableOpacity>
        <Text style={styles.heading}>Recent News</Text>
        <TouchableOpacity>
          <Icon style={styles.icon} name="menu" size={40} color="black" />
        </TouchableOpacity>
      </View>


      {loading ? (
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        ) : data.length > 0 ? (
          data.map((article, index) => (
      <View style={styles.articleContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: data.imageUrl}}
            style={{ width: 120, height: 120, resizeMode: "contain" }}
          />
        </View>
        <View style={styles.articleTextContainer}>
          <Text style={styles.articleTitle}>data.articleTitle</Text>
          <Text style = {styles.articleByline}>data.articleByline</Text>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.articleText}>
              data.articleText
            </Text>
          </ScrollView>
        </View>
      </View>
       ))) : (
        <Text style = {styles.noneFound}>No articles found.</Text>
      )}
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    textAlign: "center",
    paddingTop: 30,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
  },
  icon: {
    paddingRight: 0.5,
    alignItems: "center",
  },

  // News Articles
  articleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: 5,
    marginStart: 5,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.black,
  },
  imageContainer: {
    width: "30%",
  },
  images: {
    width: 120,
    height: 120,
  },
  articleTextContainer: {
    width: "65%",
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  articleByline: {
    fontSize: 16,
    fontStyle: "italic",
    margin: 10,
  },
  articleText: {
    fontSize: 14,
    margin: 10,
  },

  noneFound: {
    fontStyle: "italic",
    margin: 10,
    marginStart: 5,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.black,
    padding: 5,
  },
});

export default NewsPage;
