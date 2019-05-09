const express = require('express');
const app = express();
let Parser = require('rss-parser');
let parser = new Parser();
const path = require('path');
const mcache = require('memory-cache');

app.use(express.urlencoded({extended: false}));

const cache = (duration) => {
  return (req, res, next) => {
    console.log(req.body.url);
    let key = '__express__' + req.body.url;
    console.log(key);
    let cachedBody = mcache.get(key);
    if(cachedBody){
      console.log(`cached for ${duration} seconds`);
      res.send(cachedBody);
      return;
    } else{
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      }
      next();
    }
  }
}

//each page stays cached for 20 seconds
//so refreshing the page will not fetch rss api every time
//and therefore less likely chance of overusing api and reaching rate limits
app.post('/api/rss', cache(20), (req, res)=>{
  (async () => {
  const url = req.body.url;
  let feed = await parser.parseURL(url);
  console.log('not cached');
  const rss = feed.items;
  res.json([feed.title, rss]);
})();

})

// SERVE STATIC ASSETS
if(process.env.PORT){
  //set static folder
  app.use(express.static('react-app/build'));

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'react-app', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server started on port ${port}`));
