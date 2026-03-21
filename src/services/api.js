import axios from "axios";
import { toast, Bounce } from "react-toastify";

const api = axios.create({
    baseURL: "http://localhost:3333"
})

api.interceptors.response.use(
    (response) => {return response},
    (error) => {
        if (error.response){
            toast.error(error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }

        return Promise.reject(error)
    }
)

export default api