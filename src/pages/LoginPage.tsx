import Login from "@/components/Users/Login";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
<<<<<<< HEAD
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
          <div>LGMT 👍</div>
        </div>
      </div>
      <div className="flex-[2_1_0] max-lg:absolute max-lg:left-1/2 max-lg:top-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:transform">
        <Login />
=======
    <div className="flex h-screen relative">
      <div className="relative flex-[3_1_0] bg-gradient-to-br from-slate-700 to-black">
        <div className="absolute bottom-12 left-12 border-l-2 border-blue-100 pl-4 text-lg text-blue-100">
          <div>화이팅</div>
          <div>윤민성 !</div>
        </div>
        <div className="flex-[2_1_0] max-lg:absolute max-lg:left-1/2 max-lg:top-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:transform">
          <Login />
        </div>
>>>>>>> 625bb1aeae1d96d8f9f7975061911c9892927193
      </div>
    </div>
  );
}
