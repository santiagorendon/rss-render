const express = require('express');
const app = express();
let Parser = require('rss-parser');
let parser = new Parser();
const path = require('path');

app.use(express.urlencoded({extended: false}));

app.post('/api/rss', (req, res)=>{
  (async () => {
  const url = req.body.url;

  let feed = await parser.parseURL(url);

  const rss = feed.items;
  res.json([feed.title, rss]);
})();

})

// SERVE STATIC ASSETS
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.user(express.static('react-app/build'));

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'react-app', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server started on port ${port}`));
