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
import SafeScreen from "../components/SafeScreen";
import { useNavigation } from "@react-navigation/native";
import getArticles from "../api/getArticles";

import colors from "../config/colors";

const { width } = Dimensions.get("window");

function NewsPage() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchArticles(10, 0); // Fetch first 10 entries
    setLoading(false);
  });

  const fetchArticles = async (limit, skip) => {
    try {
        // Make HTTP GET request to fetch profile data
        const response = await getArticles.getArticlesApi()
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
  articleText: {
    fontSize: 14,
  },
  noneFound: {
    fontStyle: "italic",
    margin: 10,
  },
});

export default NewsPage;
