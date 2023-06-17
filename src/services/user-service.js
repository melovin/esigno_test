export async function validateEmail(data = {})
{
    const url = process.env.VUE_APP_API_URL + '/registration';
    const res = await fetch(url, {
    method: "POST",
    headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data) 
    }); 
    return await res.text();
}