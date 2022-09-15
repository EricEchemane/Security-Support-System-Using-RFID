import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { severityType } from 'hooks/useNotification';

export default function AppSnackbar(props: {
    message: string;
    severity: severityType;
    open: boolean;
    onClose: () => void;
}) {

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        props.onClose();
    };

    return <>
        <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    </>;
}