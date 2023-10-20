import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../../components/Feature/Header.Admin";
import AdminService from "../../../services/admin.service";
export default function CreateArtikel() {
  const [user, setUser] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({
    Artikel_Title: "",
    Artikel_Content: "",
    Artikel_Picture: null,
  });

  useEffect(() => {
    AdminService.getAdminBoard().then((response) => {
      console.log(response.data.User);
      setUser(response.data.User);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "Artikel_Picture" ? files[0] : value,
    });
    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setPreviewImage("");
    }
  };

  const createArticles = async (e) => {
    e.preventDefault();
    try {
      const { Artikel_Title, Artikel_Content, Artikel_Picture } = formData;
      const response = await AdminService.createArticles(
        Artikel_Title,
        Artikel_Content,
        user.id,
        Artikel_Picture
      );
      if (response) {
        alert("create succes");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <>
      <HeaderAdmin />

      <div className="w-full h-screen pt-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Buatlah article yang bagus dan hebat
          </h1>

          <p className="mt-4 text-gray-500">
            Dengan article yang bagus dan hebat dapat memberikan knowledge
            kepada setiap pembaca
          </p>
        </div>
        <form onSubmit={createArticles}>
          <div className="w-full flex justify-center">
            <div className="w-full mb-0 mt-4 mx-8 flex flex-col items-center gap-4">
              <div className="w-full ">
                <div>Title</div>
                <input
                  type="text"
                  name="Artikel_Title"
                  value={formData.Artikel_Title}
                  onChange={(handleChange)}
                  className="w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm border-2"
                  placeholder="Article Title"
                />
              </div>
              <div className="w-full">
                <div>Article Content</div>
                <input
                  type="text"
                  name="Artikel_Content"
                  value={formData.Artikel_Content}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm border-2"
                  placeholder="Article Content"
                />
              </div>
              <div className="w-full flex">
                <div className="w-1/3 space-y-2">
                  <div className="text-sm font-bold text-gray-500">
                    Preview Image Article
                  </div>
                  <div className="mt-4">
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{ maxWidth: "300px" }}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Attach Document
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-40 group text-center">
                      <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                        <div className="flex justify-center w-2/5">
                          <img
                            className="has-mask h-24 object-center"
                            src=""
                            alt="p"
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
                                name="Artikel_Picture"
                                onChange={handleChange}
                                className="w-56"
                              />
                            </div>
                            from your computer
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                <span>File type: doc,pdf,types of images</span>
              </p>
              <div className="w-full flex justify-end items-end gap-4">
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-blue-500 px-12 py-1 text-lg font-medium text-white"
                >
                  Upload
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
}
