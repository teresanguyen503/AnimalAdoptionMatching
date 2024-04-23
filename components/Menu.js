// Based from https://hartaniyassir.medium.com/how-to-create-a-popup-menu-in-react-native-d2fc8908e932

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function Menu(props) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        {/* List of navigation options or other content */}
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('CreateAccount')}>
          <Text>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('AddPet')}>
          <Text>Add Pet</Text>
        </TouchableOpacity>
      </View>
    );
  }
export default Menu;