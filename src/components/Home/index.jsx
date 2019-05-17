import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Posts from '../Article/Posts';
import Footer from '../Footer';
import logo from '../../../resources/rolling.gif'
import parse from 'html-react-parser';
import '../../../resources/scss/style.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {    
    this.makeHttpRequestWithPage(1); 
  }

  makeHttpRequestWithPage(pageNumber){
    const { onLoad } = this.props;
    const { per_page } = this.props;
    const { upDatepage } = this.props;
    upDatepage(pageNumber)
    axios(`https://chatproduct.tk/wordpress/index.php/wp-json/wp/v2/posts?page=${pageNumber}&per_page=${per_page}`)
    .then((res) => onLoad(res));
  }
  

  render() {

    let renderPageNumbers;    
    const { articles } = this.props;
    const { total } = this.props;
    const { per_page } = this.props;
    const { current_page } = this.props;
    const { content } = this.props;
    const { excerpt } = this.props;
    const { loading } = this.props;
    const pageNumbers = [];
    if (total !== null) {
      for (let i = 1; i <= Math.ceil(total / per_page); i++) {
        pageNumbers.push(i);
      }
      
      renderPageNumbers = pageNumbers.map(number => {
        let classes = current_page === number ? "active" : '';
        return (
          <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
        );
      });
    }  

    let pagination = <div className="pagination">
                        <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
                        {renderPageNumbers}
                        <span onClick={() => this.makeHttpRequestWithPage(4)}>&raquo;</span>
                    </div>  
    var blogs;
    if(loading){
       blogs = <div className = "loading"><img src={logo} className = "loadingimage" alt="logo"/></div>
    }else{
       blogs =<div><div className="container">
      <div className="row pt-8">
        <div className="col-lg-10 offset-lg-1">
          {excerpt ? 
            <div className="card my-6"><div className="card-header">{excerpt}</div><div className="card-body">
            {parse(content)}</div></div> :
            <Posts articles = {articles}/>
            }            
        </div>
      </div>
          {pagination}
          
    </div>
    <Footer/>
   </div> 
    }

    return (
      <React.Fragment>
            {blogs}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.home.articles,
  total: state.home.total,
  per_page: state.home.per_page,
  current_page: state.home.current_page,
  excerpt:state.home.excerpt,
  content:state.home.content,
  loading:state.home.loading
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
  upDatepage: data => dispatch({ type: 'UPDATE_PAGE_LINK', data }),
  sendpost : (id,excerpt,content) => dispatch({type: 'GO_TO_POST',data:{
    id,excerpt,content
  }}) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);