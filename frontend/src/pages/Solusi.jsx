import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Feature/Header";
import Footer from "../components/Feature/Footer";
import Default from "../images/default.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import UserService from "../services/user.service";
import axios from "axios";
import FormatTime from "../services/user.time";
export default function Solusi() {
  const [user, setUser] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [postSolutions, setPostSolutions] = useState("");
  const [likedSolutions, setLikedSolutions] = useState([]);
  const [commentsSolutions, setCommentsSolutions] = useState([]);
  const [postCommentSolutions, setPostCommentSolutions] = useState({});
  const [replyIndex, setReplyIndex] = useState(solutions.map(() => false));

  const [topSolusi, setTopSolusi] = useState([]);
  const [latestSolusi, setLatestSolusi] = useState([]);

  const [commentCount, setCommentCount] = useState("");
  const [likeCount, setLikeCount] = useState("");

  useEffect(() => {
    // Use UserServices to fetch posts
    UserService.getUserBoard().then((response) => {
      setUser(response.data.User);
    });

    UserService.getAllPost().then((response) => {
      setSolutions(response.data.Posts);
    });

    UserService.getTopSolusi().then((response) => {
      setTopSolusi(response.data.Post);
    });

    UserService.getLatestSolusi().then((response) => {
      setLatestSolusi(response.data.Post);
    });
  }, []);

  useEffect(() => {
    // Fetch comments for each post
    const newCommentsSolutions = [...commentsSolutions];
    const newCommentsSolutionsCount = [...commentsSolutions];
    const newLikedSolutions = [...likedSolutions];
    const newLikedSolutionsCount = [...likedSolutions];
    solutions.forEach(async (solusi, index) => {
      try {
        const response = await UserService.getAllCommentPost(solusi.id);
        newCommentsSolutions[index] = response.data.Comments;
        newCommentsSolutionsCount[index] = response.data.Comments.length;
        const responses = await UserService.getAllLikesPost(solusi.id);
        newLikedSolutions[index] = responses.data.Likes;
        newLikedSolutionsCount[index] = responses.data.Likes.length;
        const comments = response.data.Comments;
        for (const comment of comments) {
          const response = await UserService.getAllRepliesComment(comment.id);
          comment.replyCount = response.data.Replies.length;
        }

        if (index === solutions.length - 1) {
          setCommentsSolutions(newCommentsSolutions);
          setCommentCount(newCommentsSolutionsCount);
          setLikedSolutions(newLikedSolutions);
          setLikeCount(newLikedSolutionsCount);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    });
  }, [solutions]);

  const createPostSolutions = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/posts/create",
        {
          Post_Content: postSolutions,
          Post_User: user.id,
        }
      );
      if (response) {
        alert("success post");
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createPostComment = async (solutionId) => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/comments/create",
      {
        Comment_Content: postCommentSolutions[solutionId],
        Comment_Post: solutionId,
        Comment_User: user.id,
      }
    );
    if (response) {
      alert("comment succes");
      window.location.reload();
    } else {
      alert("comment failed");
    }
  };

  const createLikesPost = async (postId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/likes/create",
        {
          Likes_Posts: postId,
          Likes_Users: user.id,
        }
      );
      if (response) {
        alert("like posts");
      } else {
        alert("likes failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full min-h-screen flex justify-center px-5">
        <div className="w-4/6 p-2">
          <div className="w-full h-24 flex flex-col justify-center">
            {user && (
              <div className="font-bold text-3xl text-gray-800">
                Hello,
                <span className="pl-1 text-4xl">{user.User_username}</span>
              </div>
            )}
            <div className="font-medium text-xl text-gray-600 border-b-2 py-2">
              Luapkan isi hati kamu di solusi{" "}
              <span className="text-blue-600 text-lg">
                {user ? null : <Link to="/signin">Login</Link>}
              </span>
            </div>
          </div>
          {user && (
            <div className="w-full flex items-center h-44 border-b-2 pt-2 rounded-lg bg-white shadow-md p-2">
              <div className="h-full">
                <img
                  // src={`http://localhost:5000/image-profile/${user.profilePicture}`}
                  src={Default}
                  alt="pro"
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <form
                onSubmit={createPostSolutions}
                className="w-full rounded-lg"
              >
                <div className="flex flex-col pb-4">
                  <div className="w-full flex justify-center items-center px-2">
                    <div className="w-full mb-2 mt-2">
                      <textarea
                        className="rounded-lg border leading-normal w-full resize-none font-normal focus:outline-none p-2"
                        name="body"
                        value={postSolutions}
                        onChange={(e) => setPostSolutions(e.target.value)}
                        placeholder="Type Your Comment"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full flex justify-between px-1">
                    <div></div>
                    <button
                      type="submit"
                      className="bg-white  py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-400 flex items-center gap-4"
                    >
                      <span className="text-gray-700 font-semibold">post</span>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {solutions
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((solusi, index) => (
              <div className="w-full mt-4 py-2 border-b-2" key={index}>
                <div className="w-full p-2">
                  <div className="w-full flex">
                    <div className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={Default}
                            alt=""
                          />
                        </div>
                        <div className="flex ml-6 font-medium">
                          <p className="text-base leading-6 cursor-default">
                            {`anon user`}
                            <span className="text-sm leading-5 font-medium text-gray-400 pl-2">
                              {FormatTime.formatTime(solusi.createdAt)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full pl-16 ">
                    <Link to={`/solusi/${solusi.id}`}>
                      <div className="overflow-hidden">
                        <p className="whitespace-no-wrap overflow-ellipsis overflow-hidden">
                          {solusi.Post_Content}
                        </p>
                      </div>
                    </Link>
                    <div className="w-full mt-2">
                      <div className="flex gap-4 items-center">
                        <div
                          className="w-64 flex items-center justify-between cursor-pointer"
                          onClick={() => {
                            const newArray = [...replyIndex];
                            newArray[index] = !newArray[index];
                            setReplyIndex(newArray);
                          }}
                          // onClick={() => setReplyIndex(!replyIndex)}
                        >
                          <div className="w-36 rounded-r-full overflow-hidden flex -space-x-3"></div>
                          <div className="text-base text-gray-400 font-semibold">
                            {commentCount[index] ? commentCount[index] : 0}{" "}
                            replies
                          </div>
                          <div
                            className={`transition transition-transform duration-300 ${
                              replyIndex[index] ? "rotate-180 " : ""
                            } `}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-gray-800"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="text-center flex gap-2">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              createLikesPost(solusi.id);
                            }}
                          >
                            <button>
                              <svg
                                className="text-center text-gray-400 h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                              </svg>
                            </button>
                          </form>
                          <div className="text-[16px] text-gray-400 font-semibold">
                            {likeCount[index] ? likeCount[index] : 0} likes
                          </div>
                        </div>
                      </div>
                      {replyIndex[index] && (
                        <>
                          <div className="w-full max-h-72 overflow-auto">
                            {commentsSolutions[index] &&
                            commentsSolutions[index].length > 0 ? (
                              commentsSolutions[index]
                                .sort(
                                  (a, b) =>
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                                )
                                .map((comment) => (
                                  <div className="w-full mt-2" key={comment.id}>
                                    <div className="flex-1 px-4 py-2 mt-1">
                                      <strong>username</strong>{" "}
                                      <span className="text-xs text-gray-400 mx-1">
                                        {FormatTime.formatTime(
                                          comment.createdAt
                                        )}
                                      </span>
                                      <p className="text-sm my-2">
                                        {comment.Comment_Content}
                                      </p>
                                    </div>
                                    <div className="w-full text-left px-4 relative">
                                      <p className="text-xs text-gray-400">
                                        {comment.replyCount || 0} replies
                                      </p>
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <div className="w-full mt-2">
                                <div className="flex-1 px-4 py-2 mt-1">
                                  Not yet any comment
                                </div>
                              </div>
                            )}
                          </div>
                          <>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                createPostComment(solusi.id); // Pass the postId as an argument
                              }}
                              className="w-full rounded-lg"
                            >
                              <div className="flex flex-col pb-4">
                                <div className="w-full flex justify-center">
                                  <div className="w-full mb-2 mt-2">
                                    <textarea
                                      className="rounded border leading-normal resize-none w-full font-medium placeholder-gray-700 focus:outline-none focus:bg-white p-2"
                                      name="body"
                                      placeholder="Type Your Replies Comment"
                                      required
                                      value={
                                        postCommentSolutions[solusi.id] || ""
                                      } // Use the postComments state
                                      onChange={(e) =>
                                        setPostCommentSolutions(
                                          (prevComments) => ({
                                            ...prevComments,
                                            [solusi.id]: e.target.value,
                                          })
                                        )
                                      }
                                      rows="3"
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="w-full flex justify-between">
                                  <div></div>
                                  <button
                                    type="submit"
                                    className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                  >
                                    <span className="text-gray-700 font-semibold">
                                      Comment
                                    </span>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                  </button>
                                </div>
                              </div>
                            </form>
                          </>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="w-2/6 mt-24">
          {/* Top Solusi */}
          <div className="w-full rounded-lg overflow-hidden bg-white shadow-md px-4 pt-3 pb-6 mt-4">
            <div className="flex">
              <div className="flex-1 mx-1 my-1.5">
                <h2 className="px-4 py-1 text-xl w-full font-semibold ">
                  Top Solusi
                </h2>
              </div>
            </div>
            {topSolusi.map((solusi, index) => (
              <div key={index}>
                <hr className="border-gray-600" />
                <div className="flex-1">
                  <p
                    className="px-4 ml-2 mt-4 font-semibold"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    @ {solusi.Post_Content}
                  </p>
                  <div className="px-4 ml-2 my-1.5 text-sm text-gray-400 flex">
                    <p className="mr-2.5">
                      <span className="font-bold"> {solusi.commentCount}</span>{" "}
                      Comments
                    </p>
                    <p className="ml-2.5">
                      <span className="font-bold">{solusi.likeCount} </span>{" "}
                      Likes{" "}
                    </p>
                  </div>
                </div>
                <hr className="border-gray-400" />
              </div>
            ))}
          </div>

          {/* New Solusi */}
          <div className="w-full rounded-lg overflow-hidden bg-white shadow-md px-4 pt-3 pb-6 mt-4">
            <div className="flex">
              <div className="flex-1 mx-1 my-1.5">
                <h2 className="px-4 py-1 text-xl w-full font-semibold ">
                  Latest Solusi
                </h2>
              </div>
            </div>
            {latestSolusi.map((solusi, index) => (
              <div key={index}>
                <hr className="border-gray-600" />
                <div className="flex-1">
                  <p
                    className="px-4 ml-2 mt-4 font-semibold"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    @ {solusi.Post_Content}
                  </p>
                  <div className="px-4 ml-2 my-1.5 text-xs text-gray-400 flex gap-2">
                    <p>{FormatTime.formatTime(solusi.createdAt)}</p>

                    <p>||</p>
                    <p>
                      {new Date(solusi.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                    </p>
                  </div>
                </div>
                <hr className="border-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
