import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function CreationTabs() {
  return (
    <Tabs defaultValue="login" className="mx-auto">
      <TabsList className="flex items-center">
        <TabsTrigger value="login" className="md:w-52 sm:w-40">
          Login
        </TabsTrigger>
        <TabsTrigger value="register" className="md:w-52 sm:w-40">
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
