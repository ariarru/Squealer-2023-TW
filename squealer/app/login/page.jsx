import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthButtonServer from "../auth/auth-components/auth-button-server";

export default async function Login() {

    const supabase = createServerComponentClient({ cookies });

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        redirect("/");
    }

    return <AuthButtonServer />;
}