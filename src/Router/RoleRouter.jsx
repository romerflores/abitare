import { Navigate } from "react-router"

export default function RoleRoute({ children, role }) {
  const userData = JSON.parse(localStorage.getItem("user")) // { role: "user" | "admin" }
  if (!userData || userData.role !== role) return <Navigate to="/login" replace />
  return children
}
