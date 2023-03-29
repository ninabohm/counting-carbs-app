import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { customStyles } from './CustomStyleSheet';
import { fetchTodayForAll, fetchWeekForAll, fetchMonthForAll, fetchYearForAll } from '../backend/Backend';
import {
  fetchMonthForCategories,
  fetchTodayForCategories,
  fetchWeekForCategories,
} from '../backend/Backend';

export default function TotalEmissionsBox(props) {
  const [emissions, setEmissions] = useState(0);

  const fetchTotalEmissions = async (json) => {
    try {

    let total = 0;

    if (props.time === 'daily') {
        const dailyData = await fetchTodayForCategories();
        for (const entry of dailyData) {
            total += entry.emissionAmount; }
        setEmissions(total);
    }
    if (props.time === 'weekly') {
        const weeklyData = await fetchWeekForCategories();
        for (const entry of weeklyData) {
            total += entry.emissionAmount;}
        setEmissions(total);
    }
    if (props.time === 'monthly') {
        const monthlyData = await fetchMonthForCategories();
        for (const entry of monthlyData) {
            total += entry.emissionAmount;}
        setEmissions(total);
    }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchTotalEmissions(props.time).then();
  }, [props.time]);

  return (
    <View style={customStyles.totalEmissionsBox}>
      <Text style={customStyles.totalEmissionsBoxText}> Total </Text>
      <Text style={customStyles.totalEmissionsBoxText}>{emissions.toFixed(2)} kg CO2e </Text>
    </View>
  );
}
