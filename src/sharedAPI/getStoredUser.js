
const getStoredUser = async email => {
    const res = await fetch(`http://localhost:5000/user?email=${email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
        },
    })
    const data = await res.json();

    return data.data;
}

export default getStoredUser