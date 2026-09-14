import LoginScreen from "../containers/authentication/login_screen";
import SplashScreen from "../containers/splash/splash_screen";
import MainAppNavigation from "./main_app_navigation";

const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator();

const ContainerAppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashNavigation" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainNavigation" component={MainAppNavigation} />
    </Stack.Navigator>
  );
};

export default ContainerAppNavigation;
