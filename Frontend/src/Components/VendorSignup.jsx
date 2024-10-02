//Add this in app.jsx =>
//  <Route path="/signup" element={<Signup />} />



//Add this on Login.jsx =>  
//  <Link  to="/signup" className="underline text-blue-500 cursor-pointer"> Signup   </Link>{" "}






import React from 'react'
import { Link} from "react-router-dom";
import VendorLogin from "./VendorLogin";
import { useForm } from "react-hook-form";

const VendorSignup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = async (data) => console.log(data);
    return (
        <>
        <div className="flex h-screen items-center justify-center">
          <div className=" w-[600px] ">
            <div className="modal-box">
              <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <Link
                  to="/"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </Link>
  
                <h3 className="font-bold text-lg">Vendor Signup</h3>

                  {/* VendorId */}
                <div className="mt-4 space-y-2">
                  <span>VendorId</span>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter your fullID"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("fullID", { required: true })}
                  />
                  <br />
                  {errors.fullID && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </div>

                  {/* VendorName */}
                <div className="mt-4 space-y-2">
                  <span>VendorName</span>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter your fullname"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("fullname", { required: true })}
                  />
                  <br />
                  {errors.fullname && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
                  {/* VendorPhoneNo. */}
                <div className="mt-4 space-y-2">
                  <span>Phone No.</span>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter your Number"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("number", { required: true })}
                  />
                  <br />
                  {errors.number && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
                  {/* VendorAddress */}
                <div className="mt-4 space-y-2">
                  <span>Address</span>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter your Full Address"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("address", { required: true })}
                  />
                  <br />
                  {errors.address && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </div>


                {/* Email */}
                <div className="mt-4 space-y-2">
                  <span>Email</span>
                  <br />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("email", { required: true })}
                  />
                  <br />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
                {/* Password */}
                <div className="mt-4 space-y-2">
                  <span>Password</span>
                  <br />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("password", { required: true })}
                  />
                  <br />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
                {/* Button */}
                <div className="flex justify-around mt-4">
                  <button className="bg-pink-500 text-white rounded-md ml-[10px] px-3 py-1 hover:bg-pink-700 duration-200">
                    Signup
                  </button>
                  <div className="ml-[150px]">
                    <p className="text-xl">
                      Have account ?{" "}
                      <button
                        className="underline text-blue-500 cursor-pointer"
                        onClick={() =>
                          document.getElementById("my_modal_3").showModal()
                        }
                      >
                        Login
                      </button>{" "}
                      <VendorLogin />
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>   
    )
}

export default VendorSignup