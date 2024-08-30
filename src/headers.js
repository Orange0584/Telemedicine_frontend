import Cookies from'js-cookie';




export const getHeaders = () => {
    const token = Cookies.get('userToken') || "";
    let headers = {
        'Authorization': `Bearer ${token}`,
    }
    return headers;
}
