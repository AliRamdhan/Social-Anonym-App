import React, { useEffect, useState } from "react";
import Header from "../components/Feature/Header";
import Footer from "../components/Feature/Footer";
import Default from "../images/default.png";
import { Link, useParams } from "react-router-dom";
import UserService from "../services/user.service";
const Cerita_Details = () => {
  const [replyIndex, setReplyIndex] = useState(false);
  const [narations, setNarations] = useState("");
  const [ceritaComments, setCeritaComments] = useState([]);
  const [postCeritaComments, setPostCeritaComments] = useState("");
  const [user, setUser] = useState("");
  const { ceritaId } = useParams();
  useEffect(() => {
    UserService.getUserBoard().then((response) => {
      // console.log(response.data.User);
      setUser(response.data.User);
    });
  }, []);

  useEffect(() => {
    UserService.getDetailsOneCerita(ceritaId).then((response) => {
      // console.log(response.data.Cerita);
      setNarations(response.data.Cerita);
    });
    UserService.getAllCommentCerita(ceritaId).then((response) => {
      // console.log(response.data.Comment);
      setCeritaComments(response.data.Comment);
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
      <div className="w-full min-h-screen flex justify-between gap-8 pt-4 px-5">
        {narations && (
          <>
            <div className="w-full">
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
                      username
                      <span className="pl-2 text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        date at
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="pl-14">
                <p className="text-base width-auto font-medium  flex-shrink py-4">
                  content
                </p>
                <div className="flex">
                  <div className="w-full">
                    <div className="w-full flex items-center gap-2">
                      <div className="text-[15.5px] leading-5 font-medium  group flex items-center ">
                        {/* LIKES */}
                        <form>
                          <div>
                            <button type="submit">
                              <svg
                                className="text-center text-gray-600 h-7 w-7"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                // strokeWidth="0"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                              </svg>
                            </button>
                          </div>
                        </form>
                        <p className="pl-2 text-gray-400 ">
                          <span className="font-semibold">34</span> Likes
                        </p>
                      </div>

                      <div className="group flex justify-center items-center  text-[15.5px] leading-5 font-medium">
                        <div>
                          <svg
                            className="text-center text-gray-400 h-7 w-7"
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
                          <span className="font-semibold">32</span> Comments
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
                            comment username
                            <span className="pl-2 text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                              22/02/12
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pl-16">
                      content comment
                      <div className="flex">
                        <div className="w-full">
                          <div className="flex items-center">
                            <div className="text-center">
                              <div className="w-12  group flex items-center text-gray-500 text-base leading-6 font-medium rounded-full hover:text-gray-500">
                                <svg
                                  onClick={() => setReplyIndex(!replyIndex)}
                                  className="text-center h-6 w-6"
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
                            </div>

                            <div className="text-center m-2">
                              <div className="w-12  group flex items-center text-gray-500 text-base leading-6 font-medium rounded-full hover:text-gray-500">
                                <svg
                                  className="text-center h-7 w-6"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {replyIndex && (
                        <>
                          <div className="w-full mt-2">
                            <div className="flex-1 px-4 py-2 mt-1">
                              <strong> dwadwa</strong>
                              <span className="text-xs text-gray-400 mx-1">
                                dwadawd
                              </span>
                              <p className="text-sm">dadwad</p>
                            </div>
                          </div>

                          <form className="w-full rounded-lg">
                            <div className="flex flex-col pb-4">
                              <div className="w-full flex justify-center">
                                <div className="w-full px-4 mb-2 mt-2">
                                  <textarea
                                    className="rounded border leading-normal resize-none w-full font-medium placeholder-gray-700 focus:outline-none focus:bg-white p-2"
                                    name="body"
                                    placeholder="Type Your Replies Comment"
                                    required
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
                ))}
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-full rounded-lg overflow-hidden bg-white shadow-md px-4 pt-3 pb-6 mt-4">
                <div className="flex">
                  <div className="flex-1 mx-1 my-1.5">
                    <h2 className="px-4 py-1 text-xl w-full font-semibold ">
                      Topik yang lagi trend
                    </h2>
                  </div>
                </div>
                <hr className="border-gray-600" />
                <div>
                  <Link>
                    <div className="flex-1">
                      <h2 className="px-4 ml-2 mt-4 w-48 font-bold ">
                        #Curhat
                      </h2>
                      <p className="px-4 ml-2 mb-2 w-48 text-xs text-gray-400">
                        5,466 Tweets
                      </p>
                    </div>
                  </Link>
                  <hr className="border-gray-400" />
                  <Link>
                    <div className="flex-1">
                      <h2 className="px-4 ml-2 mt-4 w-48 font-bold ">
                        #Sharing
                      </h2>
                      <p className="px-4 ml-2 mb-2 w-48 text-xs text-gray-400">
                        5,466 Tweets
                      </p>
                    </div>
                  </Link>
                  <hr className="border-gray-400" />
                  <Link>
                    <div className="flex-1">
                      <h2 className="px-4 ml-2 mt-4 w-48 font-bold ">
                        #MintaPendapat
                      </h2>
                      <p className="px-4 ml-2 mb-2 w-48 text-xs text-gray-400">
                        5,466 Tweets
                      </p>
                    </div>
                  </Link>
                  <hr className="border-gray-400" />
                  <Link>
                    <div className="flex-1">
                      <h2 className="px-4 ml-2 mt-4 w-48 font-bold ">
                        #Random
                      </h2>
                      <p className="px-4 ml-2 mb-2 w-48 text-xs text-gray-400">
                        5,466 Tweets
                      </p>
                    </div>
                  </Link>
                  <hr className="border-gray-400" />
                </div>
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
