"use client";

import { useQuery, gql } from "@apollo/client";

type Episode = {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  created: string;
  characters: {
    id: string;
    name: string;
  }[];
};

type EpisodeData = {
  episodes: {
    results: Episode[];
  };
};

const GET_EPISODES = gql`
  query GetEpisodes {
    episodes {
      results {
        id
        name
        air_date
        episode
        created
        characters {
          id
          name
        }
      }
    }
  }
`;
export default function Home() {
  const { loading, data, error } = useQuery<EpisodeData>(GET_EPISODES);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error!</div>;

  return (
    <main className="container mx-auto px-2 md:px-4 py-8">
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.episodes?.results.map((episode) => (
            <div key={episode.id} className="shadow rounded p-4 font-medium">
              <span className="border p-1 px-2 rounded text-sm">
                {episode.episode}
              </span>
              <h3 className="text-lg my-1">{episode.name}</h3>
              <p className="text-base">
                air date: <span className="text-sm">{episode.air_date}</span>
              </p>

              <div className="mt-2">
                <h4>Characters:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {episode.characters.map((character) => (
                    <div
                      onClick={() => console.log(character)}
                      key={character.id}
                      className="shadow text-xs p-1 px-2 rounded bg-gray-100 hover:bg-gray-50 duration-500 cursor-pointer"
                    >
                      {character.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
