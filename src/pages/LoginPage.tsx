import { Link } from "react-router-dom";
import Login from "@/components/Users/Login";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="relative flex-[3_1_0] bg-gradient-to-br from-slate-700 to-black">
        <Link
          to="/"
          className="absolute left-12 top-12 flex items-center gap-4 p-4"
        >
          <img src="/favicon.png" alt="facivon" />
          <div className="text-xl text-blue-100">Code-Sync</div>
        </Link>
        <div className="absolute bottom-12 right-24 border-l-2 border-blue-100 pl-4 text-lg text-blue-100">
          <div>LGTM 👍</div>
        </div>
      </div>
      <div className="flex-[2_1_0] max-lg:absolute max-lg:left-1/2 max-lg:top-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:transform">
        <Login />
      </div>
    </div>
  );
}
