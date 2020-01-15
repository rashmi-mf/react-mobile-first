import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

class GetJokes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chuckJokesCat: "",
            chuckJokes: "",
            category: "movie",
            isLoaded: false,
            query: "",
            fetchedJoke: [],
            resultFetched: 0,
            InitialLimit: 0
        }
    }
    

    selectCategory = (e) => {
        this.setState({
            isLoaded: false,
            category: e.target.id,
        }, () => {
            this.search(this.state.category)
        });
    }

    async componentDidMount() {
        this.state.InitialLimit = 19;
        this.search(this.state.category);
        try {
            let chuckJokesCat = await fetch(`https://api.chucknorris.io/jokes/categories`)
            .then(result => result.json())
            this.setState({
                chuckJokesCat: chuckJokesCat,
            })
        } 
        catch(error) {
            console.warn(`We have an error here: ${error}`)
        }
    } 

    fetchJokes = (jokes) => { 
        let {InitialLimit, resultFetched} = this.state;

        if(!this.state.isLoaded) {
            return (
                <div>
                    <Dimmer active inverted>
                        <Loader>Loading...</Loader>
                    </Dimmer>
                </div>
            )
        } else {
        let rowJokes = [];
        
        if(jokes.length != "") {
            for(let jokesInd = 0; jokesInd < jokes.length; jokesInd++) { 
                if(InitialLimit!= 0 && resultFetched<= InitialLimit) {
                    rowJokes.push(
                        <div className="text-center text-lg-left">
                            <div className="ml-4 mt-4 mb-1 card">
                                <div className="card-body p-3 bg-white shadow">
                                    <p className="card-title text-muted card-font">{jokes[jokesInd]}</p>
                                </div>
                            </div>
                        </div>                
                    )
                }
                resultFetched++ 
            }        
        } else {
            rowJokes.push(
            <div className="text-center text-lg-left">
                <div className="ml-4 mt-4 mb-1 card">
                    <div className="bg-white card-body p-3 text-danger text-lg-center shadow">
                        <p className="card-title font-weight-bold">Please enter correct category</p>
                    </div>
                </div>
            </div>
            )
        }
        return rowJokes;
    }
    }
    
    fetchCategory = (chuckJokesCat) => { 
        let rows = [];
        for(let index = 0; index < chuckJokesCat.length; index++) { 
            rows.push(
                <div className={`bg-light text-capitalize font-weight-lighter d-inline-block mr-3 search-types header-font-m font-weight-bolder ${(this.getSelectedCategory(chuckJokesCat[index]))}`} onClick={this.selectCategory} id={chuckJokesCat[index]}>
                    {chuckJokesCat[index]}
                </div>
            )
        }    
        return rows;
    }

    async search(query) {
        try {
            let chuckJokes = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
            .then(res => res.json())

            let jokes = chuckJokes.result.map((val) => val.value);

            this.setState({
                fetchedJoke: jokes,
                isLoaded: true,
            });
        }
        catch(error) {
            console.warn(`We have an error here: ${error}`)
        }
    };

    getSelectedCategory  = (jokes) => {
        //Return true if this joke is the current joke category
        if(jokes === this.state.category) {
            return "bg-dark text-light";
        } else {
            return false;
        }	
    }

    onChange = e => {
        const { value } = e.target;
        this.setState({
            query: value
        });
    };

    searchJokes = () => {
        this.setState({isLoaded : false});
        this.search(this.state.query);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container pt-5">
                    <h1>Categories</h1>
                    <div className="jokesCat mt-5">
                        {this.fetchCategory(this.state.chuckJokesCat)}
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <input type="text" className="mr-5 search-box w-25" placeholder="Search for Jokes" onChange={this.onChange} /> 
                    <button id="searchBtn" className={`${this.state.cursorState} btn btn-primary`} onClick = {() => this.searchJokes()}>Search</button>
                </div>    
                <div className="jokesRow container">
                    {this.fetchJokes(this.state.fetchedJoke)}
                </div>
            </React.Fragment>
        )
    }
}

export default GetJokes
