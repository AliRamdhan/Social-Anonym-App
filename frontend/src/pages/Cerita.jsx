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
export default function Cerita() {
  const [user, setUser] = useState("");
  const [genres, setGenres] = useState([]);
  const [narations, setNarations] = useState([]);
  const [commentsNarations, setCommentsNarations] = useState([]);
  const [postCommentsNarations, setPostCommentsNarations] = useState({});
  const [postGenre, setPostGenre] = useState("");
  const [postNarations, setPostNarations] = useState("");
  const [replyIndex, setReplyIndex] = useState(narations.map(() => false));

  const [topCerita, setTopCerita] = useState([]);
  const [latestCerita, setLatestCerita] = useState([]);
  const [topGenreCerita, setTopGenreCerita] = useState([]);
  //Count
  const [commentsNarationsCount, setCommentsNarationsCount] = useState("");
  const [likesNarationsCount, setLikesNarationsCount] = useState("");

  useEffect(() => {
    UserService.getAllCerita().then((response) => {
      setNarations(response.data.Cerita);
    });
    UserService.getUserBoard().then((response) => {
      // console.log(response.data.User);
      setUser(response.data.User);
    });
    UserService.getAllGenreCerita().then((response) => {
      setGenres(response.data.Genre);
    });

    UserService.getTopCerita().then((response) => {
      setTopCerita(response.data.Cerita);
    });
    UserService.getTopGenreCerita().then((response) => {
      setTopGenreCerita(response.data.Genre);
    });
    UserService.getLatestCerita().then((response) => {
      setLatestCerita(response.data.Cerita);
    });
  }, []);

  useEffect(() => {
    // Fetch comments for each cerita
    const newCommentsNarations = [...commentsNarations];
    const newCommentsNarationsCount = [...commentsNarations];
    const newLikesNarationsCount = [...commentsNarations];
    narations.forEach(async (narasi, index) => {
      try {
        const response = await UserService.getAllCommentCerita(narasi.id);
        newCommentsNarations[index] = response.data.Comment;
        newCommentsNarationsCount[index] = response.data.Comment.length;
        const responses = await UserService.getAllLikesCerita(narasi.id);
        newLikesNarationsCount[index] = responses.data.LikeCount;
        if (index === narations.length - 1) {
          setCommentsNarations(newCommentsNarations);
          setCommentsNarationsCount(newCommentsNarationsCount);
          setLikesNarationsCount(newLikesNarationsCount);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    });
  }, [narations]);

  const createCerita = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.createOneCerita(
        postNarations,
        user.id,
        postGenre
      );
      if (response) {
        alert("cerita succesffully");
      } else {
        alert("cerita failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createCommentCerita = async (ceritaId) => {
    try {
      const response = await UserService.createCommentCerita(
        postCommentsNarations[ceritaId],
        ceritaId,
        user.id
      );
      if (response) {
        alert("comment succes");
      } else {
        alert("comment failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createLikesCerita = async (ceritaId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/cerita/likes/create",
        {
          Likes_Cerita: ceritaId,
          Likes_Users: user.id,
        }
      );
      if (response) {
        alert("like posts");
        window.location.reload();
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
            <div className="font-medium text-xl text-gray-600">
              Luapkan isi hati dengan bercerita di solusi{" "}
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
              <form className="w-full rounded-lg" onSubmit={createCerita}>
                <div className="flex flex-col pb-4">
                  <div className="w-full flex justify-center items-center px-2 relative">
                    <div className="absolute top-2 right-2">
                      <select
                        className="w-44 border-2 p-2 rounded-lg"
                        value={postGenre}
                        onChange={(e) => setPostGenre(e.target.value)}
                      >
                        <option value="">Pilih Genre</option>
                        {genres.map((genre) => (
                          <option key={genre.id} value={genre.id}>
                            {genre.Genre_Cerita}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full mb-2 mt-2">
                      <textarea
                        className="rounded-lg border leading-normal w-full resize-none font-normal focus:outline-none p-2"
                        name="body"
                        onChange={(e) => setPostNarations(e.target.value)}
                        placeholder="Type Your Cerita"
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
          {narations.map((cerita, index) => (
            <div className="w-full mt-4 py-2" key={index}>
              <div className="w-full p-2">
                <div className="flex flex-shrink-0 ">
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
                          {`anon.user`}
                          <span className="text-sm leading-5 font-medium text-gray-400 pl-2">
                            {FormatTime.formatTime(cerita.createdAt)}
                          </span>
                          <span className="text-sm leading-5 font-medium text-gray-400 pl-2 uppercase">
                            {cerita.Genre.Genre_Cerita}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pl-16">
                  <Link to={`/cerita/${cerita.id}`}>
                    <p className="text-base width-auto font-medium  flex-shrink">
                      {cerita.Cerita_Content}
                    </p>
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
                      >
                        <div className="w-36 rounded-r-full overflow-hidden flex -space-x-3"></div>
                        <div className="text-base text-gray-400 font-semibold">
                          {commentsNarationsCount[index]} replies
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
                            createLikesCerita(cerita.id);
                          }}
                        >
                          <button type="submit">
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
                          {likesNarationsCount[index]} likes
                        </div>
                      </div>
                    </div>
                    {replyIndex[index] && (
                      <>
                        <div className="w-full max-h-72 overflow-auto">
                          {commentsNarations[index] &&
                          commentsNarations[index].length > 0 ? (
                            commentsNarations[index].map((comment) => (
                              <div className="w-full mt-2" key={comment.id}>
                                <div className="flex-1 px-4 py-2 mt-1">
                                  <strong>username</strong>{" "}
                                  <span className="text-xs text-gray-400 mx-1">
                                    {FormatTime.formatTime(comment.createdAt)}
                                  </span>
                                  <p className="text-sm my-2">
                                    {comment.Comment_Content}
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

                        <form
                          className="w-full rounded-lg"
                          onSubmit={(e) => {
                            e.preventDefault();
                            createCommentCerita(cerita.id);
                          }}
                        >
                          <div className="flex flex-col pb-4">
                            <div className="w-full flex justify-center">
                              <div className="w-full px-4 mb-2 mt-2">
                                <textarea
                                  className="rounded border leading-normal resize-none w-full font-medium placeholder-gray-700 focus:outline-none focus:bg-white p-2"
                                  name="body"
                                  placeholder="Type Your Replies Comment"
                                  required
                                  value={postCommentsNarations[cerita.id] || ""} // Use the postComments state
                                  onChange={(e) =>
                                    setPostCommentsNarations(
                                      (prevComments) => ({
                                        ...prevComments,
                                        [cerita.id]: e.target.value,
                                      })
                                    )
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
                                Reply
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-2/6 mt-24">
          {/* Top Cerita */}
          <div className="w-full rounded-lg overflow-hidden bg-white shadow-md px-4 pt-3 pb-6 mt-4">
            <div className="flex">
              <div className="flex-1 mx-1 my-1.5">
                <h2 className="px-4 py-1 text-xl w-full font-semibold ">
                  Top Cerita
                </h2>
              </div>
            </div>
            {topCerita.map((cerita, index) => (
              <div key={index}>
                <hr className="border-gray-600" />
                <div className="flex-1 px-4 ml-2">
                  <p
                    className="mt-4 font-semibold"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    @ {cerita.Cerita_Content}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {cerita.Genre.Genre_Cerita}
                  </p>
                  <div className="my-1.5 text-sm text-gray-400 flex">
                    <p className="mr-2.5">
                      <span className="font-bold"> {cerita.commentCount} </span>
                      Comments
                    </p>
                    <p className="ml-2.5">
                      <span className="font-bold">{cerita.likeCount} </span>
                      Likes
                    </p>
                  </div>
                </div>
                <hr className="border-gray-400" />
              </div>
            ))}
          </div>

          {/* Top Genre */}
          <div className="w-full rounded-lg overflow-hidden bg-white shadow-md px-4 pt-3 pb-6 mt-4">
            <div className="flex">
              <div className="flex-1 mx-1 my-1.5">
                <h2 className="px-4 py-1 text-xl w-full font-semibold ">
                  Top Topic
                </h2>
              </div>
            </div>
            {topGenreCerita.map((genre, index) => (
              <div key={index}>
                <hr className="border-gray-600" />
                <div className="flex-1">
                  <h2 className="px-4 ml-2 mt-4  font-bold ">
                    @ {genre.Genre_Cerita}
                  </h2>
                  <p className="px-4 ml-2 my-1.5 text-xs text-gray-400">
                    <span className="mr-2.5"> {genre.ceritaCount} Cerita </span>
                  </p>
                </div>
                <hr className="border-gray-400" />
              </div>
            ))}
          </div>

          {/* New Cerita */}
          <div className="w-full rounded-lg overflow-hidden bg-white shadow-md px-4 pt-3 pb-6 mt-4">
            <div className="flex">
              <div className="flex-1 mx-1 my-1.5">
                <h2 className="px-4 py-1 text-xl w-full font-semibold ">
                  Latest Cerita
                </h2>
              </div>
            </div>
            {latestCerita.map((cerita, index) => (
              <div key={index}>
                <hr className="border-gray-600" />
                <div className="flex-1 px-4 ml-2">
                  <p
                    className="mt-4 font-semibold"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    @ {cerita.Cerita_Content}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {cerita.Genre.Genre_Cerita}
                  </p>
                  <div className="my-1.5 text-xs text-gray-400 flex gap-2">
                    <p>{FormatTime.formatTime(cerita.createdAt)}</p>

                    <p>||</p>
                    <p>
                      {new Date(cerita.createdAt).toLocaleDateString("id-ID", {
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
