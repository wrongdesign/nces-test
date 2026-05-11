import {AuthWrapper} from "@/features/auth";
import LoginForm from "@/features/auth/ui/LoginForm";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="authPage">
          <AuthWrapper>
              <LoginForm />
          </AuthWrapper>
      </main>
    </div>
  );
}
