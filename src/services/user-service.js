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
export async function verifyCode(data = {}, mail)
{
    const url = process.env.VUE_APP_API_URL + '/registration/' + mail + '/verify';
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
export async function setPassword(data = {}, mail)
{
    console.log(data);
    const url = process.env.VUE_APP_API_URL + '/registration/' + mail + '/password';
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
export async function setDetails(data = {}, mail)
{
    const url = process.env.VUE_APP_API_URL + '/registration/' + mail + '/details';
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