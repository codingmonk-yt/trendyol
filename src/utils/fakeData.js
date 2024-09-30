const generateFakeData = () => {
  const exchangeRate = 34.19; // 1 USD = 34.19 TL
  const userData = [
    "Kullanıcı [053*****056] Komisyon Kazandı TL" +
      (450.0 * exchangeRate).toFixed(2),
    "Kullanıcı [054*****365] Komisyon Kazandı TL" +
      (650.0 * exchangeRate).toFixed(2),
    "Kullanıcı [055*****416] Komisyon Kazandı TL" +
      (300.0 * exchangeRate).toFixed(2),
    "Kullanıcı [053*****843] Komisyon Kazandı TL" +
      (350.0 * exchangeRate).toFixed(2),
    "Kullanıcı [054*****888] Komisyon Kazandı TL" +
      (1750.0 * exchangeRate).toFixed(2),
    "Kullanıcı [054*****475] Komisyon Kazandı TL" +
      (750.0 * exchangeRate).toFixed(2),
    "Kullanıcı [053*****566] Komisyon Kazandı TL" +
      (300.0 * exchangeRate).toFixed(2),
    "Kullanıcı [053*****056] Komisyon Kazandı TL" +
      (750.0 * exchangeRate).toFixed(2),
    "Kullanıcı [054*****756] Komisyon Kazandı TL" +
      (2350.0 * exchangeRate).toFixed(2),
    "Kullanıcı [055*****385] Komisyon Kazandı TL" +
      (650.0 * exchangeRate).toFixed(2),
    "Kullanıcı [050*****586] Komisyon Kazandı TL" +
      (300.0 * exchangeRate).toFixed(2),
    "Kullanıcı [055*****832] Komisyon Kazandı TL" +
      (1500.0 * exchangeRate).toFixed(2),
    "Kullanıcı [053*****206] Komisyon Kazandı TL" +
      (750.0 * exchangeRate).toFixed(2),
    "Kullanıcı [054*****365] Komisyon Kazandı TL" +
      (650.0 * exchangeRate).toFixed(2),
    "Kullanıcı [055*****456] Komisyon Kazandı TL" +
      (700.0 * exchangeRate).toFixed(2),
    "Kullanıcı [053*****052] Komisyon Kazandı TL" +
      (450.0 * exchangeRate).toFixed(2),
  ];

  // Join the array into a single string with a space between each sentence
  return userData.join(" ");
};

export default generateFakeData;
