import SignUp from "@/components/Users/SignUp";

export default function LoginPage() {
  return (
    <div className="flex h-screen relative">
      <div className="relative flex-[3_1_0] bg-gradient-to-br from-slate-700 to-black">
        <div className="absolute bottom-12 left-12 border-l-2 border-blue-100 pl-4 text-lg text-blue-100">
          <div>마라탕 먹고싶다</div>
          <div>꿔바로우도 ...</div>
        </div>
        <div className="flex-[2_1_0] max-lg:absolute max-lg:left-1/2 max-lg:top-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:transform">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
