const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomDecimal = (min: number, max: number) => {
  const num = Math.random() * (max - min) + min;
  return Math.round(num * 100) / 100;
};

const randomPoints = (min: number) => {
  return randomNumber(min, 1000);
};

const randomMultiplayer = (min: number, max: number) => {
  return randomDecimal(min, max);
};

const roundToDecimal = (num: number, numberOfDecimals: number) => {
  return parseInt(
    num.toLocaleString('en-US', {
      minimumIntegerDigits: numberOfDecimals,
      useGrouping: false,
    }),
  );
};
export { randomNumber, randomDecimal, randomPoints, randomMultiplayer, roundToDecimal };
