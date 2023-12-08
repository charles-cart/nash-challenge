export const toLocalString = () => {
  const date = new Date();
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const pad = (num) => (num < 10 ? '0' + num : num);
  const hours = pad(Math.floor(Math.abs(offset) / 60));
  const minutes = pad(Math.abs(offset) % 60);
  return (
    new Date(date.getTime() + offset * 60 * 1000).toISOString().slice(0, -1) +
    sign +
    hours +
    ':' +
    minutes
  );
};
