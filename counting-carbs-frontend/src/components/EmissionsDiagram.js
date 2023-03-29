import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import colors from 'CountingCarbs/assets/colors/colors.js';
import { customStyles } from '../components/CustomStyleSheet';
import { BarChart, StackedBarChart } from 'CountingCarbs/react-native-chart-kit';
import {
  fetchDailyForDiagram,
  fetchDailyForStackedDiagram,
  fetchWeeklyForDiagram,
  fetchWeeklyForStackedDiagram,
  fetchMonthlyForDiagram,
  fetchMonthlyForStackedDiagram,
} from '../backend/Backend';

export default function EmissionsDiagram(props) {
  const [isLoading, setLoading] = useState(true);
  const [openBottom, setOpenBottom] = useState(false);
  const [valueBottom, setValueBottom] = useState('daily');
  const [dropdownTwo, setDropdownTwo] = useState('daily');
  const [itemsBottom, setItemsBottom] = useState([
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ]);
  const [data, setData] = useState([[0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0]]);

  const fetchTimeForDiagram = async (time) => {
    try {
      setDropdownTwo(time);
      dropdownChange(time);
      console.log(time);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTimeForDiagram(props.time).then();
  }, [props.time]);

  const dropdownChange = (value) => {
    if (value == 'daily') {
      setDropdownTwo('daily');
      setLoading(true);
      getStackedJSONDataDaily().then(() => setLoading(false));
    } else if (value == 'weekly') {
      setDropdownTwo('weekly');
      setLoading(true);
      getStackedJSONDataWeekly().then(() => setLoading(false));
    } else if (value == 'monthly') {
      setDropdownTwo('monthly');
      setLoading(true);
      getStackedJSONDataMonthly().then(() => setLoading(false));
    } else {
      console.log('nothing');
    }
  };

  useEffect(() => {
    if (dropdownTwo === 'daily') {
      getStackedJSONDataDaily().then(() => setLoading(false));
    } else if (dropdownTwo === 'weekly') {
      getStackedJSONDataWeekly().then(() => setLoading(false));
    } else {
      getStackedJSONDataMonthly().then(() => setLoading(false));
    }
  }, []);

  const getJSONDataDaily = async () => {
    try {
      const dailyDiagramData = await fetchDailyForDiagram();
      const tempArray = [];
      for (var i = dailyDiagramData.length - 1; i >= 0; i--) {
        var temp = dailyDiagramData[i];
        tempID = temp.emissionAmount;
        tempArray.push(tempID);
      }
      setData(tempArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    const getStackedJSONDataDaily = async () => {
      try {
        const dailyDiagramData = await fetchDailyForStackedDiagram();
        const tempArray = [];
          Object.keys(dailyDiagramData).map(e=>{
            const array = [];
             dailyDiagramData[e].map(o=> {
                 array.push(o.emissionAmount);
             })
            tempArray.push(array);
          })
        tempArray.reverse();
        setData(tempArray);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const getJSONDataWeekly = async () => {
    try {
      const weeklyDiagramData = await fetchWeeklyForDiagram();
      const tempArray = [];
      for (var i = weeklyDiagramData.length - 1; i >= 0; i--) {
        var temp = weeklyDiagramData[i];
        tempID = temp.date.emissionAmount;
        tempArray.push(tempID);
      }
      setData(tempArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStackedJSONDataWeekly = async () => {
    try {
        const weeklyDiagramData = await fetchWeeklyForStackedDiagram();
        const tempArray = [];
          Object.keys(weeklyDiagramData).map(e=>{
            const array = [];
             weeklyDiagramData[e].map(o=> {
                 array.push(o.emissionAmount);
             })
            tempArray.push(array);
          })
      tempArray.reverse();
      setData(tempArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getJSONDataMonthly = async () => {
    try {
      const monthlyDiagramData = await fetchMonthlyForDiagram();
      const tempArray = [];
      for (var i = monthlyDiagramData.length - 1; i >= 0; i--) {
        var temp = monthlyDiagramData[i];
        tempID = temp.emissionAmount;
        tempArray.push(tempID);
      }
      setData(tempArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    const getStackedJSONDataMonthly = async () => {
        try {
            const monthlyDiagramData = await fetchMonthlyForStackedDiagram();
            console.log(monthlyDiagramData)
            const tempArray = [];
            Object.keys(monthlyDiagramData).map(e=>{
                const array = [];
                monthlyDiagramData[e].map(o=> {
                    array.push(o.emissionAmount);
                })
                tempArray.push(array);
            })
            tempArray.reverse();
            setData(tempArray);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
        }
    };

  var days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var months = [
    'J',
    'F',
    'M',
    'A',
    'M',
    'J',
    'J',
    'A',
    'S',
    'O',
    'N',
    'D',
    'J',
    'F',
    'M',
    'A',
    'M',
    'J',
    'J',
    'A',
    'S',
    'O',
    'N',
    'D',
  ];

  var d = new Date();
  var day = days[d.getDay()];
  var month = months[d.getMonth()];

  const barChartDataDaily = {
    labels: [
      days[d.getDay(d.setDate(d.getDate() - 6))],
      days[d.getDay(d.setDate(d.getDate() + 1))],
      days[d.getDay(d.setDate(d.getDate() + 1))],
      days[d.getDay(d.setDate(d.getDate() + 1))],
      days[d.getDay(d.setDate(d.getDate() + 1))],
      days[d.getDay(d.setDate(d.getDate() + 1))],
      days[d.getDay(d.setDate(d.getDate() + 1))],
    ],
    data: [...data],
    barColors: ["#4cb067", '#b7e0c2', "#70c186", '#cae7d1', "#8acc9c", '#daefe0', '#a6d8b3', '#e3f3e8']

  };

  const barChartDataWeekly = {
    labels: ['W1', 'W2', 'W3', 'W4'],
    data: [...data],
    barColors: ["#4cb067", '#b7e0c2', "#70c186", '#cae7d1', "#8acc9c", '#daefe0', '#a6d8b3', '#e3f3e8']

  };

  const barChartDataMonthly = {
    labels: [
      months[d.getMonth() + 1],
      months[d.getMonth() + 2],
      months[d.getMonth() + 3],
      months[d.getMonth() + 4],
      months[d.getMonth() + 5],
      months[d.getMonth() + 6],
      months[d.getMonth() + 7],
      months[d.getMonth() + 8],
      months[d.getMonth() + 9],
      months[d.getMonth() + 10],
      months[d.getMonth() + 11],
      months[d.getMonth()],
    ],
    data: [...data],
//    [[20, 0, 0, 0, 0, 0, 0, 0],
//    [0, 500, 0, 0, 0, 0, 0, 0],
//    [0, 324, 0, 0, 0, 0, 0, 0],
//    [0, 0, 0, 0, 324, 0, 0, 0],
//    [0, 0, 0, 0, 324, 0, 0, 0],
//    [324, 324, 324, 324, 324, 324, 324, 324],
//    [0, 0, 0, 0, 324, 0, 0, 0],
//    [0, 0, 0, 0, 324, 0, 0, 0],
//    [0, 0, 324, 0, 0, 0, 0, 0],
//    [0, 0, 324, 0, 0, 0, 0, 0],
//    [0, 0, 0, 343, 0, 0, 0, 0],
//    [0, 0, 0, 0, 0, 0, 0, 324]],
    barColors: ["#4cb067", '#b7e0c2', "#70c186", '#cae7d1', "#8acc9c", '#daefe0', '#a6d8b3', '#e3f3e8']
  };

  let loadingScreen = (
    <ActivityIndicator size="large" color="#1EC969" />
  )

  let showDiagram = (
      <StackedBarChart
        data={
          dropdownTwo === 'daily'
            ? barChartDataDaily
            : dropdownTwo === 'weekly'
            ? barChartDataWeekly
            : barChartDataMonthly
        }
        width={Dimensions.get('window').width - 50}
        height={220}
        yAxisSuffix=" kg"
        yAxisInterval={1}
        showBarTops={false}
        fromZero={true}
        flatColor={true}
        yLabelsOffset={-30}
        chartConfig={{
          backgroundColor: colors.background,
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          barPercentage: 0.40,
          barRadius: 5,
          propsForLabels: {
            fontFamily: 'Inter-Medium',
            fontSize: 12,
            fill: 'transparent',
          },
          color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 15,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
      />
  )
  return (
    <>
      <View>
        {/*Diagram*/}
        <View style={ customStyles.emissionDiagram }>
          { isLoading ? loadingScreen
          : showDiagram }
        </View>
      </View>
    </>
  );
}
