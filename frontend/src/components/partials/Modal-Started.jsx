import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pop2 from "../../images/popup/pop2.png";
import Pop1 from "../../images/popup/pop1.png";
import Pop3 from "../../images/popup/pop3.png";

const modals = [
  {
    title: "Selamat datang..",
    content:
      "Educsos adalah platform curhat secara anonim yang dapat digunakan oleh siapa saja",
    avatar: Pop1,
  },
  {
    title: "Kamu tau ga sii?",
    content:
      "Banyak faktor negatif, apabila kita selalu menyimpan masalah kita sendiri",
    avatar: Pop2,
  },
  {
    title: "...Yuk mulai curhatt",
    content:
      "Kamu bisa meluapkan isi hati kamu secara anonim, dan dapat berbicara dengan banyak orang yang memiliki suasana yang sama dalam platform",
    avatar: Pop3,
  },
  // Add more modals as needed
];

export default function Modal1() {
  const [modalIndex, setModalIndex] = useState(-1);

  const openModal = (index) => {
    setModalIndex(index);
  };

  const closeModal = () => {
    setModalIndex(-1);
  };

  const handleEscapeKeyPress = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (modalIndex !== -1) {
      document.addEventListener("keydown", handleEscapeKeyPress);
    } else {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [modalIndex]);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-background")) {
      closeModal();
    }
  };

  return (
    <div className="z-20">
      <button
        onClick={() => openModal(0)} // Open the first modal from the array
        type="button"
        className="w-3/5 py-2 text-2xl font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Solusi sekarang
      </button>
      {modalIndex !== -1 && (
        <div
          className="modal-background"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex:"888px"
          }}
          onClick={handleOutsideClick}
        >
          <div
            className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
            id="modal-id"
          >
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full max-w-2xl h-[420px] relative mx-auto my-auto rounded-xl shadow-lg bg-white">
              <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full h-5/6 text-center flex flex-col justify-between items-center">
                  <h2 className="text-3xl font-bold py-4">
                    {modals[modalIndex].title}
                  </h2>
                  <div className="w-full flex justify-center items-center">
                    <img
                      src={modals[modalIndex].avatar}
                      alt=""
                      className="w-[280px] h-[180px]"
                    />
                  </div>
                  <p className="text-xl text-gray-500 px-8">
                    {modals[modalIndex].content}
                  </p>
                </div>
                <div className="text-center space-x-4 md:block">
                  {modalIndex < modals.length - 1 ? ( // Show "Next" button for all modals except the last one
                    <>
                      <button
                        onClick={closeModal}
                        className="mb-2 md:mb-0 bg-white px-8 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                      >
                        Skip For Now...
                      </button>
                      <button
                        onClick={() => openModal(modalIndex + 1)}
                        className="w-32 mb-2 md:mb-0 bg-blue-600 border border-blue-600 px-8 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
                      >
                        Next
                      </button>
                    </>
                  ) : (
                    <Link to="/signin">
                      <button className="w-56 mb-2 md:mb-0 bg-blue-600 border border-blue-600 px-8 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600">
                        LOGIN
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
