import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Default from "../images/default.png";
import Header from "../components/Feature/Header";
import Footer from "../components/Feature/Footer";
import UserService from "../services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FormatTime from "../services/user.time";
const Solusi_Details = () => {
  const { solusiId } = useParams();
  const [user, setUser] = useState("");
  const [solutions, setSolutions] = useState("");
  //Comment Post
  const [commentSolutions, setCommentSolutions] = useState([]);
  const [postCommentSolutions, setPostCommentSolutions] = useState("");
  //Replies Comment
  const [repliesComments, setRepliesComments] = useState([]);
  const [repliesPostComments, setRepliesPostComments] = useState("");
  const [replyIndex, setReplyIndex] = useState(
    commentSolutions.map(() => false)
  );
  //count
  const [likeCount, setLikeCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [topSolusi, setTopSolusi] = useState([]);
  const [latestSolusi, setLatestSolusi] = useState([]);
  useEffect(() => {
    UserService.getDetailsOnePost(solusiId).then((response) => {
      setSolutions(response.data.Post);
    });
    UserService.getUserBoard().then((response) => {
      setUser(response.data.User.id);
    });
    UserService.getAllLikesPost(solusiId).then((response) => {
      setLikeCount(response.data.Likes.length);
    });
    UserService.getAllCommentPost(solusiId).then((response) => {
      setCommentSolutions(response.data.Comments);
      setCommentCount(response.data.Comments.length);

      UserService.getTopSolusi().then((response) => {
        setTopSolusi(response.data.Post);
      });

      UserService.getLatestSolusi().then((response) => {
        setLatestSolusi(response.data.Post);
      });
    });
  }, [solusiId]);

  useEffect(() => {
    // Fetch comments for each post
    const newRepliesComment = [...repliesComments];
    const newRepliesCommentCount = [...repliesComments];
    commentSolutions.forEach(async (comment, index) => {
      try {
        const response = await UserService.getAllRepliesComment(comment.id);
        newRepliesComment[index] = response.data.Replies;
        comment.replyCount = response.data.Replies.length;
        if (index === commentSolutions.length - 1) {
          setRepliesComments(newRepliesComment);
        }
      } catch (error) {
        console.error("Error fetching replies comments:", error);
      }
    });
  }, [commentSolutions]);

  const createPostComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/comments/create",
        {
          Comment_Content: postCommentSolutions,
          Comment_Post: solusiId,
          Comment_User: user,
        }
      );
      if (response) {
        console.log(response.data);
        alert("comment succes");
      } else {
        alert("comment failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createLikesPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/likes/create",
        {
          Likes_Posts: solusiId,
          Likes_Users: user,
        }
      );
      if (response) {
        alert("like posts");
        window.location.reload();
      } else if (hasLike) {
        alert("likes was remove");
      } else {
        alert("likes failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createRepliesComment = async (commentId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/replies/create",
        {
          Reply_Content: repliesPostComments[commentId],
          Replies_Comments: commentId,
          Replies_Users: user,
        }
      );
      if (response) {
        alert("replies succes");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full min-h-screen flex justify-between gap-8 px-5 py-4">
        {solutions && (
          <div className="w-4/6 p-2">
            <div className="flex flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src={Default}
                    alt="Profile User"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base leading-6 font-medium">
                    {`anon.user`}
                    <span className="pl-2 text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      {FormatTime.formatTime(solutions.createdAt)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="pl-14">
              <p className="text-base width-auto font-medium  flex-shrink py-4">
                {solutions.Post_Content}
              </p>
              <div className="flex">
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-36 text-[15.5px] leading-5 font-medium  group flex items-center ">
                      {/* LIKES */}
                      <button onClick={createLikesPost}>
                        <svg
                          className="text-center text-gray-600 h-6 w-6"
                          fill={`none`}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={`2`}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      </button>

                      <p className="pl-2 text-gray-400 ">
                        <span className="font-semibold">{likeCount}</span> Likes
                      </p>
                    </div>

                    <div className="w-36 group flex justify-center items-center  text-[15.5px] leading-5 font-medium">
                      <div>
                        <svg
                          className="text-center text-gray-600 h-6 w-6"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                      </div>
                      <p className="pl-2 text-gray-400 ">
                        <span className="font-semibold">{commentCount}</span>{" "}
                        Comments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-y-2 pt-4 pb-2 mt-2">
              <form className="w-full rounded-lg" onSubmit={createPostComment}>
                <div className="flex flex-col pb-4">
                  <div className="w-full flex justify-center">
                    <div className="w-10 h-10 py-2">
                      <img
                        src={Default}
                        alt="Profile User"
                        className="rounded-full"
                      />
                    </div>
                    <div className="w-full px-4 mb-2 mt-2">
                      <textarea
                        className="p-2 rounded border border-gray-400 leading-normal resize-none w-full font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        name="body"
                        placeholder="Type Your Comment"
                        required
                        onChange={(e) =>
                          setPostCommentSolutions(e.target.value)
                        }
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full flex justify-between px-5">
                    <div></div>
                    <button
                      type="submit"
                      className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {commentSolutions &&
              commentSolutions.map((comment, index) => (
                <div className="border-b" key={index}>
                  <div className="flex flex-shrink-0 py-2">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src={Default}
                          alt="Profile User"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base leading-6 font-medium">
                          {`anon.user`}
                          <span className="pl-2 text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                            {FormatTime.formatTime(comment.createdAt)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pl-16">
                    <p> {comment.Comment_Content}</p>
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
                            {comment.replyCount} replies
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
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              createLikesPost(comment.id);
                            }}
                          >
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
                          <div className="text-[16px] text-gray-400 font-semibold">
                            {34} likes
                          </div>
                        </div>
                      </div>
                      {replyIndex[index] && (
                        <>
                          {repliesComments[index] &&
                          repliesComments[index].length > 0 ? (
                            repliesComments[index].map((reply, index) => (
                              <div className="w-full mt-2" key={index}>
                                <div className="flex-1 px-4 py-2 mt-1">
                                  <p>
                                    {`anon.user`}
                                    <span className="text-xs text-gray-400 ml-2">
                                      {FormatTime.formatTime(reply.createdAt)}
                                    </span>
                                  </p>{" "}
                                  <p className="text-sm p-4">
                                    {reply.Reply_Content}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="w-full mt-2">
                              <div className="flex-1 px-4 py-2 mt-1">
                                Not yet any replies
                              </div>
                            </div>
                          )}
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              createRepliesComment(comment.id); // Pass the commentId as an argument
                            }}
                            className="w-full rounded-lg"
                          >
                            <div className="flex flex-col pb-4">
                              <div className="w-full flex justify-center">
                                <div className="w-full px-4 mb-2 mt-2">
                                  <textarea
                                    className="rounded border leading-normal resize-none w-full font-medium placeholder-gray-700 focus:outline-none focus:bg-white p-2"
                                    name="body"
                                    placeholder="Type Your Replies Comment"
                                    required
                                    value={
                                      repliesPostComments[comment.id] || ""
                                    }
                                    onChange={(e) =>
                                      setRepliesPostComments((prevReplies) => ({
                                        ...prevReplies,
                                        [comment.id]: e.target.value,
                                      }))
                                    }
                                    rows="3"
                                  ></textarea>
                                </div>
                              </div>
                              <div className="w-full flex justify-between px-5">
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
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        <div className="w-2/6">
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
};

export default Solusi_Details;
