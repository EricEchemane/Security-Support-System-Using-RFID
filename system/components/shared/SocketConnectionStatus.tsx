import { Chip } from "@mui/material";

export default function SocketConnectionStatus(props: {
    connected: boolean;
}) {
    return props.connected
        ? <Chip label="connected" color="success" variant="outlined" />
        : <Chip label="disconnected" color="error" variant="outlined" />;
}
