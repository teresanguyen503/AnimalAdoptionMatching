import React, { useContext, useState } from "react";
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
import AuthContext from "../auth/context";
import axios from 'axios';

import colors from "../config/colors";

const { width } = Dimensions.get("window");

function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleViewNavigation = (nav) => {
    if (user) {
      navigation.navigate(nav);
    } else {
      alert("Login Required. Please login or sign up.");
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchPets(1, 0); // Fetch first entry
    setLoading(false);
  }, []);


  const fetchPets = async (limit, skip) => {
    const cachedData = getCachedData();
    if (cachedData && isDataRecent(cachedData)) {
      setData(cachedData);
      return;
    }

    try {
        // Make HTTP GET request to fetch profile data
         const response = await axios.get('http://192.168.1.12:3000/getPet');
        setCachedData(response.data);
        setData(response.data);
    } catch (error) {
    console.error(error);
    console.log(error);
    }
  };

  return (
    <SafeScreen>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Animal Adoption Matching App</Text>
          </View>

          {!user ? (
            <View style={styles.accountButtonContainer}>
              <TouchableOpacity
                style={styles.accountButton}
                onPress={() => navigation.navigate("CreateAccount")}
              >
                <Text>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.accountButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text>Sign In</Text>
              </TouchableOpacity>
            </View>
            ) : (
              <View />
            )
          }

          <View style={styles.newsContainer}>
            <View>
              <View style={styles.newsTitleContainer}>
                <Text style={styles.titleText}>Recent News</Text>
                <View style={styles.newsButtonContainer}>
                  <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={() => handleViewNavigation("NewsPage")}
                  >
                    <Text style={styles.articleButtonText}>View All News</Text>
                    <Icon
                      style={styles.icon}
                      name="keyboard-arrow-right"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.articleContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/thank-you-adoption.jpg")}
                  style={{ width: 120, height: 120, resizeMode: "contain" }}
                />
              </View>
              <View style={styles.articleTextContainer}>
                <Text style={styles.articleTitle}>Sample Article</Text>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <Text style={styles.articleText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Text>
                </ScrollView>
              </View>
            </View>
          </View>

          <View style={styles.petContainer}>
            <View style={styles.petTitleContainer}>
              <Text style={styles.petTitleText}>Available Pets</Text>
              <View style={styles.petButtonContainer}>
                <TouchableOpacity style={styles.viewAllButton}
                onPress={() => handleViewNavigation("PetProfile")}
                >
                  <Text style={styles.articleButtonText}>View All Pets</Text>
                  <Icon
                    style={styles.icon}
                    name="keyboard-arrow-right"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {loading ? (
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        ) : firstPet ? (
          <View style={styles.petProfileBanner}>
            <View style={styles.petProfileContainer}>
              <View style={styles.petImageContainer}>
                <Image
                  source={{uri: firstPet.image}}
                  style={styles.images}
                />
              </View>
              <View style={styles.petTextContainer}>
                <Text style={styles.petName}>
                  {firstPet.name}
                </Text>
                <Text style={styles.petDescription}>
                  {firstPet.desc}
                </Text>
              </View>
            </View>
          </View>
          ) : (
            <Text style = {styles.noneFound}>No pets found.</Text>
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    width,
  },
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

  // Account Section
  accountButtonContainer: {
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "center",
  },
  accountButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    fontSize: 45,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    alignItems: "center",
  },

  // News Section
  newsContainer: {
    textAlign: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
    marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    maxHeight: 400,
    overflow: "scroll",
    borderWidth: 1,
    padding: 5,
  },
  newsTitleContainer: {
    padding: 0,
    margin: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  newsButtonContainer: {
    paddingLeft: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllButton: {
    flexDirection: "row",
    borderWidth: 2,
    fontSize: 45,
    borderRadius: 10,
    margin: 15,
  },
  articleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 5,
    marginTop: 20,
  },
  imageContainer: {
    width: "30%",
  },
  images: {
    width: 100,
    height: 100,
  },
  articleTextContainer: {
    width: "65%",
    maxHeight: 120,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  articleText: {
    fontSize: 14,
  },
  articleButtonText: {
    alignSelf: "center",
    paddingLeft: 5,
  },

  noneFound: {
    fontStyle: "italic",
    fontSize: 16,
    margin: 10,
  },

  // Pet Section
  petContainer: {
    textAlign: "center",
    flexWrap: "wrap",
    margin: 15,
  },
  petTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  petTitleText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  petButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  petButtonText: {},
  petImageContainer: {
    alignItems: "center",
  },
  petTextContainer: {
    alignItems: "center",
  },
  petProfileBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  petProfileContainer: {
    width: "49%",
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
});

export default HomeScreen;
