"use client";

import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";

type Post = {
  id: string;
  title: string;
  body: string;
};

type PostsData = {
  posts: {
    data: Post[];
  };
};

type FormInput = {
  title: string;
  body: string;
};

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(input: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

const MutationPage = () => {
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery<PostsData>(GET_ALL_POSTS);
  const [
    addPost,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_POST);

  const [formInput, setFormInput] = useState<FormInput>({
    title: "",
    body: "",
  });

  // handle form input
  const handleFormInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formInput);

    try {
      await addPost({
        variables: {
          title: formInput.title,
          body: formInput.body,
        },
        refetchQueries: [{ query: GET_ALL_POSTS }],
        onCompleted: (data) => {
          console.log("Post created successfully!");
          formInput.title = "";
          formInput.body = "";
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (queryLoading) return <div>loading...</div>;
  if (queryError) return <div>error...</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h3 className="text-center text-lg font-semibold">All Posts</h3>

      {/* new post form */}
      <form
        className="my-5 max-w-md shadow w-full mx-auto p-4 rounded"
        onSubmit={handleSubmit}
      >
        <h4 className="text-sm uppercase font-semibold">New Post</h4>
        <div className="mt-2">
          <input
            type="text"
            name="title"
            value={formInput.title}
            placeholder="Post title..."
            className="border w-full outline-none rounded p-2 text-base font-normal focus:border-blue-500"
            required
            onChange={handleFormInput}
          />
        </div>
        <div className="mt-2">
          <textarea
            name="body"
            value={formInput.body}
            placeholder="Body..."
            className="border resize-none w-full outline-none rounded p-2 text-base font-normal focus:border-blue-500"
            required
            onChange={handleFormInput}
          />
        </div>
        <button
          type="submit"
          className="border px-8 py-2 mt-4 rounded bg-blue-600 text-gray-300 hover:bg-blue-700"
        >
          {mutationLoading ? "Posting..." : "Post"}
        </button>
      </form>
      {queryData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {queryData.posts.data.map((post) => (
            <div key={post.id} className="shadow p-4 rounded border">
              <h2 className="font-semibold text-base capitalize mb-2">
                {post.title}
              </h2>
              <p className="text-sm font-normal">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MutationPage;
