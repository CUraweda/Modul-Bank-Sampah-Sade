import create, { SetState } from "zustand";
import { LoginProps } from "./Utils";

const LoginStore = create<LoginProps>((set: SetState<LoginProps>) => ({
  token: localStorage.getItem("token"),
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },
  removeToken: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },

  nama: "",
  setNama: (nama: string) => set({ nama }),
}));

export { LoginStore };
