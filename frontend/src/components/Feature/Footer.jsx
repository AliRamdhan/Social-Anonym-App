import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-4 border-t-2">
      <div className="w-full flex justify-evenly items-center">
        <div className="w-full pl-16">
          <span className="self-center text-4xl font-bold whitespace-nowrap ">
            EDUCSOS
          </span>
        </div>
        <ul className="w-full flex justify-center items-center gap-8 text-base font-medium">
          <li>
            <Link to="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
          <li>
            <Link to="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="#" className="mr-4 hover:underline md:mr-6 ">
              Licensing
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-4 border border-black" />
      <span className="block text-base font-bold tracking-wider text-center">
        © 2023{" "}
        <Link href="https://flowbite.com/" className="hover:underline">
          EDUCSOS™
        </Link>
        . All Rights Reserved.
      </span>
    </div>
  );
}
