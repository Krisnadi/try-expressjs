const fs = require('fs/promises');

async function generateRandom() {
  const alphabetic = Math.random().toString(36).replace(/[^a-z]+/g, '');
  const realNumber = Math.random().toString().substring(2);
  const integer = Math.random();
  const alphanumeric = (Math.random() + 1).toString(36).substring(2);
  const choices = [alphabetic, realNumber, integer, alphanumeric];

  return choices[Math.floor(Math.random() * choices.length)];
}

async function saveFile(fileName, data) {
  try {
    await fs.writeFile(fileName, data);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
}

async function readFile(fileName) {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    return data;
  } catch (error) {
    console.error('there was an error:', error.message);
  }
}

async function getReport(data) {
  const items = data.split(',');
  let alphabetic = realNumber = integer = alphanumeric = 0;

  for (const item of items) {
    if (!/\d/.test(item)) {
      alphabetic++;
    } else if (/^\d+$/.test(item)) {
      realNumber++;
    } else if (item.includes('.')) {
      integer++;
    } else {
      alphanumeric++;
    }
  }

  return {
    'alphabetic': alphabetic,
    'realNumber': realNumber,
    'integer': integer,
    'alphanumeric': alphanumeric,
  };
}

module.exports = { generateRandom, saveFile, readFile, getReport };
