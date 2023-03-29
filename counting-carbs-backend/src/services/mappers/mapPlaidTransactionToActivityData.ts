import { ActivityModel } from '../../domain/model/activity.model';

export const mapPlaidTransactionToActivityData = (
  transaction,
): ActivityModel => {
  const activity = new ActivityModel();
  const categories = transaction.category;
  const categoriesLength = categories.length;

  activity.amount = transaction.amount;
  activity.category = categories[0];
  activity.subCategory = categories[categoriesLength - 1];
  activity.categoryId = Number(transaction.category_id);
  activity.datetime = transaction.date;
  activity.type = 'transaction';
  activity.unit = 'EUR';

  return activity;
};
