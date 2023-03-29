export class EmissionCategoryRepository {
  constructor() {
    this.categories = new Map();
    this.categories.set('Food and Drink', {
      icon: require('CountingCarbs/assets/images/Food.png'),
      color: '#4cb067',
      label: 'Food & Drink',
    });
    this.categories.set('Community', {
      icon: require('CountingCarbs/assets/images/Community.png'),
      color: '#cae7d1',
      label: 'Community',
    });
    this.categories.set('Healthcare', {
      icon: require('CountingCarbs/assets/images/Healthcare.png'),
      color: '#70c186',
      label: 'Healthcare',
    });
    this.categories.set('Recreation', {
      icon: require('CountingCarbs/assets/images/Recreation.png'),
      color: '#b7e0c2',
      label: 'Recreation',
    });
    this.categories.set('Service', {
      icon: require('CountingCarbs/assets/images/Service.png'),
      color: '#e3f3e8',
      label: 'Service',
    });
    this.categories.set('Shops', {
      icon: require('CountingCarbs/assets/images/Shops.png'),
      color: '#daefe0',
      label: 'Shops',
    });
    this.categories.set('Bank', {
      icon: require('CountingCarbs/assets/images/Bank.png'),
      color: '#a6d8b3',
      label: 'Bank',
    });
    this.categories.set('Travel', {
      icon: require('CountingCarbs/assets/images/Travel.png'),
      color: '#8acc9c',
      label: 'Travel',
    });
  }

  convert(json) {
    const categories = json.filter((c) => this.categories.has(c.category));
    let sumEmissions = 0;

    for (const entry of categories) {
      sumEmissions += entry.emissionAmount;
    }
    const views = [];

    for (const categoryInfo of categories) {
      const categoryView = this.categories.get(categoryInfo.category);
      const progress =
        sumEmissions > 0 ? categoryInfo.emissionAmount / sumEmissions : 0;
      views.push({
        id: categoryInfo.category,
        icon: categoryView.icon,
        progress,
        color: categoryView.color,
        label: categoryView.label,
      });
    }
    return views;
  }
}
