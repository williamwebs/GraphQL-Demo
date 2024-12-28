"use client";

import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

type Character = {
  id: string;
  gender: string;
  name: string;
  image: string;
  status: string;
};

type CharacterData = {
  characters: {
    results: Character[];
  };
};

const GET_CHARACTERS = gql`
  query GetCharacters($gender: String) {
    characters(filter: { gender: $gender }) {
      results {
        id
        gender
        name
        image
        status
      }
    }
  }
`;

const page = () => {
  const [gender, setGender] = useState<string | null>(null);

  const { data, loading, error } = useQuery<CharacterData>(GET_CHARACTERS, {
    variables: { gender },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <div
          onClick={() => setGender(null)}
          className="shadow py-1 px-3 rounded text-center w-full text-sm cursor-pointer hover:bg-gray-50 duration-300 transition-all"
        >
          All Characters
        </div>
        <div
          onClick={() => setGender("Male")}
          className="shadow py-1 px-3 rounded text-center w-full text-sm cursor-pointer hover:bg-gray-50 duration-300 transition-all"
        >
          Male
        </div>
        <div
          onClick={() => setGender("Female")}
          className="shadow py-1 px-3 rounded text-center w-full text-sm cursor-pointer hover:bg-gray-50 duration-300 transition-all"
        >
          Female
        </div>
      </div>

      {/* display all the characters */}
      <div className="mt-10 w-full p-5">
        {loading && <div>loading</div>}
        {error && <div>error</div>}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.characters.results.map((character) => (
              <div key={character.id} className="p-4 shadow rounded">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-auto rounded"
                />
                <h3 className="text-lg font-bold">{character.name}</h3>
                <p>Status: {character.status}</p>
                <p>Gender: {character.gender}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
