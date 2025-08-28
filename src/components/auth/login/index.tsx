import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center px-4 md:px-0">
      <div className="w-full max-w-xs rounded-lg bg-white p-6 shadow md:max-w-md md:rounded-xl md:p-8">
        <LoginForm />
      </div>
    </div>
  );
}
