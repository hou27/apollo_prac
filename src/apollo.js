import { InMemoryCache, ApolloClient, gql } from "@apollo/client";

// const cache = new InMemoryCache();



const client = new ApolloClient({
	uri: "https://gqlserver.run.goorm.io",	// backend server (gql server playground)
	cache: new InMemoryCache(),
	resolvers: {
		Movie: {	// api 에 있는 type이름이어야 함. -- Apollo Client Devtools을 이용하여 typename 확인
			isLiked: () => false
		},
		Mutation: {
			toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
				cache.writeData({	// 3.4.3버전에선 사용 불가
					id: `Movie:${id}`,
					data: {
						isLiked: !isLiked
					}
				});
    		},
		  likeMovie: (_, { id }, { cache }) => {
			likeFunc();
		  }
		}
	}
});

function likeFunc (id, cache) {
	cache.writeQuery({
				query: gql`{
					movie(id: $id) {
					  id
					  medium_cover_image
					}
				}`,
				data: { // Contains the data to write
					Movie: {
						id: `Movie:${id}`,
						medium_cover_image: "also can change this value"
					}
					//isLiked: true,isLiked @client
					
				}
				// id: `Movie:${id}`,	// cache에서 형식 잘 살펴봐야함.
				// data: {
				// isLiked: true,
				// medium_cover_image: "also can change this value"
				// }
			});
			  console.log(id);
}
// client.writeQuery({ query: IS_LOGGED_IN, data: { isLiked: true, medium_cover_image: "also can change this value"} });
// client.writeQuery({
//   query: gql`
//     mutation LikeMovie($id: Int!) {
//       like(id: $id) {
//         isLiked
//         medium_cover_image
//       }
//     }`,
//   data: { // Contains the data to write
//     isLiked: true,
// 	medium_cover_image: "also can change this value"
//   }
// });

export default client;