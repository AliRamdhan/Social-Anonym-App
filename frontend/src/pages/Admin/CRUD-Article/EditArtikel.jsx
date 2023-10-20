import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HeaderAdmin from "../../../components/Feature/Header.Admin";
import AdminService from "../../../services/admin.service";
const EditArtikel = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articlePicture, setArticlePicture] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [currentArticle, setCurrentArticle] = useState(null);
  const { articleId } = useParams();

  useEffect(() => {
    AdminService.getDetailsArticles(articleId).then((response) => {
      setCurrentArticle(response.data.Article);
      setArticleTitle(response.data.Article.Artikel_Title);
      setArticleContent(response.data.Article.Artikel_Content);
      setArticlePicture(response.data.Article.Artikel_Picture);
    });
  }, [articleId]);
  // Fetch current article data using the articleId from the URL

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setArticlePicture(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage("");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminService.updateArticles(
        articleId,
        articleTitle,
        articleContent,
        articlePicture
      );
      if (response) {
        alert("Article updated successfully");
      }
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Failed to update article");
    }
  };

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
        {currentArticle && (
          <div className="px-8">
            <div className="text-xl font-bold mb-4">Current Article Data</div>
            <div className="w-full flex gap-4 items-center">
              <div className="h-20 flex flex-col justify-around">
                <p className="text-lg font-semibold">
                  Title: {currentArticle.Artikel_Title}
                </p>
                <p className="text-lg font-semibold">
                  Content: {currentArticle.Artikel_Content}
                </p>
              </div>
              <img
                src={`http://localhost:5000/images/article/${currentArticle.Artikel_Picture}`}
                alt="Current Article"
                width={`200px`}
              />
            </div>
          </div>
        )}
        <form onSubmit={handleUpdateSubmit}>
          <div className="w-full flex justify-center">
            <div className="w-full mb-0 mt-4 mx-8 flex flex-col items-center gap-4">
              <div className="w-full">
                <label htmlFor="articleTitle" className="text-xl text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  name="articleTitle"
                  value={articleTitle}
                  className="w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm border-2"
                  onChange={(e) => setArticleTitle(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="articleContent">Content:</label>
                <textarea
                  name="articleContent"
                  value={articleContent}
                  className="w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm border-2"
                  rows="3"
                  onChange={(e) => setArticleContent(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center w-full">
                <div>
                  <div className="text-lg text-gray-600">
                    Preview Article Picture
                  </div>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                </div>
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-40 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                    <div className="flex justify-center w-2/5">
                      <img
                        className="has-mask h-24 object-center"
                        src=""
                        alt="freepik e"
                      />
                    </div>
                    <div className="pointer-none text-sm text-gray-500">
                      <span className="text-sm">Drag and drop</span>
                      files here or
                      <div className="w-full flex justify-center items-center">
                        <div
                          href=""
                          id="fileUploadLabel"
                          className="text-blue-600 hover:underline"
                        >
                          <input
                            type="file"
                            name="articlePicture"
                            onChange={handleImageChange}
                            className="w-56"
                          />
                        </div>
                        from your computer
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              <div className="w-full flex justify-end items-end gap-4">
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-blue-500 px-12 py-1 text-lg font-medium text-white"
                >
                  Update
                </button>
                <Link to={`/admin/dashboard`}>
                  <button
                    type="button"
                    className="inline-block rounded-lg bg-red-500 px-12 py-1 text-lg font-medium text-white"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditArtikel;
