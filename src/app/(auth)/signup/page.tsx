import AuthForm from '@/components/auth/auth-form';

export default function SignupPage() {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
        <p className="text-muted-foreground mt-2">Start organizing your work with KanbanFlow.</p>
      </div>
      <AuthForm mode="signup" />
    </>
  );
}
