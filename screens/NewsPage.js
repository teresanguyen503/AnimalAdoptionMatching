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
         const response = await axios.get('http://192.168.1.12:3000/getArticles');
        setData(response.data);
    } catch (error) {
    console.error(error);
    console.log(error);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    const newSkip = currentPage * 20; // Calculate new skip offset
    fetchData(20, newSkip);
    setCurrentPage(currentPage + 1);
    setLoading(false);
  };

  return (
    <SafeScreen>
      <ScrollView onEndReached={handleLoadMore}>
      <View style={styles.header}>
        <Text style={styles.heading}>Recent News</Text>
      </View>

      {loading ? (
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        ) : data.length > 0 ? (
          data.map((article, index) => (
      <View style={styles.articleContainer} key={index + 1}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: article.articleImage}}
            style={{ width: 120, height: 120, resizeMode: "contain" }}
          />
        </View>
        <View style={styles.articleTextContainer}>
          <Text style={styles.articleTitle}>{article.articleTitle}</Text>
          <Text style = {styles.articleByline}>{article.articleByline}</Text>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.articleText}>
              {article.articleText}
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
