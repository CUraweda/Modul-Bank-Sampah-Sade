import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../midleware/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginStore } from "../store/Store";
import Swal from "sweetalert2";
import logo from "../assets/sade.png";

const schema = Yup.object({
  email: Yup.string().required("Email required").email("Invalid email format"),
  password: Yup.string().required("Password required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setNama, setToken } = LoginStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const emailLower = values.email.toLowerCase();
        const response = await Auth.Login(emailLower, values.password);
        const nama = response.data.data.full_name;
        setToken(response.data.tokens.access.token);
        setNama(nama);
        navigate("/guru/leson-plan");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Please make sure your username and password are correct!",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="bg-[#DBEAFE]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Sekolah Alam Depok
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
