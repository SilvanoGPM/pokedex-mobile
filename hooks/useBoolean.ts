import { useState } from 'react';

type UseBooleanReturn = [boolean, () => void, () => void, (value: boolean) => void];

export function useBoolean(initalValue: boolean): UseBooleanReturn {
    const [value, setValue] = useState(initalValue);

    function setTrueValue() {
        setValue(true);
    }

    function setFalseValue() {
        setValue(false);
    }

    return [value, setTrueValue, setFalseValue, setValue];
}
