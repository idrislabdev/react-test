import type { IAuthResponse, IUser } from "@/features/auth/types"; // Pastikan path type benar
import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function login(
  email: string,
  password: string,
): Promise<IAuthResponse> {
  try {
    const { data } = await axiosInstance.get<IUser[]>("users", {
      params: {
        email: email,
        password: password,
      },
    });

    if (data.length > 0) {
      return {
        success: true,
        message: "Login Berhasil",
        user: data[0],
      };
    } else {
      return {
        success: false,
        message: "Email atau password salah!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server",
    };
  }
}

export async function register(
  userData: Omit<IUser, "id">,
): Promise<IAuthResponse> {
  try {
    const checkUser = await axiosInstance.get<IUser[]>("users", {
      params: { email: userData.email },
    });

    if (checkUser.data.length > 0) {
      return {
        success: false,
        message: "Email sudah digunakan!",
      };
    }

    const { data } = await axiosInstance.post<IUser>("users", {
      ...userData,
      role: "user",
    });

    return {
      success: true,
      message: "Registrasi berhasil, silakan login",
      user: data,
    };
  } catch (error) {
    console.error("Register Error:", error);
    return {
      success: false,
      message: "Gagal mendaftarkan akun",
    };
  }
}
