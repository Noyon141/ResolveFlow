import SignOutButton from "@/features/auth/components/sign-out-button";
import Workspace from "@/features/workspace/components/workspace";

const DashboardPage = () => {
  return (
    <section className="w-full h-screen bg-background">
      <Workspace />
      <SignOutButton />
    </section>
  );
};

export default DashboardPage;
