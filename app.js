var fs = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');


const options = {
  uri: `https://www.rottentomatoes.com/`,
  transform: function(body) {
    return cheerio.load(body);
  }
};

let scraped;

rp(options)
  .then(($) => {
    scraped = $('#homepage-opening-this-week').html()
    chawera(scraped)
  })
  .catch((err) => {
    console.log(err);
  });

function chawera(a) {
  fs.appendFile('scraped.html', a, function(err) {
    if (err) throw err;
    console.log('Saved!');
  });
}
