import React from 'react'
class Posts extends React.Component {
    constructor(props){
        super(props)
    }
    
    render() { 
        console.log(props)
        // return ( 
        //     this.props.articles.map((article) => {
        //     return (
        //       <div className="card my-3" key = {article['id']} onClick={() => gotopost(article['id'],article['title']['rendered'],article['content']['rendered'])}>
        //         <div className="card-header">
        //           {article['title']['rendered']}
        //         </div>
        //         <div className="card-body">
        //           {parse(article['excerpt']['rendered'])}
        //           <p className="mt-5 text-muted">{moment(new Date(article.date)).fromNow()}</p>
        //         </div>
        //       </div>
        //     )
        //   }));
    }
}
 
export default Posts;