import socketConfig from 'lib/socketConfig';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Staff } from 'types/staff.model';

export default function EditStaff(props: { data: Staff; }) {
    console.log(props.data);

    return (
        <div>EditStudent</div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { params } = ctx;
    const rfid = params?.rfid;
    if (!rfid) return { notFound: true };

    const res: any = await fetch(socketConfig.url + "/staff/" + rfid);
    if (!res.ok) return { notFound: true };
    const data = await res.json();

    return {
        props: { data: JSON.parse(JSON.stringify(data.data)) }
    };
};