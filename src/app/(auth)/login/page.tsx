import AuthForm from '@/components/auth/auth-form';

export default function LoginPage() {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
        <p className="text-muted-foreground mt-2">Sign in to access your boards.</p>
      </div>
      <AuthForm mode="login" />
    </>
  );
}
