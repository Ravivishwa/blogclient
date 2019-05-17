import React from 'react'
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import moment from 'moment';

class Posts extends React.Component {
    constructor(props){
        super(props)
    }    
    render() { 
        const { sendpost } = this.props;
        let gotopost = (id,excerpt,content) => {
          sendpost(id,excerpt,content)
        }
        return ( 
            this.props.articles.map((article) => {
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
          })
        );
    }
}

const mapStateToProps = state => ({
    excerpt:state.home.excerpt,
    content:state.home.content
  });
  
  const mapDispatchToProps = dispatch => ({
    sendpost : (id,excerpt,content) => dispatch({type: 'GO_TO_POST',data:{
      id,excerpt,content
    }}) 
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Posts);