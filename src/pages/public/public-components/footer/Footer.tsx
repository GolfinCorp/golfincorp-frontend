import {
	Box,
	chakra,
	Link,
	SimpleGrid,
	Stack,
	Text,
	VisuallyHidden,
	Input,
	IconButton,
	useColorModeValue
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import Logo from '@/components/atoms/icons/Logo/Logo';
import { Container } from '@/components';
const SocialButton = ({
	children,
	label,
	href
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<IconButton
			icon={<FaInstagram />}
			aria-label=""
			minW="fit-content"
			variant="ghost"
			w="30px"
			h="30px"
			borderRadius="100px"
		/>
	);
};

const ListHeader = ({ children }: { children: ReactNode }) => {
	return (
		<Text fontWeight={'500'} fontSize={'lg'} mb={2}>
			{children}
		</Text>
	);
};

export default function Footer() {
	return (
		<Box background="brand.50">
			<Container as={Stack} py="10vh">
				<SimpleGrid
					templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
					spacing={8}
				>
					<Stack spacing={6}>
						<Box>
							<Logo />
						</Box>
						<Text fontSize={'sm'}>
							© 2022 Chakra Templates. All rights reserved
						</Text>
						<Stack direction={'row'} spacing={6}>
							<SocialButton label={'Twitter'} href={'#'}>
								<FaTwitter />
							</SocialButton>
							<SocialButton label={'YouTube'} href={'#'}>
								<FaYoutube />
							</SocialButton>
							<SocialButton label={'Instagram'} href={'#'}>
								<FaInstagram />
							</SocialButton>
						</Stack>
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Company</ListHeader>
						<Link href={'#'}>About us</Link>
						<Link href={'#'}>Blog</Link>
						<Link href={'#'}>Contact us</Link>
						<Link href={'#'}>Pricing</Link>
						<Link href={'#'}>Testimonials</Link>
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Support</ListHeader>
						<Link href={'#'}>Help Center</Link>
						<Link href={'#'}>Terms of Service</Link>
						<Link href={'#'}>Legal</Link>
						<Link href={'#'}>Privacy Policy</Link>
						<Link href={'#'}>Satus</Link>
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Stay up to date</ListHeader>
						<Stack direction={'row'}>
							<Input
								placeholder={'Your email address'}
								bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
								border={0}
								_focus={{
									bg: 'whiteAlpha.300'
								}}
							/>
							<IconButton
								bg={'brand.primary'}
								color={useColorModeValue('white', 'gray.800')}
								aria-label="Subscribe"
								icon={<BiMailSend />}
							/>
						</Stack>
					</Stack>
				</SimpleGrid>
			</Container>
		</Box>
	);
}
