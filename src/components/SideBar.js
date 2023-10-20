import React from "react";
import { Link } from "react-router-dom";

const items = [
  { title: "Invoice", link: "/" },
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  { title: "Profiles", link: "/profiles" },
];

function SideBar() {
  return (
    <div className="p-4  space-y-4 w-[200px] md:w-[320px]  h-full">
      {items.map((item, index) => (
        <div key={index}>
          <Link
            to={item.link}
            //  onClick={() => window.location.pathname = item.link}
          >
            <div>
              <span
                className={
                  window.location.pathname === item.link
                    ? "text-2xl bg-blue-100 text-blue-600 hover:bg-blue-100 hover:text-blue-600 flex cursor-pointer justify-start rounded-lg p-2"
                    : "text-2xl hover:bg-blue-100 hover:text-blue-600 flex cursor-pointer justify-start rounded-lg p-2"
                }
              >
                {item.title}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
