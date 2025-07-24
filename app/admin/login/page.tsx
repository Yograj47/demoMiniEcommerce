"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"

const schema = z.object({
    email: z.string().email(),
    password: z.string()
})

type FormField = z.infer<typeof schema>

export default function Login() {
    const { register, handleSubmit } = useForm<FormField>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormField> = (data) => {
        const isAdmin = data.email === "admin@demo.com" && data.password === "admin123";

        if (!isAdmin) {
            return;
        }

        document.cookie = "admin-auth=true; path=/;";
        window.location.href = "/auth/admin/dashboard";
    };


    return (
        <div className="flex justify-center items-center h-[80vh] w-full">
            <Card className="w-full max-w-sm shadow-xl shadow-blue-200">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email")}
                                    type="text"
                                    placeholder="example@gmail.com"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    {...register("password")} type="password" placeholder="*******" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
