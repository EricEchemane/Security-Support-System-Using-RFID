/* eslint-disable @next/next/no-img-element */
import { Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import sbcaLogo from '../public/assets/logo.png';
import Footer from './Footer';

export default function HomePage() {
	const router = useRouter();
	return (
		<>
			<div id='home-background'>
				<Container style={{ maxWidth: '1300px' }}>
					<Stack
						justifyContent='center'
						spacing={4}
						mt={4}
					>
						<Typography
							fontWeight='bold'
							align='center'
							variant='h2'
						>
							WELCOME TO
						</Typography>
						<Stack
							spacing={1}
							direction={'row'}
							justifyContent='center'
							alignItems='center'
						>
							<Image
								alt='sbca logo'
								src={sbcaLogo}
								width={75}
								height={75}
							/>
							<Typography
								align='center'
								variant='h4'
							>
								ST. BERNADETTE COLLEGE OF ALABANG
							</Typography>
						</Stack>
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='center'
							spacing={4}
							id='hero'
						>
							<div>
								<img
									id='atm-machine'
									src='/assets/atm-machine.png'
									alt='atm-machine'
								/>
							</div>

							<div id='right-section'>
								<Stack
									alignItems='flex-start'
									justifyContent='stretch'
									p={3}
									spacing={4}
								>
									<Typography
										align='center'
										variant='h4'
									>
										SECURITY SUPPORT KIOSK SYSTEM
									</Typography>
									<Stack
										width='100%'
										direction='row'
										spacing={4}
									>
										<img
											id='rfid-chip'
											src='/assets/rfid-chip.png'
											alt='rfid-chip'
										/>
										<Stack
											width='100%'
											spacing={4}
											justifyContent='stretch'
										>
											<Button
												onClick={() => router.push('/student')}
												fullWidth
												variant='contained'
												style={{
													backgroundColor: '#d26146',
													padding: '1rem',
													borderRadius: '.5rem',
												}}
											>
												Student
											</Button>
											<Button
												onClick={() => router.push('/staff')}
												fullWidth
												variant='contained'
												style={{
													backgroundColor: '#d26146',
													padding: '1rem',
													borderRadius: '.5rem',
												}}
											>
												Staff
											</Button>
											<Button
												onClick={() => router.push('/all-guests')}
												fullWidth
												variant='contained'
												style={{
													backgroundColor: '#d26146',
													padding: '1rem',
													borderRadius: '.5rem',
												}}
											>
												Guests
											</Button>
										</Stack>
									</Stack>
								</Stack>
							</div>
						</Stack>
					</Stack>
				</Container>

				<Footer />
			</div>
		</>
	);
}
