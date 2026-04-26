import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "@/modules/auth/components/sign-in-form";
import SignUpForm from "@/modules/auth/components/sign-up-form";

const RegistrationPage = () => {
  return (
    <section className="w-full h-screen bg-background">
      <Tabs
        className="w-full md:max-w-7xl mx-auto backdrop-blur-md  dark:shadow-white/10 flex items-center p-4 md:p-8"
        defaultValue="login"
      >
        <TabsList className="w-full md:w-9/12 p-10 bg-background">
          <TabsTrigger
            value="login"
            className="py-4 backdrop-blur-md shadow-md dark:shadow-white/10 m-2"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="py-4 backdrop-blur-md shadow-md dark:shadow-white/10 m-2"
          >
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="w-full">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register" className="w-full ">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default RegistrationPage;
