import React from 'react'
import { Add } from './Components/Add'
import { News } from './Components/News'
import './App.css'

class App extends React.Component {
    componentDidMount(){
        this.setState({isLoading: true});
        fetch('http://localhost:3000/data/newsData.json')
            .then(response =>{
                return response.json()
            })
            .then(data => {
                setTimeout(() => { // добавили задержку
                    this.setState({ isLoading: false, news: data })
                }, 1000) // в три секунды
            })

    }
    state = {
        news: null,
        isLoading: false,
    }

    static getDerivedStateFromProps(props, state) {
        let nextFilteredNews

        if (Array.isArray(state.news)) {
            nextFilteredNews = [...state.news]

            nextFilteredNews.forEach((item, index) => {
                if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
                    item.bigText = 'SPAM MEANS BAN'
                }
            })

            return {
                filteredNews: nextFilteredNews,
            }
        }

        return null
    }

    handleAddNews = data => {
        const nextNews = [data, ...this.state.news]
        this.setState({ news: nextNews })
    }
    render() {
        const {news, isLoading} = this.state;
        return (
            <React.Fragment>
                <Add onAddNews={this.handleAddNews} />
                <h3>News</h3>
                {isLoading && <p>Loading...</p>}
                {Array.isArray(news) && <News data={news} />}
            </React.Fragment>
        )
    }
}

export default App