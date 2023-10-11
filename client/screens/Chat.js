// ChatScreen.js
import React, { useState } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1, // user's ID
        }}
      />
    </View>
  );
};

export default ChatScreen;
