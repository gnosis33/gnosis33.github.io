import { interests } from './script.js';

var request = require('request');

var API_KEY = "YOUR_API_KEY";

// Use the interests variable in the API request
let prompt = `Generate a text about ${interests}.`;


var options = {
  method: 'POST',
  url: 'https://api.openai.com/v1/engines/davinci/jobs',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
  json: {
    "prompt": prompt,
    "max_tokens": 100,
    "temperature": 0.5,
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body.choices[0].text);
});
