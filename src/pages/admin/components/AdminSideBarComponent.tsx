import { Link } from "react-router-dom";

const AdminSideBar: React.FC = () => {
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside className="z-40 w-full h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200">
          <ul className="space-y-2 ">
            <li>
              <Link
                to={"/dashboard/orders"}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="ml-3 font-medium">Orders</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100"
              >
                <Link
                  className="flex-1 ml-3 text-left whitespace-nowrap font-medium"
                  to={"/dashboard/products"}
                >
                  Products
                </Link>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100"
              >
                <Link
                  className="flex-1 ml-3 text-left whitespace-nowrap font-medium"
                  to={"/"}
                >
                  HomePage
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSideBar;
