import { Outlet } from "react-router-dom";
import Header from "./globalcomponents/Header";
import Navbar from "./globalcomponents/Navbar";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="border-t p-4 text-center text-sm text-muted">
        © {new Date().getFullYear()} Brendoo
      </footer>
    </div>
  );
}

export default PublicLayout;