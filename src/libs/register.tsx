export default async function register(name: string, telephone_number: string, email: string, password: string, balance: number) {
    const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            telephone_number,
            email,
            balance,
            password
        })
    });

    if (!response.ok) {
        throw new Error("Failed to register user");
    }

    return await response.json();
}