export const baseUrl = "http://127.0.0.1:8000/";


const apis ={
    MEDICINES : `${baseUrl}api/medicinal-items/`,
    ADDTOCART : `${baseUrl}api/add-to-cart/`,
    GETCART : `${baseUrl}api/get-cart-items/`,
    CHECKOUT : `${baseUrl}api/checkout/`,
    CATEGORYFILTER : `${baseUrl}api/medicinal/`,
    FETCHDOCS : `${baseUrl}api/doctors`,
    FETCHORDERS : `${baseUrl}api/user-orders/`,
    REQUESTAPPONTMENT : `${baseUrl}api/request-appointment/`,
    FETCHAPPONTMENTS : `${baseUrl}api/doctor-appointments/`,
    UPDATEAPPOINTMENT : `${baseUrl}api/update-appointment-status/`,
    SEARCH_MEDICINES : `${baseUrl}api/search-medicine/`,
    PATIENT_APPOINTMENTS : `${baseUrl}api/patient-appointments/`,
    GET_CHATROOM : `${baseUrl}api/get-chat-room/`,
    CREATE_CHATROOM : `${baseUrl}api/create-chat-room/`,
    GET_CHATS : `${baseUrl}api/get-messages/`,
    CREATE_DOC : `${baseUrl}api/doctors/create/`,
    VERIFY_DOC : `${baseUrl}api/verify/doctors/`,
    UPLOAD_BILL : `${baseUrl}api/upload-bill/`,
} 

export default apis;