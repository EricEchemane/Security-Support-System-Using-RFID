import { useEffect } from 'react';

export default function useBackgroundRemoverHook() {
    useEffect(() => {
        const img = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";
        return () => {
            document.body.style.backgroundImage = img;
        };
    }, []);
    return null;
}
