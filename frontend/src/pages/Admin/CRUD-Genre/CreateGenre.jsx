import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../../components/Feature/Header.Admin";
import AdminService from "../../../services/admin.service";
export default function CreateGenre() {
  const [genre, setGenre] = useState("");

  const createArticles = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminService.createGenreCerita(genre);
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
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm border-2"
                  placeholder="Article Title"
                />
              </div>
              <div className="w-full flex justify-end items-end gap-4">
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-blue-500 px-12 py-1 text-lg font-medium text-white"
                >
                  Upload
                </button>
                <Link to={`/admin/genre`}>
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
