import { createTheme } from "@mui/material";

const getTheme = (theme: 'light' | 'dark') => createTheme({
    palette: {
        mode: theme,
    },
});

export default getTheme;