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
    "User [053 * 056] Earned Commission $450.00",
    "User [054 * 365] Earned Commission $650.00",
    "User [055 * 416] Earned commission $300.00",
    "User [053 * 843] Earned Commission $350.00",
    "User [054 * 888] Earned Commission $1750.00",
    "User [054 * 475] Earned Commission $750.00",
    "User [053 * 566] Earned commission $300.00",
    "User [053 * 056] Earned Commission $750.00",
    "User [054 * 756] Earned Commission $2350.00",
    "User [055 * 385] Earned Commission $650.00",
    "User [050 * 586] Earned Commission $300.00",
    "User [055 * 832] Earned Commission $1500.00",
    "User [053 * 206] Earned Commission $750.00",
    "User [054 * 365] Earned Commission $650.00",
    "User [055 * 456] Earned commission $700.00",
    "User [053 * 052] Earned Commission $450.00"
  ];

  // Join the array into a single string with a space between each sentence
  return userData.join(' ');
};

export default generateFakeData;
