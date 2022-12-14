// ? components
import { useNavigate } from 'react-router-dom';
import {
	Flex,
	Button,
	Box,
	Menu,
	MenuButton,
	MenuList,
	useToast
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { AnimationControls, motion, TargetAndTransition } from 'framer-motion';
// ? local components
import NavItems from './NavItems';
import { Logo, MinLogo } from '@/components/atoms/icons';

type props = {
	entryAnimation: {};
};
function HomeHeader({ entryAnimation }: props) {
	// * Hooks declaration
	const navigate = useNavigate();
	const toast = useToast();

	// * State declaration

	// * Variable declarations
	const navItems = [
		{ name: 'Inicia Sesión', route: '/login' },
		{ name: 'Registra tu club', route: '/' },
		{ name: 'Sobre nosotros', route: '/' }
	];

	// * Event handler
	const redirect = (route) => {
		if (route) return navigate(route);
		toast({
			title: 'En construcción',
			status: 'warning',
			position: 'top'
		});
	};

	// * Initial Load

	return (
		<Box
			position="relative"
			zIndex={10}
			as={motion.div}
			animate={entryAnimation}
		>
			{/* Desktop */}
			<Flex
				alignItems="center"
				justifyContent="space-between"
				display={{ base: 'none', md: 'flex' }}
			>
				<Logo w="131px" h="55px" _hover={{ cursor: 'pointer' }} />
				<Button variant="outlined" onClick={() => navigate('/login')}>
					Iniciar Sesión
				</Button>
			</Flex>
			{/* Mobile */}
			<Flex
				alignItems="center"
				justifyContent="space-between"
				display={{ base: 'flex', md: 'none' }}
			>
				<MinLogo w="55px" _hover={{ cursor: 'pointer' }} />
				<Menu>
					<MenuButton
						as={Flex}
						py="10px"
						px="14px"
						borderRadius="6px"
						border="1px solid"
						borderColor="brand.dark"
						_hover={{
							bgColor: 'brand.dark',
							color: 'brand.white',
							cursor: 'pointer'
						}}
					>
						<HamburgerIcon />
					</MenuButton>
					<MenuList m="0" p="0">
						{navItems.map((item) => (
							<NavItems
								content={item}
								action={() => redirect(item.route)}
								key={`${Math.random() * 10 + 1}${item.route}`}
							/>
						))}
					</MenuList>
				</Menu>
			</Flex>
		</Box>
	);
}

export default HomeHeader;
