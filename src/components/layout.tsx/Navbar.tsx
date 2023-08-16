import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { RootState } from "../../store";
import { Button } from "../commons";

export const Navbar = () => {
  const navigation = useSelector((state: RootState) => state.machine.types);
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
                <div className="flex  flex-1 sm:flex-none justify-center flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/mark.svg"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        classNames("rounded-md px-3 py-2 text-sm font-medium", {
                          "bg-gray-900 text-white": isActive,
                          "text-gray-300 hover:bg-gray-700 hover:text-white":
                            !isActive,
                        })
                      }
                    >
                      All
                    </NavLink>
                    {navigation.map(({ objectType, id }) => (
                      <NavLink
                        key={id}
                        to={`/type/${id}`}
                        className={({ isActive }) =>
                          classNames(
                            "rounded-md px-3 py-2 text-sm font-medium",
                            {
                              "bg-gray-900 text-white": isActive,
                              "text-gray-300 hover:bg-gray-700 hover:text-white":
                                !isActive,
                            }
                          )
                        }
                      >
                        {objectType}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div className="sm:ml-auto flex justify-center items-center">
                  <NavLink to="/type">
                    <Button kind="normal">Manage type</Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    {
                      "bg-gray-900 text-white": isActive,
                      "text-gray-300 hover:bg-gray-700 hover:text-white":
                        !isActive,
                    }
                  )
                }
              >
                <Disclosure.Button as={"div"}>All</Disclosure.Button>
              </NavLink>
              {navigation.map(({ id, objectType }) => (
                <NavLink
                  key={id}
                  to={`/type/${id}`}
                  className={({ isActive }) =>
                    classNames(
                      "block rounded-md px-3 py-2 text-base font-medium",
                      {
                        "bg-gray-900 text-white": isActive,
                        "text-gray-300 hover:bg-gray-700 hover:text-white":
                          !isActive,
                      }
                    )
                  }
                >
                  <Disclosure.Button as={"div"}>{objectType}</Disclosure.Button>
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
