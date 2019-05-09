import React from 'react';
import '../App.css';
//import Parser from 'rss-parser';
//let parser = new Parser();



class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      feedTitle: '',
      feed: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount(){
    //(async () => {
      fetch('api/rss', {
            method: 'post',
            body: `url=${this.props[0]}`,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
          })
        .then(res => res.json())
        .then(rssArr => {
          this.setState({feedTitle: rssArr[0]});
          this.setState({feed: rssArr[1]});
          const titleLst = this.state.feedTitle.split(' ');
          const title = titleLst[titleLst.length-1];
          const link = document.querySelector(`#${title}`);
          link.setAttribute('class', 'active');
        } )
        /*
      const url = this.props[0];
      const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
      let feed = await parser.parseURL(CORS_PROXY+url);
      this.setState({feedTitle: feed.title});
      this.setState({feed: feed.items});
      const titleLst = this.state.feedTitle.split(' ');
      const title = titleLst[titleLst.length-1];
      const link = document.querySelector(`#${title}`);
      link.setAttribute('class', 'active');
    })();
    */
  }

  render(){
    return (
      <div>
      <h1 id="pageTitle">{this.state.feedTitle}</h1>
      <span dangerouslySetInnerHTML={{ __html: this.state.feed.map(player => "<p id='caption'>"+player.title+"</p>"+player.content+"<br /><br /><br />").join('') }} />

      </div>

    )
  }
}
export default Home;
