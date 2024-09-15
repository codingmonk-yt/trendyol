const generateFakeData = () => {
  const fakeData = [];

  for (let i = 0; i < 10; i++) {
    // Generate a random Turkish mobile number (starts with 05 and has 11 digits)
    const mobileNumber = `05${Math.floor(100 + Math.random() * 900)}****${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Generate a random commission amount between 800 and 1800 USD
    const commission = (Math.random() * (1800 - 800) + 800).toFixed(2);

    // Create the sentence
    const sentence = `User[${mobileNumber}] Commission earned $${commission}`;

    // Push the sentence to the fakeData array
    fakeData.push(sentence);
  }

  // Join the array into a single string with a space between each sentence
  return fakeData.join(' ');
};

export default generateFakeData;
