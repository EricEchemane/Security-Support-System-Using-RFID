import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ConfirmDialogContext = createContext<any>(null);

const useConfirmDialog = () => useContext<{
    confirm: ((options: ConfirmOptions) => boolean);
}>(ConfirmDialogContext);

export default useConfirmDialog;

interface ConfirmOptions {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

export const ConfirmDialogProvider = (props: { children: JSX.Element; }) => {
    const [isOpen, setOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>();

    const confirm = (options: ConfirmOptions) => {
        setOptions({ ...options });
        setOpen(true);
    };

    return <ConfirmDialogContext.Provider value={{ confirm }}>
        {props.children}
        <Modal
            open={isOpen}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant='h6' align='center' id="modal-modal-title">
                    {options?.title}
                </Typography>
                <Typography align='center' id="modal-modal-description" sx={{ mt: 2 }}>
                    {options?.message}
                </Typography>
                <Stack spacing={2} mt={3} direction={"row"} justifyContent="stretch" width={"100%"}>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            options?.onCancel ? options?.onCancel() : null;
                        }}
                        variant="outlined"
                        fullWidth> {options?.cancelText} </Button>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            options?.onConfirm();
                        }}
                        variant="contained"
                        fullWidth> {options?.confirmText} </Button>
                </Stack>
            </Box>
        </Modal>
    </ConfirmDialogContext.Provider>;
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "min(500px,80vw)",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};