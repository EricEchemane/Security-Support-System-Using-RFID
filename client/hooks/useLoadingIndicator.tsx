import { LinearProgress } from "@mui/material";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

const LoadingIndicatorContext = createContext<any>(null);

const useLoadingIndicator = () => useContext<{
    setVisibility: Dispatch<SetStateAction<boolean>>;
    isVisible: boolean;
}>(LoadingIndicatorContext);

export default useLoadingIndicator;

export const LoadingIndicatorProvider = (props: { children: JSX.Element; }) => {
    const [isVisible, setVisibility] = useState(false);
    return <LoadingIndicatorContext.Provider value={{ setVisibility, isVisible }}>
        {isVisible && <LinearProgress />}
        {props.children}
    </LoadingIndicatorContext.Provider>;
};