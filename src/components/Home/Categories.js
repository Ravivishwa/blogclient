import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Select from 'react-select';

class Categories extends React.Component{

    componentDidMount() {    
        this.makeHttpRequestWithPage(); 
      }
    
      makeHttpRequestWithPage(){
        const { loadCategories } = this.props;
        axios(`http://chatproduct.tk/wordpress/index.php/wp-json/wp/v2/categories?per_page=100`)
        .then((res) => loadCategories(res));
      }

    render(){
        const { categories } = this.props
        console.log(categories)
        return (
            <div className="container">
            <div className="row">
            <div className="drop-down">
            <p>I would like to render a dropdown here from the values object</p>
              <select>{
                //  categories.map((obj) => {
                //      return <option value={obj.id}>{obj.name}</option>
                //  })
              }</select>
            </div>;
            </div>
          </div>
        )
    }
} 

const mapStateToProps = state => ({
    categories: state.home.categories
  });
  
  const mapDispatchToProps = dispatch => ({
    loadCategories: data => dispatch({ type: 'LOAD_CATEGORIES', data })
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Categories);