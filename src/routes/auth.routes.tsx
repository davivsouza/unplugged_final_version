import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Welcome } from "@screens/AuthScreens/Welcome";
import { SignIn } from "@screens/AuthScreens/SignIn";
import { AuthIntroSlider } from "@screens/AuthScreens/AuthIntroSlider";
import { SignUp } from "@screens/AuthScreens/SignUp";

type AuthRoutes = {
  welcome: undefined;
  signIn: undefined;
  signUp: undefined;
  introSlider: undefined
};

export type AuthNavigatorRouteProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();


type Props = {
  hasAlreadyTriedToLogin?: boolean
}
export function AuthRoutes({ hasAlreadyTriedToLogin }: Props) {
  return (
    <Navigator
      initialRouteName={hasAlreadyTriedToLogin ? 'signIn' : 'welcome'}
      screenOptions={{
        headerShown: false, contentStyle: {
          paddingVertical: 90,
          paddingHorizontal: 32,
        }
      }}>
      <Screen name="welcome" component={Welcome} />
      <Screen name="signUp" component={SignUp} />
      <Screen name="signIn" component={SignIn} />
      <Screen name="introSlider" component={AuthIntroSlider} />
    </Navigator>
  );
}
