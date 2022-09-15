import AppSnackbar from "components/shared/AppSnackbar";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext<any>(null);

export type severityType = 'success' | 'error' | 'warning' | 'info';

export const NotificationProvider = (props: {
    children: JSX.Element;
}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<severityType>('info');

    const notify = (message: string, severity: severityType) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    return <>
        <NotificationContext.Provider value={notify}>
            {props.children}
            <AppSnackbar
                onClose={() => setOpen(false)}
                open={open}
                message={message}
                severity={severity}
            />
        </NotificationContext.Provider>
    </>;
};

const useNotification = () => useContext<(message: string, severity: severityType) => void>(NotificationContext);

export default useNotification;