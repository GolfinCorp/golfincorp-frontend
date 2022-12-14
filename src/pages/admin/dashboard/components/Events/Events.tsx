import React, { useState, useEffect } from 'react';
import { Text, Divider } from '@chakra-ui/react';
import EventCard from './eventcard/EventCard';
import EventSkeleton from './eventcard/EventSkeleton';
import { useGames } from '@/hooks';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { GameT } from '@/types';
const Events = () => {
	const { games } = useGames();
	const [todayGames, setTodayGames] = useState<GameT[]>([]);
	const today = getCurrentDate();
	useEffect(() => {
		if (todayGames || !games) return;
		const filteredGames = games.find(
			(gameDay: any) => gameDay.id === today.getTime()
		);
		if (!filteredGames) return;
		setTodayGames(filteredGames.games);
	}, [games]);

	return (
		<>
			<Text>Proximos eventos</Text>
			<Divider my="5" />
			{games && todayGames ? (
				todayGames.length > 0 ? (
					todayGames.map((game) => {
						return <EventCard game={game} key={game._id} />;
					})
				) : (
					<Text>No hay juegos hoy</Text>
				)
			) : (
				<EventSkeleton />
			)}
		</>
	);
};

export default Events;
