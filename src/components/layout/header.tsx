import Logo from '@/components/icons/logo';
import { UserNav } from '@/components/auth/user-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';

type HeaderProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Header({ title, children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className="hidden md:block">
            <Logo />
        </div>
        {title && (
          <>
            <div className="h-8 w-px bg-border" />
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
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
