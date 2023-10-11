import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { Card, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { allUsersRoute } from "../utils/APIRoutes";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const catImageUrl =
  "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const Home = () => {
  const [currentuser, setCurrentuser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  const getStorageData = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      setCurrentuser(currentUser);
    } catch (error) {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    }
  };

  const fetchAllUsers = async (id) => {
    const { data } = await axios.get(`${allUsersRoute}/${id}`);
    setContacts(data);
  };

  useEffect(() => {
    getStorageData();
  }, []);

  useEffect(() => {
    if (currentuser) {
      fetchAllUsers(currentuser._id);
    }
  }, [currentuser]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={colors.gray}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <Image
          source={{ uri: catImageUrl }}
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
          }}
        />
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <>
      <View>
        <TouchableOpacity
          style={styles.user}
          onPress={() => {
            console.log("CHECK PRESS");
            navigation.navigate("Chat");
          }}
        >
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d",
            }}
          />
          <Text style={styles.name}>{item.username}</Text>
        </TouchableOpacity>
      </View>
      <Divider inset={true} insetType="middle" />
    </>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id.toString()}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  user: {
    flexDirection: "row",
    paddingVertical: 6,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 25,
  },
  name: {
    fontSize: 24,
    marginTop: 5,
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});
