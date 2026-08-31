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
    const [isRemovingBg, setIsRemovingBg] = useState(false);

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const getAuthHeaders = () => {
        const authToken = localStorage.getItem("token")?.trim() || token;
        return authToken ? { Authorization: `Bearer ${authToken}` } : {};
    };

    const loadCreditsData = async () => {

        try {

            if (!token) return;

            const { data } = await axios.get(
                `${backendUrl}/api/user/credits`,
                {
                    headers: getAuthHeaders(),
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

            if (!image) {
                toast.error('Please select an image first.');
                return;
            }

            setIsRemovingBg(true);
            setImage(image);
            setResultImage(false);

            const formData = new FormData();
            formData.append("image", image);

            const { data } = await axios.post(
                backendUrl + "/api/image/remove-bg",
                formData,
                {
                    headers: {
                        ...getAuthHeaders(),
                        Accept: "application/json",
                    },
                }
            );

            if (data.success) {
                setResultImage(data.resultImage);
                if (typeof data.credits === 'number') {
                    setCredit(data.credits);
                }
                navigate('/result');
            } else {
                toast.error(data.message);
                if (typeof data.credits === 'number') {
                    setCredit(data.credits);
                }
                if (data.credits === 0) {
                    navigate('/buy');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsRemovingBg(false);
        }
    };

    const loadUserData = async () => {
        try {
            if (!token) return;

            const { data } = await axios.get(
                `${backendUrl}/api/user/profile`,
                {
                    headers: getAuthHeaders(),
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
        isRemovingBg,
        removeBg,
        
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;