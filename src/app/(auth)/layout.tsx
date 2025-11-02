'use client';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Spinner } from '@/components/ui/spinner';
import Logo from '@/components/icons/logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const authBg = PlaceHolderImages.find(img => img.id === 'auth-background');

  useEffect(() => {
    if (!loading && user) {
      router.push('/boards');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4">
      {authBg && (
        <Image
          src={authBg.imageUrl}
          alt={authBg.description}
          fill
          className="object-cover"
          data-ai-hint={authBg.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo className="h-10 w-auto text-primary" />
        </div>
        {children}
      </div>
    </main>
  );
}
