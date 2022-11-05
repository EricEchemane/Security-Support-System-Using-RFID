import React, { FormEvent, useState } from 'react';

export default function Guest() {
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('submit');
    };
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');

    return (
        <form onSubmit={onSubmit}>
            <h1> Continue as guest </h1>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name'
                type="text"
                name='name' />
            <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder='Purpose of visit'
                name='purpose' />
            <button type='submit'> Submit </button>
        </form>
    );
}
