import {
	Stack,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
} from '@mui/material';
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

			<Typography
				variant='h3'
				p={2}
				mt={2}
			>
				All Guests
			</Typography>

			<Stack p={2}>
				<TableContainer component={Paper}>
					<Table
						sx={{ minWidth: 650 }}
						aria-label='simple table'
					>
						<TableHead>
							<TableRow>
								<TableCell> FULL NAME </TableCell>
								<TableCell> PURPOSE OF VISIT </TableCell>
								<TableCell> TIME AND DATE OF VISIT </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{guests.map((guest, idx) => (
								<TableRow
									key={idx}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell
										component='th'
										scope='row'
									>
										{guest.fullName}
									</TableCell>
									<TableCell
										component='th'
										scope='row'
									>
										{guest.purposeOfVisit}
									</TableCell>
									<TableCell
										component='th'
										scope='row'
									>
										{new Date(guest.timeIn).toDateString()} {' - '}
										{new Date(guest.timeIn).toLocaleTimeString()}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Stack>
		</>
	);
}
