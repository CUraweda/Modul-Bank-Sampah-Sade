export interface LoginProps {
  token: string | null;
  setToken: (token: string | null) => void;
  removeToken: () => void;

  nama: string;
  setNama: (nama: string) => void;
}
