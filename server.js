import express from 'express';
import moment from 'moment-timezone';
import timezones from 'timezones.json'; // Importing the timezones dataset

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  let query = (req.query.q || '').toLowerCase().trim();

  if (!query) {
    return res.send('Usage: !time LOCATION (e.g., !time Sweden)');
  }

  // Normalize location names to lowercase
  const locations = Object.keys(timezones).reduce((acc, country) => {
    acc[country.toLowerCase()] = timezones[country];
    return acc;
  }, {});

  // Find the first location that starts with the query
  const match = Object.keys(locations).find(loc => loc.startsWith(query));

  if (!match) {
    return res.send('Location not found. Please check your spelling or try another.');
  }

  const timezone = locations[match];
  const time = moment().tz(timezone).format('HH:mm z');

  res.send(`Current time in ${match.charAt(0).toUpperCase() + match.slice(1)}: ${time}`);
});

app.listen(port, () => {
  console.log(`Nightbot Time API running on port ${port}`);
});