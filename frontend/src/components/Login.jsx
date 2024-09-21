import React from "react";
function Login (){
    return(
    <div class="font-[Times-New-Roman] italic bg-white">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <form class="lg:col-span-3 md:col-span-2 max-w-lg w-full p-6 mx-auto">
          <div class="mb-12">
            <h3 class="text-gray-800 text-4xl font-extrabold">Sign In</h3>
            <p class="text-gray-800 text-sm mt-6 leading-relaxed">Welcome back! Please log in to access your account and explore a world of possibilities. Your journey begins here.</p>
          </div>

          <div class="relative flex items-center">
            <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">Email</label>
            <input type="email" placeholder="Enter email"
              class="px-4 py-3.5 bg-white w-full text-sm italic border-2 border-gray-200 focus:border-blue-600 rounded-md outline-none" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
              </g>
            </svg>
          </div>

          <div class="relative flex items-center mt-8">
            <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">Password</label>
            <input type="Password" placeholder="Enter password"
              class="px-4 py-3.5 bg-white w-full text-sm italic border-2 border-gray-200 focus:border-blue-600 rounded-md outline-none" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
              <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
            </svg>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md" />
              <label for="remember-me" class="ml-3 block text-sm text-gray-800">
                Remember me
              </label>
            </div>
            <div>
              <a href="jajvascript:void(0);" class="text-blue-600 font-semibold text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          <div class="mt-12">
            <button type="button" class="w-full shadow-xl py-2.5 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Sign in
            </button>
          </div>

          <p class="text-sm text-gray-800 mt-8 text-center">Don't have an account! <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
        </form>

        <div class="flex flex-col justify-center space-y-16 md:h-screen max-md:mt-16 min-h-full bg-gradient-to-r from-blue-500 to-blue-700 lg:px-8 px-4 py-4">
          <div>
            <h4 class="text-white text-lg font-semibold">Secure Authentication</h4>
            <p class="text-[13px] text-white mt-2">Log in with your registered email and password securely.</p>
          </div>
          <div>
            <h4 class="text-white text-lg font-semibold">Remember Me</h4>
            <p class="text-[13px] text-white mt-2">Enable the "Remember Me" option for a seamless login experience in future sessions.</p>
          </div>
          <div>
            <h4 class="text-white text-lg font-semibold">Forgot Password?</h4>
            <p class="text-[13px] text-white mt-2">Easily recover your account by clicking on the "Forgot Password?" link.</p>
          </div>
        </div>
      </div>
    </div>
    )
}
export default Login