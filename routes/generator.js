const express = require('express');
const router = express.Router();
const { generateRandom, saveFile, readFile, getReport } = require('../utils/generator');

/* GET random objects. */
router.get('/', async function(req, res, next) {
  const maxSize = 2 * 1024 * 1024;  // 2 MB
  let output = '';

  while (output.length < maxSize) {
    output += await generateRandom() + ',';
  }

  await saveFile('files/output.txt', output.substring(0, maxSize));
  const fileUrl = req.protocol + '://' + req.get('host') + '/files/output.txt';

  res.send(fileUrl);
});

/* GET report. */
router.get('/report', async function(req, res, next) {
  const data = await readFile('files/output.txt');
  const result = await getReport(data);

  res.json(result);
});

module.exports = router;
