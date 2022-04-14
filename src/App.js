import './assets/style.css';
import React, {Component} from 'react'
import Card from './components/Card'

class App extends Component {
  constructor(){
    super()
    
    this.restart = this.restart.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);

    this.state = {
      search: '',
      compile: {
        title: [],
        plot: [],
        year: [],
        poster: [],
        id: []
      },
      final: [],
      final2: []
    }
    this.initialState = { ...this.state } 
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }


 async onSubmitSearch(e){
    e.preventDefault();
    this.restart()
    const value = this.state.search;
    //console.log(value)
 
    const response = await fetch(`http://www.omdbapi.com/?apikey=76c0f8e8&s=${value}&plot=short`, { mode: 'cors' });
    const movieData = await response.json();
    //console.log(movieData)
    const getMovie2 = movieData.Search
            
    console.log(movieData.length)
    for(let i = 1; i < getMovie2.length; i++) {
        //console.log(getMovie2[i])
        const getMovieId = movieData.Search[i].imdbID
        const response2 = await fetch(`http://www.omdbapi.com/?apikey=76c0f8e8&i=${getMovieId}`, { mode: 'cors' });
        const movieData2 = await response2.json();
        const getMoviePlot = movieData2.Plot;
        const getMoviePoster = movieData.Search[i].Poster;
        const getMovieTitle = movieData.Search[i].Title;
        const getMovieYear = movieData.Search[i].Year;
        //console.log("movie poster", getMoviePoster)
        //console.log(getMoviePlot, getMoviePoster, getMovieTitle, getMovieYear);
        
        if(getMoviePoster !== "N/A"){
          this.setState({
          compile: {
            title: getMovieTitle,
            plot: getMoviePlot,
            poster: getMoviePoster,
            year: getMovieYear,
            id: getMovieId
          },
          
          final: this.state.final.concat(this.state.compile)
        });
        }
        console.log("this state compile: ",this.state.compile)
        //console.log("this final state: ", this.state.final)
    }
    this.setState({
      final2: this.state.final2.concat(this.state.final)
    })
    console.log("ini state final ", this.state.final)
    console.log("ini final2 ", this.state.final)
    this.setState(this.initialState)
    console.log("final2 changed",this.state.final)
  }

  restart(e){
    console.log("ini restart")
     document
    .querySelectorAll(".kartu")
    .forEach((e) => e.parentNode.removeChild(e));
  }

  
  render() { 
    const {final2, final} = this.state
    //console.log("title: ",title)
    return (
       <div className="container">
        <div className="search-movie">
           <div className="search-title">
                <h3>Search Your Favorite Movie!</h3>
           </div>
            <form onSubmit={this.onSubmitSearch}>
                <input type="text" onChange={this.handleChange} className="search-value" placeholder="Search Place..."></input>
                <button type="submit" className="submit-button">Search!</button>
            </form>
        </div>
        <div className="row movie-wrapper">
          <Card final2={final2} final={final} />
        </div>
    </div>
    );
  }
}

export default App;
