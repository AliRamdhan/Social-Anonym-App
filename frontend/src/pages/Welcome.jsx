import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

//Image
import People1 from "../images/people1.svg";
import People2 from "../images/Peoples2.svg";
import Tools1 from "../images/tools1.png";
import Tools2 from "../images/tools2.png";

//Feature
import Header from "../components/Feature/Header";
import Footer from "../components/Feature/Footer";
import Modal1 from "../components/partials/Modal-Started";
export default function Welcome() {
  const [blogs, setBlogs] = useState([1, 2, 3, 4]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="w-full flex flex-col items-center mb-8">
        <div className="w-full h-screen flex justify-between pl-8">
          <div className="flex justify-start items-start">
            <img
              src={People1}
              className="relative -mt-20 ml-10"
              alt=""
              width="600px"
            />
          </div>
          <div className="w-3/5 flex flex-col mt-24 items-center font-sans">
            <div className="w-4/5">
              <div className="font-bold text-6xl">
                Menjadi Penulis Kehidupan yang Sukses & Bijak
              </div>
              <div className="font-medium text-xl mt-4">
                Kisah yang Menarik: Menjadi Penulis Kehidupan Sukses dengan
                Lembaran Kertas sebagai Medan Perjuangan
              </div>
              <div className="mt-6">
                <Modal1 />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-screen flex justify-center mt-8">
          <div className="w-3/5 font-sans flex flex-col items-center">
            <div className="w-full text-4xl font-bold text-center">
              Tinta Inspirasi yang Tak Pernah Kering: Meraih Kesuksesan sebagai
              Penudivs Kehidupan
            </div>
            <img src={People2} width="700px" className="mt-5" alt="" />
          </div>
        </div>
        <div className="w-5/6 h-96 flex justify-center mt-8">
          <div className="w-full flex flex-col justify-center items-center font-sans">
            <div className="font-bold text-3xl">
              Solusi Diri - Temukan Dukungan dan Pertumbuhan Bersama
            </div>
            <div className="font-medium text-md tracking-wide">
              Apakah Anda sedang mencari dukungan dan pemahaman dalam menghadapi
              tantangan hidup? Solusi Diri hadir dengan fitur yang dapat
              membantu.
            </div>
          </div>
          <div className="w-full flex flex-col justify-center gap-8">
            <div
              className="flex items-center py-4 px-2 hover:scale-105 hover:translate-x--4 duration-300"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              }}
            >
              <img src={Tools1} alt="" width="120px" />
              <div className="pl-4">
                <div className="font-semibold text-xl"> Chat "Nasib Sama"</div>
                <div>
                  Anda dapat berinteraksi dengan orang-orang yang mengalami
                  nasib serupa, berbagi pengalaman, dan saling mendukung dalam
                  dilingkungan yang aman dan empati.
                </div>
              </div>
            </div>
            <div
              className="flex justify-between items-center py-4 px-2 hover:scale-105 hover:translate-x--4 transition duration-300"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              }}
            >
              <img src={Tools2} alt="" width="120px" />
              <div className="pl-4">
                <div className="font-semibold text-xl"> Stay motivated</div>
                <div>
                  Solusi Diri memberikan pembaruan tentang kesehatan mental,
                  self-care, dan sumber daya kesehatan.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-8">
          <div className="w-full px-8">
            <div className="w-full">
              <div className="w-56 relative font-bold text-3xl mb-4 group">
                <span>Baca Artikel</span>
                <span className="absolute bottom-0 left-0 w-0 h-0 bg-black transition-all duration-1000 origin-left transform translate-x-0 group-hover:w-full group-hover:h-1"></span>
              </div>
              <div className="container p-6 mx-auto space-y-8">
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold">
                    Partem reprimique an pro
                  </h2>
                  <p className="font-serif text-sm ">
                    Qualisque erroribus usu at, duo te agam soluta mucius.
                  </p>
                </div>
              </div>
              <div className="w-full grid grid-cols-4 gap-8">
                {blogs.map((blog, index) => (
                  <div
                    className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl"
                    key={index}
                  >
                    <img
                      className="rounded-t-lg"
                      width="200px"
                      src={People2}
                      alt=""
                    />
                    <div className="p-3">
                      <Link>
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-blue-500 hover:underline">
                          Noteworthy technology acquisitions 2021
                        </h5>
                      </Link>
                      <p
                        className="mb-3 font-normal text-gray-700"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        Here are the biggest enterprise technology acquisitions
                        of 2021 so far, in reverse chronological order. Lorem
                        ipsum dolor sit amet consectetur, adipisicing elit. Sunt
                        itaque enim eum quis voluptatibus adipisci pariatur
                        exercitationem, dignissimos, unde magnam provident
                        perferendis dolor. Delectus fuga possimus nihil
                        molestias sapiente quo!
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full text-right py-4">
                <Link>
                  <span className="relative text-blue-600 font-bold text-lg z-20">
                    Lihat Semua
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
