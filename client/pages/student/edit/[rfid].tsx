import socketConfig from 'lib/socketConfig';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Student } from 'types/student.model';

export default function EditStudent(props: { data: Student; }) {
    console.log(props.data);

    return (
        <div>EditStudent</div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { params } = ctx;
    const rfid = params?.rfid;
    if (!rfid) return { notFound: true };

    const res: any = await fetch(socketConfig.url + "/student/" + rfid);
    if (!res.ok) return { notFound: true };
    const data = await res.json();

    return {
        props: { data: JSON.parse(JSON.stringify(data)) }
    };
};