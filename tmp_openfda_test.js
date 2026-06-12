const https = require('https');
const query = 'openfda.spl_set_id:"0000025c-6dbf-4af7-a741-5cbacaed519a"';
const url = 'https://api.fda.gov/drug/label.json?search=' + encodeURIComponent(query) + '&limit=1';
console.log(url);
https.get(url, res => {
  console.log('status', res.statusCode);
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(body.slice(0, 2000));
  });
}).on('error', err => console.error('error', err.message));
