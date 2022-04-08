/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Button,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckBox from '@react-native-community/checkbox';
import {Swipeable} from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ItemBox = (props: any) => {
  const leftSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text
            style={[{fontSize: 24, color: 'white'}, {transform: [{scale}]}]}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const rightSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={props.handleAdd} activeOpacity={0.6}>
        <View style={styles.editBox}>
          <Animated.Text
            style={[{fontSize: 24, color: 'white'}, {transform: [{scale}]}]}>
            Select
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
      <View style={styles.itemBox}>
        <Text style={{fontSize: 24}}>
          {props.data}
          {props.selection.filter((i: any) => i === props.data).length > 0 ? (
            <Text style={{color: 'green'}}> &#x2713;</Text>
          ) : (
            ''
          )}
        </Text>
      </View>
    </Swipeable>
  );
};

function SelectTeam({navigation}: any) {
  const data = [
    {
      team: 'RCB',
      isChecked: false,
      players: [
        'Virat Kohli',
        'Glenn Maxwell',
        'Mohammad Siraj',
        'Faf Du Plessis',
        'Harshal Patel',
        'Wanindu Hasaranga',
        'Dinesh Karthik',
        'Shahbaz Ahemad',
        'Anuj Rawat',
        'Akash Deep',
        'Josh Hazlewood',
        'Mahipal Lomror',
        'Finn Allen',
        'Sherfane Rutherford',
        'Jason Behrendorff',
        'Suyash Prabhudessai',
        'Chama Milind',
        'Aneeshwar Gautam',
        'Karn Sharma',
        'Siddharth Kaul',
        'Luvnith Sisodia',
        'David Willey',
      ],
    },
    {
      team: 'GT',
      isChecked: false,
      players: [
        'Hardik Pandya',
        'Rashid Khan',
        'Shubman Gill	',
        'Mohammad Shami',
        'Jason Roy',
        'Abhinav Sadarangani',
        'Rahul Tewatia',
        'Noor Ahmad',
        'R Sai Kishore',
        'Lockie Ferguson',
        'Dominic Drakes',
        'Jayant Yadav	',
        'Vijay Shankar',
        'Darshan Nalkande',
        'Yash Dayal	',
        'Alzarri Joseph	',
        'Pradeep Sangwan',
        'David Miller	',
        'Wriddhiman Saha',
        'Matthew Wade',
        'Gurkeerat Singh',
        'Varun Aaron',
        'B Sai Sudharshan',
      ],
    },
    {
      team: 'CSK',
      isChecked: false,
      players: [
        'Ravindra Jadeja',
        'MS Dhoni',
        'Ruturaj Gaikwad',
        'Dwayne Bravo',
        'Ambati Rayudu',
        'KM Asif',
        'Tushar Deshpande',
        'Deepak Chahar',
        'Shivam Dube',
        'Maheesh Theekshana',
        'Rajvardhan Hangarkekar',
        'Simarjeet Singh',
        'Devon Conway',
        'Dwaine Pretorius',
        'Mitchell Santner',
        'Adam Milne',
        'Subhranshu Senapati',
        'Mukesh Choudhary',
        'N Jagadeesan',
        'Prashant Solanki',
        'C Hari Nishaanth',
        'Chris Jordan',
        'K Bhagath Varma',
      ],
    },
    {
      team: 'KKR',
      isChecked: false,
      players: [
        'Andre Russell',
        'Varun Chakravarthy',
        'Venkatesh Iyer',
        'Sunil Narine',
        'Pat Cummins',
        'Shreyas Iyer',
        'Nitish Rana',
        'Shivam Mavi',
        'Sheldon Jackson',
        'Ajinkya Rahane',
        'Rinku Singh',
        'Anukul Roy',
        'Rasikh Dar',
        'Baba Indrajith',
        'Chamika Karunaratne',
        'Abhijeet Tomar',
        'Pratham Singh',
        'Ashok Sharma',
        'Sam Billings',
        'Alex Hales',
        'Tim Southee',
        'Ramesh Kumar',
        'Mohammad Nabi',
        'Umesh Yadav',
        'Aman Khan',
      ],
    },
    {
      team: 'DC',
      isChecked: false,
      players: [
        'Rishabh Pant',
        'Axar Patel',
        'Prithvi Shaw',
        'Anrich Nortje',
        'David Warner',
        'Mitchell Marsh',
        'Ashwin Hebbar',
        'Sarfaraz Khan',
        'Kamlesh Nagarkoti',
        'KS Bharat',
        'Shardul Thakur',
        'Mustafizur Rahman',
        'Kuldeep Yadav',
        'Mandeep Singh',
        'Khaleel Ahmed',
        'Chetan Sakariya',
        'Lalit Yadav',
        'Ripal Patel',
        'Yash Dhull',
        'Rovman Powell',
        'Pravin Dubey',
        'Lungi Ngidi',
        'Tim Seifert',
        'Vicky Ostwal',
      ],
    },
  ];

  const [selectedTeam, setSelectedTeam] = React.useState(data);

  const [refresh, setRefresh] = React.useState(false);

  const handleSelection = (team: any) => {
    let temp = selectedTeam.map((item: any) => {
      if (item.team === team) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setSelectedTeam(temp);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginTop: 10, padding: 20, fontWeight: 'bold'}}>
        Select Any Two Teams
      </Text>
      <FlatList
        refreshing={refresh}
        onRefresh={() => {
          setRefresh(true);
          setTimeout(() => {
            setRefresh(false);
          }, 2000);
        }}
        data={selectedTeam}
        renderItem={({item}) => (
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <CheckBox
              disabled={
                selectedTeam.filter((i: any) => i.isChecked).length === 2 &&
                !item.isChecked
              }
              value={item.isChecked}
              onChange={() => handleSelection(item.team)}
            />
            <Text style={{marginTop: 5}}>{item.team}</Text>
          </View>
        )}
      />
      <Button
        title="Go to Selection"
        disabled={selectedTeam.filter((i: any) => i.isChecked).length < 2}
        onPress={() =>
          navigation.navigate('Details', {
            selection: selectedTeam.filter((i: any) => i.isChecked),
          })
        }
      />
    </SafeAreaView>
  );
}

function TeamScreen({team}: any) {
  const [selection, setSelection] = React.useState<any>([]);

  const deleteItem = (item: any) => {
    const arr = [...selection];
    arr.splice(arr.indexOf(item), 1);
    setSelection(arr);
  };

  const handleAdd = (item: any) => {
    const select = [...selection, item];
    setSelection(select);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          padding: 20,
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'blue',
        }}>
        {team.team}
      </Text>
      <FlatList
        data={team.players}
        renderItem={({item}) => (
          <ItemBox
            data={item}
            handleAdd={() => handleAdd(item)}
            handleDelete={() => deleteItem(item)}
            selection={selection}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.seperatorLine} />}
      />
    </SafeAreaView>
  );
}

const Tab = createMaterialTopTabNavigator();

function TeamsTab({route}: any) {
  const {selection} = route.params;

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: 'black'},
        swipeEnabled: true,
      }}>
      <Tab.Screen name={selection[0].team}>
        {_ => <TeamScreen team={selection[0]} />}
      </Tab.Screen>
      <Tab.Screen name={selection[1].team}>
        {_ => <TeamScreen team={selection[1]} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Select Team">
        <Stack.Screen name="Select Team" component={SelectTeam} />
        <Stack.Screen name="Details" component={TeamsTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemBox: {
    height: 80,
    width: SCREEN_WIDTH,

    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
  seperatorLine: {
    height: 1,
    backgroundColor: 'black',
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
  },
  editBox: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
  },
});
