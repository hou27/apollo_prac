import { InMemoryCache, ApolloClient, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://gqlserver.run.goorm.io', // backend server (gql server playground)
    cache: new InMemoryCache(),
    resolvers: {
        Movie: {
            // api 에 있는 type이름이어야 함. -- Apollo Client Devtools을 이용하여 typename 확인
            isLiked: () => false,
        },
        Mutation: {
            toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
                // cache.writeData({
                //     // 3.4.3버전에선 사용 불가
                //     id: `Movie:${id}`,
                //     data: {
                //         isLiked: !isLiked,
                //     },
                // });
				cache.writeQuery({
                    query: gql`{
						movie(id: $id){
							id
							medium_cover_image
							isLiked @client
						}
					}`,
                    data: {
                        movie: {
							__typename: 'Movie',
                            id,
                            medium_cover_image: "https://source.unsplash.com/random",
                            isLiked: !isLiked,
                        },
                    },
					variables: {
                        // Provide any required variables here
                        id,
                    },
                });
            },
        },
    },
});

export default client;