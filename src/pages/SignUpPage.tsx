import SignUp from "@/components/Users/SignUp";

export default function SignUpPage() {
  return (
    <div className="relative flex h-screen">
      <div className="relative flex-[3_1_0] bg-gradient-to-br from-slate-700 to-black"></div>
      <div className="flex-[2_1_0] max-lg:absolute max-lg:left-1/2 max-lg:top-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:transform">
        <SignUp />
      </div>
    </div>
  );
}
