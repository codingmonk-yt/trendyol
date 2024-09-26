// const generateFakeData = () => {
//   const fakeData = [];

//   for (let i = 0; i < 10; i++) {
//     // Generate a random Turkish mobile number (starts with 05 and has 11 digits)
//     const mobileNumber = `05${Math.floor(100 + Math.random() * 900)}****${Math.floor(1000 + Math.random() * 9000)}`;
    
//     // Generate a random commission amount between 800 and 1800 USD
//     const commission = (Math.random() * (1800 - 800) + 800).toFixed(2);

//     // Create the sentence
//     const sentence = `User[${mobileNumber}] Commission earned $${commission}`;

//     // Push the sentence to the fakeData array
//     fakeData.push(sentence);
//   }

//   // Join the array into a single string with a space between each sentence
//   return fakeData.join(' ');
// };

// export default generateFakeData;



const generateFakeData = () => {
  const userData = [
    "Kullanıcı [053*****056] Komisyon Kazandı $450.00",
    "Kullanıcı [054*****365] Komisyon Kazandı $650.00",
    "Kullanıcı [055*****416] Komisyon Kazandı $300.00",
    "Kullanıcı [053*****843] Komisyon Kazandı $350.00",
    "Kullanıcı [054*****888] Komisyon Kazandı $1750.00",
    "Kullanıcı [054*****475] Komisyon Kazandı $750.00",
    "Kullanıcı [053*****566] Komisyon Kazandı $300.00",
    "Kullanıcı [053*****056] Komisyon Kazandı $750.00",
    "Kullanıcı [054*****756] Komisyon Kazandı $2350.00",
    "Kullanıcı [055*****385] Komisyon Kazandı $650.00",
    "Kullanıcı [050*****586] Komisyon Kazandı $300.00",
    "Kullanıcı [055*****832] Komisyon Kazandı $1500.00",
    "Kullanıcı [053*****206] Komisyon Kazandı $750.00",
    "Kullanıcı [054*****365] Komisyon Kazandı $650.00",
    "Kullanıcı [055*****456] Komisyon Kazandı $700.00",
    "Kullanıcı [053*****052] Komisyon Kazandı $450.00"
  ];

  // Join the array into a single string with a space between each sentence
  return userData.join(' ');
};

export default generateFakeData;

