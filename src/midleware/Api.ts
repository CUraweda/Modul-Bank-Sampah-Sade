import axios, { AxiosPromise } from "axios";
const instance = axios.create({ baseURL: import.meta.env.VITE_REACT_API_URL });

const Auth = {
  Login: (email: string | null, password: string | null): AxiosPromise<any> =>
    instance({
      method: "POST",
      url: "/auth/login",
      data: {
        email,
        password,
      },
    }),
};

const Guru = {
  GetDataLesonPlan: (token: string | null): AxiosPromise<any> =>
    instance({
      method: `GET`,
      url: `/lesson-plan/show-rekap-teacher`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  GetFullDataOdfyc: (
    token: string | null,
    page: string | number
  ): AxiosPromise<any> =>
    instance({
      method: `GET`,
      url: `/for-country-detail?page=${page}&limit=10`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  GetDataOdfyc: (token: string | null): AxiosPromise<any> =>
    instance({
      method: `GET`,
      url: `/for-country-detail/show-total`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export { Auth, Guru };
