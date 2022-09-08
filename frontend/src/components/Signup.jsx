import {LockClosedIcon} from "@heroicons/react/20/solid";

export default function Signup({
  headerText,
  redirectURLPrefix,
  isSignup = true,
}) {
  return (
    <>
      {/* <div className="h-screen grid grid-rows-1 grid-cols-2 min-h-full"> */}
      <div className="h-screen flex flex-row">
        <div className="bg-[#2C73EB] h-screen w-1/2 flex flex-col">
          <div className="m-auto text-white">
            <p className="text-7xl">FineTech+</p>
            <p className="text-3xl">Conecting the dots..</p>
          </div>
        </div>
        {/* <div className="w-full max-w-md space-y-8 col-span-1 col-start-2 flex flex-col justify-center"> */}
        <div className="m-auto flex flex-col ">
          <div className="flex flex-col">
            <div>
              <img
                className="mx-auto h-48 w-auto my-[-4rem]"
                // TODO: replace with company logo
                src="../../public/assets/icons/company-logo.svg"
                alt="Your Company"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                {headerText}
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                {isSignup ? "Already have an account" : "Don't have an account"}{" "}
                <a
                  href={redirectURLPrefix + (isSignup ? "-login" : "-signup")}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {isSignup ? "Login" : "Signup"}
                </a>
              </p>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                {isSignup && (
                  <div>
                    <label htmlFor="address" className="sr-only">
                      Add Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      type="textbox"
                      autoComplete="text"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Home Address"
                    />
                  </div>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  {isSignup ? "Signup" : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
