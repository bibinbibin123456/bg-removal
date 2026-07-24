import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate= useNavigate()

    const [credit, setCredit] = useState(0);
    const [user, setUser] = useState(null);

    const [image, setImage] = useState(false);
    const [resultImage,setResultImage]= useState(false)

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const loadCreditsData = async () => {

        try {

            if (!token) return;

            const { data } = await axios.get(
                `${backendUrl}/api/user/credits`,
                {
                    headers: {
                        token,
                    },
                }
            );

            if (data.success) {
                setCredit(data.credits);
                console.log(data.credits)
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }

    };
    const removeBg = async (image) => {
        try {
            if (!user) {
                navigate('/signIn');
                return;
            }

            setImage(image);
            setResultImage(false);
            navigate('/result');


            const token= await getToken()

            const formData=new formData()
            image && formData.append('image',image)

            const {data}= await axios.post(backendUrl+'/api/image/remove-bg',formData,{headers:[token]})

            if(data.success){
                setResultImage(data.resultImage)
                data.creditBalance && setCredit(data.creditBalance)
            }else{
                toast.error(data.message)
                data.creditBalance && setCredit(data.creditBalance)
                if(data.creditBalance===0){
                    navigate('/buy')
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const loadUserData = async () => {
        try {
            if (!token) return;

            const { data } = await axios.get(
                `${backendUrl}/api/user/profile`,
                {
                    headers: {
                        token,
                    },
                }
            );

            if (data.success) {
                setUser(data.user);
                setCredit(data.user.credits ?? 0);
            } else {
                setToken("");
                setUser(null);
                setCredit(0);
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.log(error);
            setToken("");
            setUser(null);
            setCredit(0);
            localStorage.removeItem("token");
        }
    };

    useEffect(() => {
        if (token) {
            loadUserData();
        }
    }, [token]);

    const value = {
        backendUrl,
        credit,
        setCredit,
        token,
        setToken,
        user,
        setUser,
        loadCreditsData,
        loadUserData,
        image,
        setImage,
        resultImage,
        setResultImage,
        removeBg,
        
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;