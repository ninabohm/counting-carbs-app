import { ActivityModel } from '../../domain/model/activity.model';

export const mapGoogleActivitiesToActivityData = (
  journey,
): ActivityModel => {
  const activity = new ActivityModel();

  activity.amount = journey.distance;
  activity.category = 'Travel';
  activity.subCategory = transformSubcategory(journey.category);
  activity.datetime = journey.datetime;
  activity.type = 'journey';
  activity.unit = 'km';
  return activity;
};

export const transformSubcategory = (subcategory: string): string => {
    switch (subcategory) {
        case 'IN_TRAIN': { subcategory= "Train"; break; }
        case 'IN_PASSENGER_VEHICLE': { subcategory = "Car"; break; }
        case 'IN_BUS': { subcategory = "Bus"; break; }
        case 'IN_SUBWAY': { subcategory = "Subway"; break; }
        case 'IN_TRAM': { subcategory = "Tram"; break; }
        case 'IN_FERRY': { subcategory = "Ferry"; break; }
        case 'IN_VEHICLE': { subcategory = "Vehicle"; break; }
        default: { subcategory="Undefined"; break; }
    }
    return subcategory;
};