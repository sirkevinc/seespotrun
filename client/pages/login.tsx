import { getProviders, signIn } from "next-auth/react"

export default function Login({ providers }) {
    return (
        <div>
            <h1>This is a login page</h1>

            {Object.values(providers).map((provider) => (
                <div>
                    <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>Login with {provider.name}</button>
                </div>
            ))}

        </div>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }

}