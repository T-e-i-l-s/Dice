import p1 from "./Content/p1";
import p2 from "./Content/p2";
import p3 from "./Content/p3";
import p4 from "./Content/p4";
import p5 from "./Content/p5";
import p6 from "./Content/p6";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createStackNavigator();


export default function Navigate(){
    return <NavigationContainer>
        <Stack.Navigator>
            
            <Stack.Screen
                name="p1"
                component={p1}
                options={{headerShown: false,
                    animationTypeForReplace:'pop'}}
            />
            <Stack.Screen
                name="p2"
                component={p2}
                options={{headerShown: false,
                    animationTypeForReplace:'pop'}}
            />
            <Stack.Screen
                name="p3"
                component={p3}
                options={{headerShown: false,
                    animationTypeForReplace:'pop'}}
            />
            
            <Stack.Screen
                name="p4"
                component={p4}
                options={{headerShown: false,
                    animationTypeForReplace:'pop'}}
            />
            <Stack.Screen
                name="p5"
                component={p5}
                options={{headerShown: false,
                    animationTypeForReplace:'pop'}}
            />
            <Stack.Screen
                name="p6"
                component={p6}
                options={{headerShown: false,
                    animationTypeForReplace:'pop'}}
            />
            
            
        </Stack.Navigator>
    </NavigationContainer>
}