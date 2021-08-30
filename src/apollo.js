import { InMemoryCache, ApolloClient, gql } from "@apollo/client";

// const cache = new InMemoryCache();

// https://velog.io/@yhe228/apollo-writeQuery-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-mutation%ED%9B%84-%EC%BA%90%EC%8B%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%ED%95%98%EA%B8%B0
// 참고할 것.

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
			likeFunc(id, cache);
		  }
		}
	}
});

function likeFunc (id, cache) {
	
	const existingMovieData = cache?.readQuery({
    	// 2. 현재 캐시에 저장되어있는 데이터를 가져온다.
    	query: gql`{
			movie(id: $id) {
				id
				medium_cover_image
				isLiked @client
			}
		}`,
        variables: { id: +id }
    });
	console.log(existingMovieData);
	cache.writeQuery({ // 캐시 업데이트
        query: gql`{
			movie(id: $id) {
				id
				medium_cover_image
				isLiked @client
			}
		}`,
        variables: {
          id: `Movie:${id}`, // GET_MESSAGES 쿼리는 매개변수로 roomID를 받는다 꼭 설정해주자! 꼭!!!
        },
        data: {
			Movie: {
				id: `Movie:${id}`,
				medium_cover_image: "also can change this value",
				isLiked: true
			},
        },
    });
}


// const [sendMessage] = useMutation(SEND_MESSAGES, {
//   update(cache, { data }) {
//     // 1. 보낸 메시지를 가져온다
//     const newMessage = data?.sendMessage?.sendMessage;

//     const existingMessages = cache.readQuery({
//       // 2. 현재 캐시에 저장되어있는 데이터를 가져온다.
//       query: GET_MESSAGES,
//       variables: {
//         roomId: localRoomId, // GET_MESSAGES 쿼리는 매개변수로 roomID를 받는다 꼭 설정해주자! 
//       },
//     });

//     if (newMessage && existingMessages) {
//       cache.writeQuery({ // 캐시 업데이트!
//         query: GET_MESSAGES,
//         variables: {
//           roomId: localRoomId, // GET_MESSAGES 쿼리는 매개변수로 roomID를 받는다 꼭 설정해주자! 꼭!!!
//         },
//         data: {
//           getMessage: {
//             ...existingMessages.getMessage,
//             messages: [newMessage, ...existingMessages.getMessage.messages],
//             // 3. 현재 캐시에 저장되어있는 messages에 새로운 message를 추가해준다.
//           },
//         },
//       });
//     }
//   },
// });

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