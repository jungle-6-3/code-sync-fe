import Login from "@/components/Users/Login";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
        <div className="relative flex-[3_1_0] bg-gradient-to-br from-slate-700 to-black">
          <Login />
          <div className="absolute bottom-12 right-24 border-l-2 border-blue-100 pl-4 text-lg text-blue-100">
            <div>마라탕 먹고싶다</div>
            <div>꿔바로우도 ...</div>
          </div>
        </div>
    </div>
  );
}
