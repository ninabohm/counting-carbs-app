import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  fetchMonthForCategories,
  fetchTodayForCategories,
  fetchWeekForCategories,
} from '../backend/Backend';
import EmissionCategory from './EmissionCategory.js';
import { EmissionCategoryRepository } from '../utils/EmissionCategoryRepository';
import { customStyles } from './CustomStyleSheet';

export default function EmissionsBox(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const categoryRepo = new EmissionCategoryRepository();

  useEffect(() => {
    getJSONData().then(() => setLoading(false));
  }, [props.time]);

  const getJSONData = async () => {
    try {
      if (props.time === 'daily') {
        const progressBarDailyData = await fetchTodayForCategories();
        setData(categoryRepo.convert(progressBarDailyData));
      }
      if (props.time === 'weekly') {
        const progressBarWeeklyData = await fetchWeekForCategories();
        setData(categoryRepo.convert(progressBarWeeklyData));
      }
      if (props.time === 'monthly') {
        const progressBarMonthlyData = await fetchMonthForCategories();
        setData(categoryRepo.convert(progressBarMonthlyData));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={customStyles.emissionBoxCategories}>
      {data.map((c) => (
        <EmissionCategory key={c.id} time={props.time} category={c} />
      ))}
    </View>
  );
}
