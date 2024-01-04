import { createNativeStackNavigator } from "@react-navigation/native-stack";
//
import { NewGroup } from "@screens/NewGroup";
import { Players } from "@screens/Players";
import { Groups } from "@screens/Groups";

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="groups" component={Groups}/>
            <Screen name="newGroup" component={NewGroup}/>
            <Screen name="players" component={Players}/>
        </Navigator>
    )
}