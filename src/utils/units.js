export const distance = (value, imperial = false, unit = true) => {
  const rounded = imperial
    ? Math.round(value * 32.8084) / 10
    : Math.round(value * 10) / 10;

  return unit ? `${rounded} ${imperial ? 'ft' : 'm'}` : rounded;
};

export const date = value => new Date(value).toString();

export const speed = (value, imperial = false, unit = true) => {
  const rounded = imperial
    ? Math.round(value * 32.8084) / 10
    : Math.round(value * 10) / 10;
  return unit ? `${rounded} ${imperial ? 'ft/s' : 'm/s'}` : rounded;
};

export const timedelta = (value) => {
  const minutes = Math.floor(value / 1000 / 60);
  const seconds = Math.round((value / 1000) - (minutes * 60));
  return `${minutes}m ${seconds}s`;
};
