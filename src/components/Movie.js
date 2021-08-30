import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  InMemoryCache,
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
	
	// const cache = new InMemoryCache();
	
	// const existingMovieData = cache.readQuery({
	// // 2. 현재 캐시에 저장되어있는 데이터를 가져온다.
	// query: gql`{
	// 		movie(id: $id) {
	// 			id
	// 			medium_cover_image
	// 			isLiked @client
	// 		}
	// 	}`,
	// variables: { id: +id }
	// });
	
	// cache.writeQuery({ // 캐시 업데이트!
	// query: gql`{
	// 		movie(id: $id) {
	// 			id
	// 			medium_cover_image
	// 			isLiked @client
	// 		}
	// 	}`,
	// variables: {
	// id: `Movie:${id}`, // GET_MESSAGES 쿼리는 매개변수로 roomID를 받는다 꼭 설정해주자! 꼭!!!
	// },
	// data: {
	// 		Movie: {
	// 			id: `Movie:${id}`,
	// 			medium_cover_image: "also can change this value",
	// 			isLiked: true
	// 		},
	// },
	// });
	
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