import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { InMemoryCache, useMutation, useQuery, gql } from '@apollo/client';

// @client를 통해 mutation을 client로 보냄.(backend로 보내는 것 방지)
const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!, $isLiked: Boolean!) {
    likeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
	  id
      medium_cover_image
	  isLiked @client
    }
  }
`;

const GET_CACHEMOVIE = gql`{
	Movie(id: $id) {
		id
		medium_cover_image
		isLiked @client
	}
}`;

const Container = styled.div`
    height: 400px;
    border-radius: 7px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    background-color: transparent;
    /*height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  border-radius: 7px;*/
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
  /*background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;*/
`;

const Movie = ({ id, bg, isLiked }) => {
    const cache = new InMemoryCache();

    const [toggleMovie] = useMutation(LIKE_MOVIE, {
        variables: { id: parseInt(id), isLiked },
    });
	
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg} />
            </Link>
            <button onClick={isLiked ? null : toggleMovie}>
				{isLiked ? 'Unlike' : 'Like'}</button>
        </Container>
    );
};

export default Movie;