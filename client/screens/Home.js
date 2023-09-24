import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
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

  console.log("Contacts:", contacts);

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

  const users = [
    {
      name: "brynn",
      avatar: "https://uifaces.co/our-content/donated/1H_7AxP0.jpg",
    },
    {
      name: "thot leader",
      avatar:
        "https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
    },
    {
      name: "jsa",
      avatar: "https://uifaces.co/our-content/donated/bUkmHPKs.jpg",
    },
    {
      name: "talhaconcepts",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "andy vitale",
      avatar: "https://uifaces.co/our-content/donated/NY9hnAbp.jpg",
    },
    {
      name: "katy friedson",
      avatar:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg",
    },
  ];

  return (
    // <View style={styles.container}>
    //   {/* <Card containerStyle={{padding:0}}>
    //   {contacts.map((contact, idx)=>
    //     <ListItem
    //     key={idx}
    //     roundAvatar
    //     title={contact.username}
    //     avatar={{uri: contact.avatarImage}}
    //   />)}
    //   </Card> */}

    //   <TouchableOpacity
    //     // onPress={() => navigation.navigate("Chat")}
    //     style={styles.chatButton}
    //   >
    //     <Entypo name="chat" size={24} color={colors.lightGray} />
    //   </TouchableOpacity>
    // </View>
    <>
      <ScrollView>
        <View style={styles.container}>
          <Card>
            {contacts.map((contact, i) => {
              return (
                <>
                  <View key={i} style={styles.user}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{
                        uri: "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d",
                      }}
                    />
                    <Text style={styles.name}>{contact.username}</Text>
                  </View>
                  <Divider style={{ backgroundColor: "blue" }} />
                </>
              );
            })}
          </Card>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  user: {
    flexDirection: "row",
    paddingVertical: 6,
    marginBottom: 16,
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
