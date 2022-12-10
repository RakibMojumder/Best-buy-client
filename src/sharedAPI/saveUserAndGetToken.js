
const saveUserAndGetToken = async user => {
    const res = await fetch('http://localhost:5000/users', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const data = res.json();
    return data;
};

export default saveUserAndGetToken;