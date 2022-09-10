import React, { useEffect, useState } from 'react'

export const Countdown = ({ deadline, timerName, id, removeHandler }) => {
	const [timer, setTimer] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})
	function startTimer() {
		setTimer({
			days: Math.floor(
				(Date.parse(deadline) - Date.parse(new Date())) / (1000 * 60 * 60 * 24)
			),
			hours: Math.floor(
				((Date.parse(deadline) - Date.parse(new Date())) / (1000 * 60 * 60)) %
					24
			),
			minutes: Math.floor(
				((Date.parse(deadline) - Date.parse(new Date())) / (1000 * 60)) % 60
			),
			seconds:
				Math.floor((Date.parse(deadline) - Date.parse(new Date())) / 1000) % 60,
		})
	}

	useEffect(() => {
		startTimer()
		let timerInt = setInterval(startTimer, 1000)
		return () => {
			clearInterval(timerInt)
		}
	}, [])
	return (
		<section className='neo group  flex mb-5 py-2 px-2 flex-col w-[95%]  italic  relative '>
			<h1 className='text-2xl mb-6 text-indigo-900'>{timerName}</h1>
			<div
				className='absolute top-6 right-10 text-xl bg-red-500 h-5 w-5 rounded-md hidden group-hover:block cursor-pointer'
				onClick={() => removeHandler(id)}
			></div>
			<h2 className='text-xl mb-6 text-indigo-900'>
				{deadline.split('-').reverse().join('-')}
			</h2>
			<div className='flex justify-center gap-1'>
				<div className='font-bold days flex flex-col-reverse font-serif  p-3'>
					{timer.days < 10 ? `0${timer.days}` : timer.days}
					<span>Дней:</span>
				</div>
				<div className='font-bold hours flex flex-col-reverse font-serif  p-3'>
					{timer.hours < 10 ? `0${timer.hours}` : timer.hours}
					<span>Часов:</span>
				</div>
				<div className='font-bold minutes flex flex-col-reverse font-serif  p-3'>
					{timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
					<span>Минут:</span>
				</div>
				<div className='font-bold seconds flex flex-col-reverse font-serif  p-3'>
					{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
					<span>Секунд:</span>
				</div>
			</div>
		</section>
	)
}
