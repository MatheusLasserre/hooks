import { useState, useEffect, useRef } from 'react';

export default function useTarget(initialIsTarget) {

    const [isTarget, setIsTarget] = useState(initialIsTarget);
    
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsTarget(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isTarget, setIsTarget };
}