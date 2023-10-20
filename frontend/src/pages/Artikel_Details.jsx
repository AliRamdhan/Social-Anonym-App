import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Feature/Footer";
import Header from "../components/Feature/Header";
const Artikel_Details = () => {
  const [articles, setArticles] = useState([1, 2, 3]);
  return (
    <>
      <Header />
      <div className="w-full min-h-screen px-12 py-16 mx-auto space-y-12">
        <article className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold md:tracki md:text-5xl">
              Suspendisse ut magna et ipsum sodales accumsan.
            </h1>
            <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center">
              <div className="flex items-center md:space-x-2">
                <img
                  src="https://source.unsplash.com/75x75/?portrait"
                  alt=""
                  className="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                />
                <p className="text-sm">Leroy Jenkins • July 19th, 2021</p>
              </div>
              <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                4 min read • 1,570 views
              </p>
            </div>
          </div>
          <div className="">
            <p>
              Insert the actual text content here... Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Iusto ratione, harum reiciendis
              praesentium sed labore quo voluptatum, temporibus animi laboriosam
              earum totam maxime dignissimos assumenda placeat, ad illo enim.
              Corporis!
            </p>
          </div>
        </article>
        <div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Related posts</h4>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
              {articles.map((artikel, index) => (
                <article
                  className="flex flex-col bg-white shadow-md rounded-xl"
                  key={index}
                >
                  <Link to={`/artikel/2/nama`}>
                    <img
                      alt=""
                      className="object-cover w-full h-52"
                      src="https://source.unsplash.com/200x200/?fashion?1"
                    />
                  </Link>
                  <div className="flex flex-col flex-1 p-6">
                    <Link to={`/artikel/2/nama`}></Link>
                    <Link
                      to={`/artikel/2/nama`}
                      className="text-xs tracki
                    uppercase hover:underline dark:text-violet-400"
                    >
                      {" "}
                      Convenire
                    </Link>
                    <h3 className="flex-1 py-2 text-lg font-semibold leadi">
                      Te nulla oportere reprimique his dolorum
                    </h3>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                      <span>June 1, 2020</span>
                      <span>2.1K views</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Artikel_Details;
