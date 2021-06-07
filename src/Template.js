import { Disclosure, Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";
import AppContext from "./contexts/AppContext";

const Template = ({ children }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const footerRef = useRef();

  const onClickHandler = () => {
    dispatch(logout());
  };

  return (
    <AppContext.Provider value={{ footerRef }}>
      <Disclosure as="nav" className="flex items-center bg-gray-800 p-3">
        <div className="text-white">GitHub Issues Navigator</div>
        <Menu as="div" className="ml-auto relative">
          {({ open }) => (
            <React.Fragment>
              <div>
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={user.avatar_url}
                    alt="User profile"
                  />
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {user.email}
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                        onClick={onClickHandler}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </React.Fragment>
          )}
        </Menu>
      </Disclosure>
      {children}
      <footer ref={footerRef}>
        <h1 id="footer">Footer</h1>
      </footer>
    </AppContext.Provider>
  );
};

export default Template;
