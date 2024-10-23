import Login from "@/components/Users/Login";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
        <div className="relative flex-[3_1_0] bg-gradient-to-br from-slate-700 to-black">
          <Login />
          <div className="absolute bottom-12 right-24 border-l-2 border-blue-100 pl-4 text-lg text-blue-100">
            <div>화이팅</div>
            <div>윤민성 !</div>
          </div>
        </div>
    </div>
  );
}
