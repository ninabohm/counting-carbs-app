import auth from '@react-native-firebase/auth';

const BACKEND_URL =
  'https://countingcarbs-backend-project-xfjrlphq5q-uc.a.run.app';

export async function fetchAPI(path) {
  console.log('FETCH ' + path);
  const token = await auth().currentUser.getIdToken();
  const response = await fetch(BACKEND_URL + path, {
    headers: {
      authorization: 'Bearer ' + token,
    },
  });
  return await response.json();
}

export async function postRegisterUser(path, currentUserFirebaseId, email) {
  console.log('POST ' + path);
  const token = await auth().currentUser.getIdToken();
  const response = await fetch(BACKEND_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      firebaseId: currentUserFirebaseId,
    }),
  });
  return await response.json();
}

export async function fetchHasToken() {
  const json = await fetchAPI('/transaction/token');
  return json.hasToken;
}

export async function fetchHasTravelData() {
  const json = await fetchAPI('/activity/travelData');
  return json.hasData;
}

export async function fetchLinkToken() {
  const json = await fetchAPI('/transaction/connection');
  return json.link_token;
}

export async function fetchTodayForAll() {
  const json = await fetchAPI('/emission/all/daily');
  return json[0];
}

export async function fetchMonthForAll() {
  const json = await fetchAPI('/emission/all/monthly');
  return json[0];
}

export async function fetchWeekForAll() {
  const json = await fetchAPI('/emission/all/weekly');
  return json[0];
}

export async function fetchYearForAll() {
  const json = await fetchAPI('/emission/all/year');
  return json[0];
}

export async function postPublicToken(publicToken) {
  const token = await auth().currentUser.getIdToken();
  const response = await fetch(BACKEND_URL + '/transaction/access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ public_token: publicToken }),
  });
  return await response.json();
}

export async function postGoogleJourneyData(data) {
  const token = await auth().currentUser.getIdToken();
  const response = await fetch(BACKEND_URL + '/activity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: data,
  });
  console.log('POST /activity');
  return await response.json();
}

export function fetchMonthForCategories() {
  return fetchAPI('/emission/categories/monthly');
}

export function fetchWeekForCategories() {
  return fetchAPI('/emission/categories/weekly');
}

export function fetchTodayForCategories() {
  return fetchAPI('/emission/categories/daily');
}

//export function fetchYearForCategories() {
//  return fetchAPI('/emission/categories/year');
//}

//export function fetchLastWeekForCategories() {
//  return fetchAPI('/emission/categories/year');
//}

export async function fetchPlaidTransactions() {
  return await fetchAPI('/transaction');
}

export async function fetchDailyForDiagram() {
  return fetchAPI('/emission/all/daily');
}

export async function fetchDailyForStackedDiagram() {
  return fetchAPI('/emission/stacked/daily');
}

export async function fetchWeeklyForDiagram() {
  return fetchAPI('/emission/all/weekly');
}

export async function fetchWeeklyForStackedDiagram() {
  return fetchAPI('/emission/stacked/weekly');
}

export async function fetchMonthlyForDiagram() {
  return fetchAPI('/emission/all/monthly');
}

export async function fetchMonthlyForStackedDiagram() {
  return fetchAPI('/emission/stacked/monthly');
}
export function fetchHistory(category, time) {
  return fetchAPI(`/emission/${category}/${time}`);
}
