import React,{useEffect} from "react";
import { View, Text } from "react-native";
import {getItem} from "../../lib/slices/authSlice";
// import ActSheet from "../../components/common/actionSheet";
const Alert: React.FC = () => {

  useEffect(() => {
      const retrieveToken = async () => {
          const token = await getItem('token');
          const userData = await getItem('user');
          // console.log(token);
          // console.log(userData);
      }
      retrieveToken();
  }, []);
      
  return (
    <View>
      <Text>Alert Screen Supervisor</Text>
      {/* <ActSheet /> */}
    </View>
  );
};

export default Alert;
