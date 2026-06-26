import { useState } from 'react';

function Sum() {
    const [arg1, setArg1] = useState('0');
    const [arg2, setArg2] = useState('0');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'arg1') setArg1(value);
        if (name === 'arg2') setArg2(value);
    };

    const result = Number(arg1) + Number(arg2);

    return (
        <form>
            <input name="arg1" type="number" value={arg1} onChange={handleChange} />
            <input name="arg2" type="number" value={arg2} onChange={handleChange} />
            <div>Результат: {result}</div>
        </form>
    );
}

export default Sum;