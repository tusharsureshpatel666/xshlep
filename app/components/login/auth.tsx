import Banner from "./banner";
import Navbar from "./Header";
import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <div className="min-h-screen ">
      <Navbar />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* LEFT SIDE: LOGIN FORM */}
        <div className="flex  justify-center items-center w-full lg:w-1/2 px-6">
          <LoginForm />
        </div>

        {/* RIGHT SIDE: TESTIMONIAL / BANNER */}
        <div className="hidden lg:flex w-1/2 justify-center items-center px-16 border-l border-white/20">
          <Banner />
        </div>
      </div>
    </div>
  );
}
