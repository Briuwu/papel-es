import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function CreationTabs() {
  return (
    <Tabs defaultValue="login" className="mx-auto">
      <TabsList className="flex items-center">
        <TabsTrigger value="login" className="sm:w-40 md:w-52">
          Login
        </TabsTrigger>
        <TabsTrigger value="register" className="sm:w-40 md:w-52">
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
