import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

export default function RootLayout() {
  return (
    <main>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </main>
  );
}
