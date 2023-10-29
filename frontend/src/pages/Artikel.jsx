import React, { useEffect, useState } from "react";
import Footer from "../components/Feature/Footer";
import Header from "../components/Feature/Header";
import Default from "../images/default.png";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
const Artikel = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    UserService.getAllArticles().then((response) => {
      setArticles(response.data.Articles);
    });
  }, []);
  return (
    <>
      <Header />
      <div className="w-full min-h-sreen px-5">
        <section className="py-6 sm:py-12">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {articles.map((artikel, index) => (
              <article
                className="flex flex-col bg-white shadow-md rounded-xl"
                key={index}
              >
                <Link to={`/artikel/2/nama`}>
                  <img
                    alt=""
                    className="object-contain  w-full h-52 object-center"
                    src={`http://localhost:5000/images/article/${artikel.Artikel_Picture}`}
                  />
                </Link>
                <div className="flex flex-col flex-1 p-6">
                  <Link to={`/artikel/2/nama`}></Link>
                  <Link
                    to={`/artikel/2/nama`}
                    className="text-xs tracki
                    uppercase hover:underline dark:text-violet-400"
                  >
                    {artikel.Artikel_Title}
                  </Link>
                  <h3
                    className="flex-1 py-2 text-lg font-semibold"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                    }}
                  >
                    {artikel.Artikel_Content}
                  </h3>
                  <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                    <span>
                      {new Date(artikel.createdAt).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span>2.1K views</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Artikel;
