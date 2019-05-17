import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import Posts from '../Article/Posts'
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

     let  test = <div>cc</div>;

    const { sendpost } = this.props;
    let gotopost = (id,excerpt,content) => {
      sendpost(id,excerpt,content)
    }

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <Posts props = {articles}/>
            {/* {articles.map((article) => {
              return (
                <div className="card my-3" key = {article['id']} onClick={() => gotopost(article['id'],article['title']['rendered'],article['content']['rendered'])}>
                  <div className="card-header">
                    {article['title']['rendered']}
                  </div>
                  <div className="card-body">
                    {parse(article['excerpt']['rendered'])}
                    <p className="mt-5 text-muted">{moment(new Date(article.date)).fromNow()}</p>
                  </div>
                </div>
              )
            })}           */}

          </div>
        </div>
        <div className="pagination">
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
          {renderPageNumbers}
          <span onClick={() => this.makeHttpRequestWithPage(4)}>&raquo;</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.home.articles,
  total: state.home.total,
  per_page: state.home.per_page,
  current_page: state.home.current_page,
  excerpt:state.home.excerpt,
  content:state.home.content
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
  upDatepage: data => dispatch({ type: 'UPDATE_PAGE_LINK', data }),
  sendpost : (id,excerpt,content) => dispatch({type: 'GO_TO_POST',data:{
    id,excerpt,content
  }}) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);