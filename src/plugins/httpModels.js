import https from './axios'

const getItem = async(url) => {
    const response = await https.get(url);
    return response;
}

const postItem = async(url, data) => {
    const response = await https.post(url, data);
    return response;
}

const updateItem = async(url, data, id) => {
    const response = await https.put(`${url}/${id}`, data);
    return response;
}

const deleteItem = async(url, id) => {
    const response = await https.delete(`${url}/${id}`);
    return response;
}

export { getItem, postItem, updateItem, deleteItem}