import HttpAdapter from 'http_adapters/http-adapter-interface';
import useHttpAdapter from 'http_adapters/useHttpAdapter';
import React, { FormEvent, useState } from 'react';

export default function Guest() {
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');
    const [loading, setLoading] = useState(false);
    const adapter = useHttpAdapter(new HttpAdapter('/guest', 'POST'), {
        onFailed(message: string) {
            setLoading(false);
            alert(message);
        },
        onSuccess: () => {
            setLoading(false);
            alert('Success!');
            setName('');
            setPurpose('');
        }
    });
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        adapter.execute({
            payload: { fullName: name, purposeOfVisit: purpose },
        });
    };

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
