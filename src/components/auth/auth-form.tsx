'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { login, signup } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signup(values.email, values.password);
        toast({
          title: 'Account Created!',
          description: "You've been successfully signed up.",
        });
      } else {
        await login(values.email, values.password);
        toast({
          title: 'Signed In!',
          description: 'Welcome back.',
        });
      }
      // Redirect is handled by the layout
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="name@example.com" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Spinner size="sm" />
              ) : mode === 'login' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center text-sm">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/login">Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
