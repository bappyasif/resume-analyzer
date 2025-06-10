import { useEffect } from "react";

export const useToDetectClickedOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler();
        };
        document.addEventListener('mousedown', listener);
        // document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            // document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}