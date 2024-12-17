import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>

            {/* Login with Google Button */}
            <div className="mt-6 flex justify-center">
                <Link
                    href={route('google-auth')} 
                    className="flex items-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#4285F4"
                            d="M24 9.5c3.35 0 6.3 1.17 8.66 3.1l6.44-6.44C34.98 3.28 30.25 1.5 24 1.5 14.78 1.5 7.16 7.82 4.6 16.04l7.88 6.1C13.55 14.92 18.32 9.5 24 9.5z"
                        />
                        <path
                            fill="#34A853"
                            d="M46.5 24c0-1.54-.14-3.02-.4-4.46H24v8.96h12.7c-.6 3.02-2.34 5.58-4.94 7.32l7.88 6.1C44.44 38.2 46.5 31.6 46.5 24z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M11.58 28.96c-.6-1.8-.94-3.72-.94-5.72s.34-3.92.94-5.72l-7.88-6.1C2.82 14.48 1.5 19.08 1.5 24s1.32 9.52 3.7 13.58l7.88-6.1z"
                        />
                        <path
                            fill="#EA4335"
                            d="M24 46.5c6.25 0 11.48-2.06 15.32-5.58l-7.88-6.1c-2.1 1.4-4.76 2.2-7.44 2.2-5.68 0-10.45-4.42-11.52-10.14l-7.88 6.1C7.16 40.18 14.78 46.5 24 46.5z"
                        />
                    </svg>
                    Login with Google
                </Link>
            </div>
        </GuestLayout>
    );
}
