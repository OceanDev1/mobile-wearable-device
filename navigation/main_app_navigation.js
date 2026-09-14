import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppointmentMainScreen from "../containers/main/appointment_screen";
import DashboardMainScreen from "../containers/main/dashboard_screen";
import AccountMainScreen from "../containers/main/account_screen";
import { TabStyles } from "../styles/tab_styles";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import VariableConfigs from "../configs/variable_configs";
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const Tab = createBottomTabNavigator();

function MainAppNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={"Dashboard"}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          ...TabStyles.tab_bar,
          ...TabStyles.shadow,
        },
        headerStyle: {
          height: windowHeight < 800 ? 70 : windowHeight < 1000 ? 90 : 100,
        },
      }}
    >
      <Tab.Screen
        options={{
          title: "Lịch hẹn",
          tabBarIcon: ({ focused }) => (
            <View style={TabStyles.view_item}>
              <MaterialIcons
                name={"calendar-month"}
                size={windowHeight < 800 ? 18 : windowHeight < 1000 ? 22 : 30}
                color={
                  focused
                    ? VariableConfigs.COLORS.primary_color
                    : VariableConfigs.COLORS.secondary_color
                }
              />
              <Text
                style={[
                  TabStyles.text_menu,
                  {
                    color: focused
                      ? VariableConfigs.COLORS.primary_color
                      : VariableConfigs.COLORS.secondary_color,
                  },
                ]}
              >
                Lịch hẹn
              </Text>
            </View>
          ),
        }}
        name="Appointment"
        component={AppointmentMainScreen}
      ></Tab.Screen>

      <Tab.Screen
        options={{
          title: "Bộ điều khiển",
          tabBarIcon: ({ focused }) => (
            <View style={TabStyles.view_item}>
              <MaterialIcons
                name={"space-dashboard"}
                size={windowHeight < 800 ? 18 : windowHeight < 1000 ? 22 : 30}
                color={
                  focused
                    ? VariableConfigs.COLORS.primary_color
                    : VariableConfigs.COLORS.secondary_color
                }
              />
              <Text
                style={[
                  TabStyles.text_menu,
                  {
                    color: focused
                      ? VariableConfigs.COLORS.primary_color
                      : VariableConfigs.COLORS.secondary_color,
                  },
                ]}
              >
                Tổng quan
              </Text>
            </View>
          ),
        }}
        name="Dashboard"
        component={DashboardMainScreen}
      ></Tab.Screen>

      <Tab.Screen
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ focused }) => (
            <View style={TabStyles.view_item}>
              <MaterialIcons
                name={"person"}
                size={windowHeight < 800 ? 18 : windowHeight < 1000 ? 22 : 30}
                color={
                  focused
                    ? VariableConfigs.COLORS.primary_color
                    : VariableConfigs.COLORS.secondary_color
                }
              />
              <Text
                style={[
                  TabStyles.text_menu,
                  {
                    color: focused
                      ? VariableConfigs.COLORS.primary_color
                      : VariableConfigs.COLORS.secondary_color,
                  },
                ]}
              >
                Tài khoản
              </Text>
            </View>
          ),
        }}
        name="Account"
        component={AccountMainScreen}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default MainAppNavigation;
