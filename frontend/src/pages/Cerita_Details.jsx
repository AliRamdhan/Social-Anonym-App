import React, { useEffect, useState } from "react";
import Header from "../components/Feature/Header";
import Footer from "../components/Feature/Footer";
import Default from "../images/default.png";
import { Link, useParams } from "react-router-dom";
import FormatTime from "../services/user.time";
import UserService from "../services/user.service";
const Cerita_Details = () => {
  const [narations, setNarations] = useState("");
  const [ceritaComments, setCeritaComments] = useState([]);
  const [postCeritaComments, setPostCeritaComments] = useState("");
  const [topCerita, setTopCerita] = useState([]);
  const [topGenreCerita, setTopGenreCerita] = useState([]);
  const [likesCounts, setLikesCounts] = useState(null);
  const [commentsCounts, setCommentsCounts] = useState(null);
  const [user, setUser] = useState("");
  const { ceritaId } = useParams();

  useEffect(() => {
    UserService.getUserBoard().then((response) => {
      setUser(response.data.User);
    });
    UserService.getTopCerita().then((response) => {
      setTopCerita(response.data.Cerita);
    });
    UserService.getTopGenreCerita().then((response) => {
      setTopGenreCerita(response.data.Genre);
    });
  }, []);

  useEffect(() => {
    UserService.getDetailsOneCerita(ceritaId).then((response) => {
      setNarations(response.data.Cerita);
    });
    UserService.getAllCommentCerita(ceritaId).then((response) => {
      setCeritaComments(response.data.Comment);
      console.log(response.data.Comment);
      setCommentsCounts(response.data.Comment.length);
    });
    UserService.getAllLikesCerita(ceritaId).then((response) => {
      setLikesCounts(response.data.LikeCount);
    });
  }, [ceritaId]);

  const createCommentCerita = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.createCommentCerita(
        postCeritaComments,
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
  return (
    <div>
      <Header />
      <div className="w-full min-h-screen flex justify-between gap-3 py-4 px-5">
        {narations && (
          <>
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
                        {FormatTime.formatTime(narations.createdAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="pl-14">
                <p className="text-base width-auto font-medium  flex-shrink py-4">
                  {narations.Cerita_Content}
                </p>
                <div className="flex">
                  <div className="w-full">
                    <div className="w-full flex items-center gap-2">
                      <div className="text-[15.5px] leading-5 font-medium  group flex items-center ">
                        {/* LIKES */}
                        <form>
                          <div className="flex justify-center items-center">
                            <button type="submit">
                              <svg
                                className="text-center text-gray-600 h-6 w-6"
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
                          </div>
                        </form>
                        <p className="pl-2 text-gray-400 ">
                          <span className="font-semibold">{likesCounts}</span>{" "}
                          Likes
                        </p>
                      </div>

                      <div className="flex justify-center items-center  text-[15.5px] leading-5 font-medium">
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
                        <p className="pl-2 text-gray-400 ">
                          <span className="font-semibold">
                            {commentsCounts}
                          </span>{" "}
                          Comments
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-y-2 pt-4 pb-2 mt-2">
                <form
                  className="w-full rounded-lg"
                  onSubmit={createCommentCerita}
                >
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
                            setPostCeritaComments(e.target.value)
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
              <div className="border-b">
                {ceritaComments.map((comments, index) => (
                  <div key={index}>
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
                              {FormatTime.formatTime(comments.createdAt)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pl-14 pb-2">
                      {comments.Comment_Content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-2/6">
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
                          <span className="font-bold">
                            {" "}
                            {cerita.commentCount}{" "}
                          </span>
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
                        <span className="mr-2.5">
                          {" "}
                          {genre.ceritaCount} Cerita{" "}
                        </span>
                      </p>
                    </div>
                    <hr className="border-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cerita_Details;
