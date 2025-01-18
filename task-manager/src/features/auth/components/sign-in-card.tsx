"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../schema";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { DotSeparator } from "@/components/dot-separator";

import { signInWithGithub, signInWithGoogle } from "@/lib/oauth";
import { useLogin } from "../api/use-login";

type FormValues = z.infer<typeof loginSchema>;

export const SignInCard = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useLogin();

    const onSubmit = (values: FormValues) => {
        console.log("🚀 ~ onSubmit ~ values:", values);
        mutate(values);
    };

    return (
        <Card className="h-full w-full border-none shadow-none md:w-[487px]">
            <CardHeader className="p-7 text-center">
                <CardTitle className="text-2xl">Welcome back!</CardTitle>
            </CardHeader>
            <div className="mb-2 px-7">
                <DotSeparator />
            </div>

            <CardContent className="p-7">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter email address"
                                            {...field}
                                        />
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
                                        <Input
                                            type="password"
                                            placeholder="Enter password"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full"
                        >
                            Log In
                        </Button>
                    </form>
                </Form>
            </CardContent>

            <div className="px-7">
                <DotSeparator />
            </div>

            <CardContent className="flex flex-col gap-y-4 p-7">
                <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={() => signInWithGoogle()}
                >
                    <FcGoogle className="mr-2 !size-5" />
                    Continue with Google
                </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={() => signInWithGithub()}
                >
                    <FaGithub className="mr-2 !size-5" /> Continue with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DotSeparator />
            </div>

            <CardFooter className="p-7 text-center">
                <p>
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-up" className="text-blue-700">
                        Sign Up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
};
