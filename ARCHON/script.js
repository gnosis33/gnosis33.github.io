// Server-side Node.js
const http = require('http');
const fs = require('fs');

let interests

// Client-side JavaScript
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    interests = document.querySelector('input[name="interests"]').value;
    console.log('Client-side:', interests);
  
    // Send the interests variable to the server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/interests');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ interests: interests }));
  });
  
  // Server-side Node.js
  const http = require('http');
  const fs = require('fs');
  
  // Create a server that recieves the interests and saves them to a file
  const server = http.createServer(function (req, res) {
    if (req.method === 'POST' && req.url === '/interests') {
      let body = '';
      req.on('data', function (chunk) {
        body += chunk;
      });
      req.on('end', function () {
        var interests = JSON.parse(body).interests;
        console.log('Server-side:', interests);
  
        // Store the interests in a JSON file
        fs.writeFile('interests.json', JSON.stringify(interests), function (err) {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      });
      res.end();
    }
  });
  
  server.listen(5500);
  console.log('Server listening on http://localhost:5500');
  