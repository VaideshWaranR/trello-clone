import Logo from '@/components/icons/logo';
import { UserNav } from '@/components/auth/user-nav';

type HeaderProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Header({ title, children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-4">
        <Logo />
        {title && (
          <>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          </>
        )}
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        {children}
        <UserNav />
      </div>
    </header>
  );
}
