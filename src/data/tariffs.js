// Список возможностей в порядке отображения; названия переводятся
// через ключи Tariff_Plans.features.<key> в locales/*.json.
export const FEATURE_KEYS = [
  'forum',
  'videoPublishing',
  'gamification',
  'referral',
  'postSaving',
  'matchAnalysis',
  'videoPassport',
  'community',
];

// featuresIncluded — сколько первых возможностей из FEATURE_KEYS входит в тариф.
export const plans = [
  { id: 'basic', color: 'white', price: { monthly: 159, annually: 1599 }, featuresIncluded: 5 },
  { id: 'standard', color: 'green', price: { monthly: 3990, annually: 39900 }, featuresIncluded: 7 },
  { id: 'pro', color: 'red', price: { monthly: 9990, annually: 99990 }, featuresIncluded: 8 },
];
