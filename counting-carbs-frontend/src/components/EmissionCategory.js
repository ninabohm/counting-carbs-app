import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../backend/Backend';
import * as Progress from 'react-native-progress';
import colors from '../../assets/colors/colors';

export function EmissionHistory(history) {
  return (
    <View>
      {history.map((h) => {
        return (
          <View
            key={h.key}
            style={{
              flexDirection: 'row',
              marginBottom: 4,
              backgroundColor: '#fff',
              height: 50,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 8,
            }}
          >
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <Text style={textStyle}>{h.date}</Text>
            </View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <Text style={textStyle}>{h.product}</Text>
            </View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <Text style={textStyle}>{h.price}</Text>
            </View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <Text style={textStyle}>{Math.trunc(h.emissions)} kg</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default function EmissionCategory(props) {
  const progressText = `${(props.category.progress * 100).toFixed(1)} %`;
  const label = props.category.label;
  const [showsHistory, setShowsHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setLoadingHistory] = useState(false);

  const onCategoryClicked = () => {
    setShowsHistory((showsHistory) => !showsHistory);
  };

  const updateHistoryView = (data) => {
    const history = [];

    for (const entry of data) {
      const activity = entry.activity;

      history.push({
        key: Math.random(),
        date: activity.datetime,
        product: activity.subCategory,
        price: `${activity.amount} ${activity.unit}`,
        emissions: entry.emissionAmount,
      });
    }
    setHistory(history);
  };

  useEffect(() => {
    if (showsHistory) {
      setLoadingHistory(true);

      fetchHistory(props.category.id, props.time)
        .then(updateHistoryView)
        .finally(() => setLoadingHistory(false));
    } else {
      setHistory([]);
    }
  }, [showsHistory, props.time]);

  return (
    <View>
      <TouchableOpacity onPress={onCategoryClicked}>
        <View
          style={{ flex: 1, flexDirection: 'row', margin: 10, padding: 10 }}
        >
          <Image
            source={props.category.icon}
            style={{ width: 50, height: 50, marginTop: 5 }}
          />
          <View>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                marginLeft: 20,
                color: colors.textDark,
              }}
            >
              {label}
            </Text>
            <Progress.Bar
              style={{ backgroundColor: 'white', elevation: 5 }}
              progress={props.category.progress}
              width={100}
              height={25}
              marginLeft={20}
              marginTop={5}
              color={props.category.color}
            >
              <Text
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  color: '#151515',
                  fontSize: 12,
                  fontWeight: 'bold',
                  top: 4,
                }}
              >
                {progressText}
              </Text>
            </Progress.Bar>
          </View>
        </View>
      </TouchableOpacity>
      {showsHistory ? (
        isLoadingHistory ? (
          <Text>Loading</Text>
        ) : history.length === 0 ? (
          <View>
            <Text>History is empty</Text>
          </View>
        ) : (
          EmissionHistory(history)
        )
      ) : (
        <></>
      )}
    </View>
  );
}

const textStyle = {
  alignSelf: 'center',
  color: '#151515',
  fontSize: 14,
  fontWeight: 'bold',
};
