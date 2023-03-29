import {Alert, Button, ScrollView, View } from 'react-native';
import EmissionsBox from '../components/EmissionsBox';
import EmissionsDiagram from '../components/EmissionsDiagram';
import TotalEmissionsBox from '../components/TotalEmissionsBox';
import { customStyles } from '../components/CustomStyleSheet';
import { useEffect, useState } from 'react';
import { fetchPlaidTransactions } from '../backend/Backend';
import Footer from '../components/Footer';
import DropDownPicker from 'CountingCarbs/react-native-dropdown-picker';
import Header from '../components/Header';

export default function EmissionsScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('daily');
  const [items, setItems] = useState([
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ]);

  useEffect(() => {
    fetchPlaidTransactions().then();
  }, []);

function googleAlert (){
    var d = new Date();
    if(d.getDate()===1)
    {
      Alert.alert(
        'New Month!',
        'Upload Last Month\'s Google Data?',
        [
          {
            text: 'Later',
            style: 'cancel',
          },
          {
            text: 'Upload Data Now',
            onPress: () => navigation.navigate('GoogleScreen'),
          },
        ],
      );
      }
      d.setDate(d.getDate());
  }
  googleAlert();

  return (
    <>
      <Header navigation={navigation} />
      <View style={customStyles.container}>
        <View style={customStyles.scrollContainer}>
          <ScrollView>
            <View style={customStyles.picker}>
              <DropDownPicker
                open={open}
                value={time}
                items={items}
                setOpen={setOpen}
                setValue={setTime}
                setItems={setItems}
              />
            </View>
            <TotalEmissionsBox time={time} />
            <EmissionsDiagram time={time} />
            <EmissionsBox time={time} />
          </ScrollView>
        </View>
      </View>
      <Footer />
    </>
  );
}
