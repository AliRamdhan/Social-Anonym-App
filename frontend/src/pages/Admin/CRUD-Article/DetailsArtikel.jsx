import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAdmin from "../../../components/Feature/Header.Admin";
import AdminService from "../../../services/admin.service";
export default function DetailsArtikel() {
  const [article, setArticle] = useState("");
  const { articleId } = useParams();
  useEffect(() => {
    AdminService.getDetailsArticles(articleId).then((response) => {
      setArticle(response.data.Article);
    });
  }, [articleId]);
  return (
    <>
      <HeaderAdmin />
      <div className="w-full h-screen my-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Ubah article menjadi lebih bagus dan hebat
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            Dengan article yang bagus dan hebat dapat memberikan knowledge
            kepada setiap pembaca
          </p>
        </div>
        <div className="w-full flex flex-col justify-center items-center px-8 mt-4">
          <div className="w-full flex justify-around items-center">
            <div className="w-full h-0.5 bg-black"></div>
            <div className="w-1/2 text-center text-xl font-semibold">
              DETAILS ARTICLE
            </div>
            <div className="w-full h-0.5 bg-black"></div>
          </div>
          {article ? (
            <div className="w-full flex">
              <div className="w-3/5">
                <img
                  src={`http://localhost:5000/images/article/${article.Artikel_Picture}`}
                  alt=""
                  width="400px"
                  height="500px"
                />
              </div>
              <div className="w-full py-3">
                <div className="text-2xl font-bold">{article.Artikel_Title}</div>
                <div className="text-lg font-medium text-gray-700 mt-3">
                  {article.Artikel_Content}
                </div>
              </div>
            </div>
          ) : (
            <div>Article not found</div>
          )}
        </div>
      </div>
    </>
  );
}
