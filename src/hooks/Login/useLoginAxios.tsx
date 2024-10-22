import https from "@/lib/https";

const signInFetch = ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    return https.post("auth/signin", {
        email,
        password,
    });
};
export default signInFetch;