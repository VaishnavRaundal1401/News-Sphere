import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(10);
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
      updateNews();
    },[])
    

    // handleNext = async () =>{
    //   this.setState({page:this.state.page+1});
    //   this.updateNews();
    // }

    // handlePrevious = async() =>{
    //   this.setState({page:this.state.page-1});
    //   this.updateNews();
    // }

    const fetchMoreData = async() =>{
      setPage(page+1);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }
    return (
      <>
        <h1 className='text-center' style={{marginTop: "69px"}}>Top Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
            {articles.map((element) => {
                return <div className="col-md-4 my-3" key = {element.url}>
                <NewsItem title = {element.title} description = {element.description?element.description.slice(0,99):"Description of this news is not available please click on READ MORE for more details"} imageUrl = {element.urlToImage?element.urlToImage:"https://upload.wikimedia.org/wikipedia/commons/2/24/News_18_India.png"} newsUrl = {element.url} author = {element.author} date={element.publishedAt} source = {element.source.name} logo={props.logo}/>
                </div>
            })}
            </div>
            </div>
            </InfiniteScroll>  
      </>
      
    )
}

News.defaultProps = {
  country : "in",
  pageSize : 6,
  logo:"danger"
}
News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  logo:PropTypes.string
}

export default News
