import https from './axios'

const login = async(url, data) => {
    const response = await https.post(url, data)
    localStorage.setItem('token', response.data.accessToken)
    return response
}

const register = async(url) => {
    const response = await https.post(url, data)
    return response
}

export { login, register }