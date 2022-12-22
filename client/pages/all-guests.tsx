import useLoadingIndicator from 'hooks/useLoadingIndicator';
import socketConfig from 'lib/socketConfig';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Guest } from 'types/guest.model';

async function getAllGuests() {
	const { url } = socketConfig;
	const res = await fetch(url + '/guest');
	const data = await res.json();
	if (res.ok) return data.data;
	return [];
}

export default function AllGuests() {
	const router = useRouter();
	const loadingIndicator = useLoadingIndicator();
	const [guests, setGuests] = useState<Guest[]>([]);

	useEffect(() => {
		const sessionKey = 'sbca-admin';
		if (!sessionStorage.getItem(sessionKey)) {
			router.replace('/');
			return;
		}

		loadingIndicator.setVisibility(true);
		getAllGuests().then((data) => {
			setGuests(data);
			console.log({ data });

			loadingIndicator.setVisibility(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Head>
				<title> All Guests </title>
			</Head>
		</>
	);
}
