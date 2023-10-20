import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/Feature/Header.Admin";
import AdminService from "../../services/admin.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Genre = () => {
  const [user, setUser] = useState("");
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    AdminService.getAdminBoard().then((response) => {
      setUser(response.data.User);
    });
    AdminService.getAllGenreCerita().then((response) => {
      setGenres(response.data.Genre);
    });
  }, []);

  const handleDeleteArticle = async (genreId) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this genre?"
    );
    if (confirmDeletion) {
      try {
        await AdminService.deleteGenreCerita(genreId);
        alert("genre deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting genre:", error);
        alert("An error occurred while deleting the genre.");
      }
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div className="w-full min-h-screen flex justify-center px-8">
        <div className="w-full py-2 px-4">
          <div className="w-full h-24 flex flex-col justify-center">
            <div className="font-bold text-3xl text-gray-800">
              {" "}
              Hello,
              <span className="pl-1 text-4xl">{user.User_username}</span>
            </div>
            <div className="font-medium text-lg text-gray-600">
              Luapkan isi hati kamu di solusi
            </div>
          </div>
          <div className="w-full text-right">
            <Link to={`/admin/genre/create`}>
              <button
                type="button"
                className="text-white bg-blue-700 hover-bg-blue-800 font-medium rounded-lg text-lg px-3.5 py-2 mb-2"
              >
                Create Genre <span className="text-xl font-bold">+</span>
              </button>
            </Link>
          </div>
          <div className="w-full flex items-center border-b-2 pt-2 rounded-lg overflow-hidden bg-white shadow-md">
            <div className="w-full relative overflow-x-auto shadow-md sm-rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                {Array.isArray(genres) && genres.length > 0 ? (
                  <>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr className="text-center">
                        <th scope="col" className="px-6 py-3 text-xl">
                          Genre Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Add tbody element here */}
                      {genres.map((genre, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b text-center text-lg font-medium"
                        >
                          <td className="px-6 py-4 w-1/3">
                            <div>{genre.Genre_Cerita}</div>
                          </td>
                          <td className="px-4 py-4 w-1/6">
                            <div className="w-full flex justify-between items-center text-xl">
                              <Link
                                to={`/admin/genre/${genre.id}`}
                                className="font-medium text-blue-600"
                              >
                                Details
                              </Link>
                              <Link
                                to={`/admin/genre/edit/${genre.id}`}
                                className="font-medium text-blue-600"
                              >
                                Edit
                              </Link>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleDeleteArticle(genre.id);
                                }}
                              >
                                <button type="submit">
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                ) : (
                  <tbody>
                    {/* Add tbody element here */}
                    <tr>
                      <td colSpan="4" className="text-center">
                        Not found data
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Genre;
