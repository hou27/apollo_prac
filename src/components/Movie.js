import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  useMutation,
  gql
} from "@apollo/client";

// @client를 통해 mutation을 client로 보냄.(backend로 보내는 것 방지)
const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!) {
    likeMovie(id: $id) @client
  }
`;

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
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
  /*background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;*/
`;

const Movie = ({ id, bg, isLiked }) => {
	const [likeMovie] = useMutation(LIKE_MOVIE, {
		variables: { id: +id }
	});
	
	return (
		<Container>
			<Link to={`/${id}`}>
				<Poster bg={bg} />
			</Link>
			<button onClick={isLiked ? null : likeMovie}>
				{isLiked ? "Unlike" : "Like"}
			</button>
		</Container>
	);
};

export default Movie;