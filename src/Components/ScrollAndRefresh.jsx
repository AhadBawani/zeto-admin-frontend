
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ScrollAndRefresh = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentLocation = sessionStorage.getItem('location');
    useEffect(() => {
        window.scrollTo(0, 0);
        sessionStorage.setItem('location', location.pathname);
    }, [location]);

}
export default ScrollAndRefresh;