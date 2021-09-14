import { InMemoryCache, ApolloClient, gql } from '@apollo/client';

// const cache = new InMemoryCache();

// https://velog.io/@yhe228/apollo-writeQuery-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-mutation%ED%9B%84-%EC%BA%90%EC%8B%9C-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%ED%95%98%EA%B8%B0
// 참고할 것.

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
	  id
      medium_cover_image
	  isLiked @client
    }
  }
`;

const client = new ApolloClient({
    uri: 'https://gqlserver.run.goorm.io', // backend server (gql server playground)
    cache: new InMemoryCache(),
    resolvers: {
        Movie: {
            // api 에 있는 type이름이어야 함. -- Apollo Client Devtools을 이용하여 typename 확인
            isLiked: () => false,
        },
        Mutation: {
            likeMovie /*toggleLikeMovie*/: (_, { id, isLiked }, { cache }) => {
                cache.writeData({
                    // 3.4.3버전에선 사용 불가
                    id: `Movie:${id}`,
                    data: {
                        isLiked: !isLiked,
                    },
                });
            },
            // likeMovie: (_, { id, isLiked }, { cache }) => {
            //     console.log(cache.data.data, `Movie:${id}`, typeof id);
            //     // doesn't work;;
            //     // const cacheData = cache.data.data;
            //     // cache.data.data = cacheData.filter((data) => {
            //     // 	return data.id === id ? data.isLiked = !isLiked : null;
            //     // })
            //     const existingMovieData = cache.readQuery({
            //         // 현재 캐시에 저장되어있는 데이터를 가져온다.
            //         query: gql`{
            //     		Movie(id: $id) {
            //     			id
            //     			medium_cover_image
            //     			isLiked @client
            //     		}
            //     	}`,
            //         variables: {
            //             // Provide any required variables here
            //             id: `Movie:${id}`,
            //         },
            //     });
            //     // query: gql`{
            //     // 		movie(id: 35558) {
            //     // 			id
            //     // 			medium_cover_image
            //     // 			isLiked @client
            //     // 		}
            //     // 	}`,
            //     console.log(existingMovieData, typeof id);
            //     cache.writeQuery({
            //         // 캐시 업데이트
            //         query: GET_MOVIE,
            //         variables: {
            //             id: id,
            //         },
            //         data: {
            //             Movie: {
            //                 id: id,
            //                 medium_cover_image: 'also can change this value',
            //                 isLiked: true,
            //             },
            //         },
            //     });
            // },
            likeMovie: (_, { id, isLiked }, { cache }) => {
                const queryResult = cache.readQuery({
                    query: gql`{
						Movie(id: $id) @client {
							id
							medium_cover_image
						}
					}`,
                    variables: {
                        // Provide any required variables here
                        id: `Movie:${id}`,
                    },
                });
                const existingMovieData = queryResult;
                console.log(existingMovieData, typeof id);
                if (queryResult) {
                    const data = {
                        Movie: {
                            id: id,
                            medium_cover_image: 'also can change this value',
                            isLiked: true,
                        },
                    };
                    cache.writeQuery({
                        query: gql`{
						Movie(id: $id) @client {
							id
							medium_cover_image
						}
					}`,
                        data,
                    });
                    return data.Movie;
                }
                return [];
            },
        },
    },
});

export default client;