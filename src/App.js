import { useState } from 'react'
import { Countdown } from './Countdown'
import './App.css'

// const Countdown = ({ deadline, timerName, id, removeHandler }) => {
// 	const [timer, setTimer] = useState({
// 		days: 0,
// 		hours: 0,
// 		minutes: 0,
// 		seconds: 0,
// 	})
// 	function startTimer() {
// 		setTimer({
// 			days: Math.floor(
// 				(Date.parse(deadline) - Date.parse(new Date())) / (1000 * 60 * 60 * 24)
// 			),
// 			hours: Math.floor(
// 				((Date.parse(deadline) - Date.parse(new Date())) / (1000 * 60 * 60)) %
// 					24
// 			),
// 			minutes: Math.floor(
// 				((Date.parse(deadline) - Date.parse(new Date())) / (1000 * 60)) % 60
// 			),
// 			seconds:
// 				Math.floor((Date.parse(deadline) - Date.parse(new Date())) / 1000) % 60,
// 		})
// 	}

// 	useEffect(() => {
// 		startTimer()
// 		let timerInt = setInterval(startTimer, 1000)
// 		return () => {
// 			clearInterval(timerInt)
// 		}
// 	}, [])
// 	return (
// 		<section className='neo group  flex mb-5 py-8 px-2 flex-col w-[95%]  italic  relative '>
// 			<h1 className='text-2xl mb-6 text-indigo-900'>{timerName}</h1>
// 			<div
// 				className='absolute top-6 right-10 text-xl bg-red-500 h-5 w-5 rounded-md hidden group-hover:block cursor-pointer'
// 				onClick={() => removeHandler(id)}
// 			></div>
// 			<h2 className='text-xl mb-6 text-indigo-900'>
// 				{deadline.split('-').reverse().join('-')}
// 			</h2>
// 			<div className='flex justify-center gap-1'>
// 				<div className='font-bold days flex flex-col-reverse font-serif  p-3'>
// 					{timer.days < 10 ? `0${timer.days}` : timer.days}
// 					<span>Дней:</span>
// 				</div>
// 				<div className='font-bold hours flex flex-col-reverse font-serif  p-3'>
// 					{timer.hours < 10 ? `0${timer.hours}` : timer.hours}
// 					<span>Часов:</span>
// 				</div>
// 				<div className='font-bold minutes flex flex-col-reverse font-serif  p-3'>
// 					{timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}
// 					<span>Минут:</span>
// 				</div>
// 				<div className='font-bold seconds flex flex-col-reverse font-serif  p-3'>
// 					{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
// 					<span>Секунд:</span>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }
const App = () => {
	const [viewItems, setViewItems] = useState([])
	const [timerName, setTimerName] = useState('')
	const [timerDate, setTimerDate] = useState('')
	const [isVisible, setIsVisible] = useState(false)

	const removeHandler = id => {
		setViewItems(prev => prev.filter(item => item.id !== id))
	}
	viewItems.sort(function (a, b) {
		const keyA = new Date(a.deadline),
			keyB = new Date(b.deadline)
		if (keyA < keyB) return -1
		if (keyA > keyB) return 1
		return 0
	})
	const addTimer = () => {
		setViewItems([
			...viewItems,
			{ id: 6, timerName: timerName, deadline: timerDate },
		])
		setIsVisible(false)
		setTimerName('')
		setTimerDate('')
	}
	return (
		<div className='overflow-x-hidden z-10 relative py-1 px-2  grid md:grid-cols-2 xl:grid-cols-3 text-center   gap-3 w-full justify-items-center justify-center items-center h-screen '>
			{isVisible && (
				<div
					className={`  fixed left-0  right-0 top-0 bottom-0 z-20  bg-black/20  flex flex-col justify-center items-center space-y-3`}
				>
					<div className='bg-white h-1/2 p-5'>
						<h1>Добавить таймер</h1>
						<input
							value={timerName}
							onChange={e => setTimerName(e.currentTarget.value)}
							type='text'
							placeholder='Название таймера:'
						/>
						<input
							value={timerDate}
							onChange={e => setTimerDate(e.currentTarget.value)}
							type='text'
							placeholder='Дата:'
						/>
						<button className='' onClick={addTimer}>
							Добавить
						</button>
					</div>
				</div>
			)}
			<div
				onClick={() => setIsVisible(!isVisible)}
				className='absolute cursor-pointer text-3xl font-bold z-30 bottom-20 md:bottom-6 right-10 h-20 w-20 rounded-full neo border flex justify-center items-center'
			>
				<span className='p-0 my-auto'>+</span>
			</div>
			{viewItems.map((item, index) => (
				<Countdown
					removeHandler={removeHandler}
					key={index}
					deadline={item.deadline}
					timerName={item.timerName}
					id={item.id}
				/>
			))}
		</div>
	)
}

export default App
