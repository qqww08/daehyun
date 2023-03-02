import { atom } from "recoil";

type Role = "admin" | "manager" | "viewer" | "";
export const roleSelectState = atom<Role>({ key: "roleSelectState", default: "admin" });
