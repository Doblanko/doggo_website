const fetchData = async (url, method, header, body) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: header,
            body: JSON.stringify(body)
        })
        const dataJSON = await response.json()
        return dataJSON
    } catch (err) {
        console.log(err)
    }
    
}

export default fetchData;

