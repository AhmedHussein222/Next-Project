import { auth } from "../auth"

export async function islogged() {
   let log = await auth()
   return log
}
export async function logout() {
  await signOut({ redirectTo: "/login" });
}