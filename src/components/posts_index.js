import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import _ from "lodash";

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    console.log(this.props.posts);
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id} >
          <Link to={`/posts/${post.id}`}>
              {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>All Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts}
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
