import {toast} from "react-toastify";

export const getPasswordStrength = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    let strength = 0;
    if (password.length > 0) strength += 30;
    if (password.length >= 8) {
        strength += 30;
        if (hasLowerCase) strength += 10;
        if (hasUpperCase) strength += 30;
        if (hasDigit) strength += 20;
    }
    return Math.min(strength, 100);
};

export const showToast = (status, message) => {
    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };

    if (status === "fail") {
        toast.error(message, toastOptions);
    } else if (status === "success") {
        toast.success(message, toastOptions);
    }
};

export const pathCover = (cover) => {
    const path = `http://localhost:5000/images/big/${cover}`;
    return path;
}

export const pathGalleries = (galleries) => {
    const path = `http://localhost:5000/images/small/${galleries}`;
    return path;
}

export const pathFile = (file) => {
    const path = `http://localhost:5000/files/${file}`;
    return path;
}

export const baseUrl = () => {
    const url = "http://localhost:5000/";
    return url;
}

class Utils {
    static getToken() {
        return localStorage.getItem("token");
    }

    static getClient() {
        return JSON.parse(localStorage.getItem("client"));
    }
}

export default Utils;


