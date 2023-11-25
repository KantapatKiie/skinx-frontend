"use client";

import { useEffect, useState } from "react";
import { LoginModel } from "@/types";
import { Login } from "@/app/api/login";
import { useRouter } from "next/navigation";
import checkTokenExpire from "@/app/utils/checkToken";

const PageContentLogin = () => {
  const router = useRouter();
  const [auth, setAuth] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [objLogin, setObjLogin] = useState<LoginModel>({
    username: "",
    password: "",
  });

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token) {
      if (checkTokenExpire(token)) router.push("/");
    }

    return setObjLogin({
      username: "",
      password: "",
    });
  }, []);

  const userLogin = (e: any) => {
    e.preventDefault();
    if (objLogin.username !== "" && objLogin.password !== "") {
      Login(objLogin).then(async (val) => {
        let data = await val.json();
        await sessionStorage.setItem("token", data.token);
        router.push("/");
      });
    }
  };

  return (
    <>
      {auth === "" ? (
        <div className="flex mt-12">
          <div className="grow h-14 bg-gray-50 dark:bg-neutral-900">
            <div className="flex flex-col items-center justify-center">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={userLogin}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Username
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="username"
                        value={objLogin.username}
                        onChange={(e) => {
                          let obj = Object.assign({}, objLogin);
                          obj.username = e.target.value;
                          setObjLogin(obj);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </label>
                      <input
                        type={!passwordShown ? "password" : "text"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={objLogin.password}
                        onChange={(e) => {
                          let obj = Object.assign({}, objLogin);
                          obj.password = e.target.value;
                          setObjLogin(obj);
                        }}
                      />
                      <div className="flex items-center m-2">
                        <input
                          id="checked-checkbox"
                          type="checkbox"
                          checked={passwordShown}
                          onChange={() => setPasswordShown(!passwordShown)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Show password
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PageContentLogin;
