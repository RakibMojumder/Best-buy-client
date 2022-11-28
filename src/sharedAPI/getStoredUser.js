
const getStoredUser = async email => {
    const res = await fetch(`https://best-buy-server.vercel.app/user?email=${email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
        },
    })
    const data = await res.json();
    return data.data;
}

export default getStoredUser