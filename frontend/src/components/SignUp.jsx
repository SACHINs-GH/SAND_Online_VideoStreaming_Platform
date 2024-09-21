import React from "react";
function SignUp (){
    return(
      <div class="flex flex-col justify-center items-center font-[Times-New-Roman] italic bg-gradient-to-r from-blue-800 to-blue-500 lg:h-screen p-6">
      <div class="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
        <div class="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full h-full">
          <div class="max-w-md space-y-12 mx-auto">
            <div>
              <h4 class="text-white text-lg font-semibold">Create Your Account</h4>
              <p class="text-[13px] text-white mt-2">Welcome to our registration page! Get started by creating your account.</p>
            </div>
            <div>
              <h4 class="text-white text-lg font-semibold">Simple & Secure Registration</h4>
              <p class="text-[13px] text-white mt-2">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
            </div>
            <div>
              <h4 class="text-white text-lg font-semibold">Terms and Conditions Agreement</h4>
              <p class="text-[13px] text-white mt-2">Require users to accept the terms and conditions of our service to continue with the registration.</p>
            </div>
          </div>
        </div>

        <form class="sm:p-8 p-4 w-full">
          <div class="mb-12">
            <h3 class="text-blue-500 text-3xl font-extrabold max-md:text-center">Register Yourself</h3>
          </div>

          <div class="grid lg:grid-cols-2 gap-6">
            <div>
              <label class="text-gray-800 text-sm mb-2 block">First Name</label>
              <input name="name" type="text" class="bg-gray-100 w-full text-gray-800 text-sm italic px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Name" />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Last Name</label>
              <input name="lname" type="text" class="bg-gray-100 w-full text-gray-800 text-sm italic px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Last Name" />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Gender</label>
              <select class="bg-gray-100 w-full text-gray-800 text-sm italic px-4 py-3 rounded-md outline-blue-500">
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
              </select>
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">D.O.B.</label>
              <input name="d.o.b." type="date" class="bg-gray-100 w-full text-gray-800 text-sm italic px-4 py-3 rounded-md outline-blue-500"/>
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input name="email" type="text" class="bg-gray-100 w-full text-gray-800 text-sm italic px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Email" />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Mobile No.</label>
              <input name="number" type="number" class="bg-gray-100 w-full text-gray-800 text-sm italic px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Mobile Number" />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <input name="password" type="password" class="bg-gray-100 w-full text-gray-800 text-sm italic px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Password" />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input name="cpassword" type="password" class="bg-gray-100 w-full text-gray-800 text-sm italic px-4 py-3 rounded-md outline-blue-500" placeholder="Confirm Password" />
            </div>
          </div>

          <div class="flex items-center mt-6">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 rounded" />
            <label for="remember-me" class="ml-3 block text-sm">
              I accept the <a href="javascript:void(0);" class="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
            </label>
          </div>

          <div class="mt-6">
            <button type="button" class="py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}
export default SignUp