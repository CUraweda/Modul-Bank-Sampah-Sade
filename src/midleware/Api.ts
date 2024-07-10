import axios, { AxiosPromise } from "axios";
const instance = axios.create({ baseURL: import.meta.env.VITE_REACT_API_URL });
import {
  LoginResponse,
  JenisSampah,
  GetSiswaByNis,
  GetInclassStudent,
  GetClass,
  CreateRekapSampah,
  GetAllClass,
  CreateJenisSampah,
} from "./Utils";

const Auth = {
  Login: (
    email: string | null,
    password: string | null
  ): AxiosPromise<LoginResponse> =>
    instance({
      method: "POST",
      url: "/api/auth/login",
      data: {
        email,
        password,
      },
    }),
};

const BankSampah = {
  GetJenisSampah: (
    token: string | null,
    page: string,
    limit: string
  ): AxiosPromise<JenisSampah> =>
    instance({
      method: "GET",
      url: `/api/waste-type?search_query=&page=${page}&limit=${limit}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  createRekapSampah: (
    token: string | null,
    data: CreateRekapSampah
  ): AxiosPromise<any> =>
    instance({
      method: "POST",
      url: `/api/waste-collection/create`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    }),

  createJenisSampah: (
    token: string | null,
    data: CreateJenisSampah
  ): AxiosPromise<any> =>
    instance({
      method: "POST",
      url: `/api/waste-type/create`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    }),
  updateJenisSampah: (
    token: string | null,
    id: string | null,
    data: CreateJenisSampah
  ): AxiosPromise<any> =>
    instance({
      method: "PUT",
      url: `/api/waste-type/update/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    }),
  getByIdJenisSampah: (
    token: string | null,
    id: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "GET",
      url: `/api/waste-type/show/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteJenisSampah: (
    token: string | null,
    id: string | null
  ): AxiosPromise<any> =>
    instance({
      method: "DELETE",
      url: `/api/waste-type/delete/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

const ApiSiswa = {
  GetSiswaByNis: (
    token: string | null,
    nis: string | number | null
  ): AxiosPromise<GetSiswaByNis> =>
    instance({
      method: "GET",
      url: `/api/student/show-nis/${nis}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetInClassSiswaByid: (
    token: string | null,
    id: string | number | null
  ): AxiosPromise<GetInclassStudent> =>
    instance({
      method: "GET",
      url: `/api/student-class/show/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetClassSiswaByid: (
    token: string | null,
    id: string | number | null
  ): AxiosPromise<GetClass> =>
    instance({
      method: "GET",
      url: `api/classes/show/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  GetSiswaByClass: (
    token: string | null,
    kelas: string | null,
    akademik: string
  ): AxiosPromise<GetInclassStudent> =>
    instance({
      method: "GET",
      url: `/api/student-class/show-by-class/${kelas}?academic=${akademik}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

const Kelas = {
  GetAllKelas: (token: string | null): AxiosPromise<GetAllClass> =>
    instance({
      method: "GET",
      url: `api/classes?search_query=&page=0&limit=20`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export { Auth, BankSampah, ApiSiswa, Kelas };
