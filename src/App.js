import { useEffect, useState } from 'react'
import { Countdown } from './Countdown'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css'

const App = () => {
	const [viewItems, setViewItems] = useState([])
	const [timerName, setTimerName] = useState('')
	const [timerDate, setTimerDate] = useState('')
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		if (viewItems.length !== 0) {
			window.localStorage.setItem('countdownList', JSON.stringify(viewItems))
		}
	}, [viewItems])

	useEffect(() => {
		if (localStorage.getItem('countdownList')) {
			setViewItems(JSON.parse(localStorage.getItem('countdownList')))
		}
	}, [])

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
			{
				id: deadline,
				timerName: timerName,
				timerDate: timerDate,
				deadline: deadline,
			},
		])
		setIsVisible(false)
		setTimerName('')
		setTimerDate('')
	}
	const [deadline, setDeadline] = useState(new Date())
	return (
		<>
			<div
				onClick={() => setIsVisible(!isVisible)}
				className='absolute cursor-pointer text-3xl font-bold z-30 bottom-16  md:bottom-2 right-6 h-20 w-20 rounded-full neo border flex justify-center items-center'
			>
				<span className='p-0 my-auto'>+</span>
			</div>
			<div className='overflow-x-hidden z-10 relative py-5 px-4  grid md:grid-cols-2 xl:grid-cols-3 text-center   gap-6 w-full justify-items-center justify-center items-center  '>
				{isVisible && (
					<div
						className={`fixed left-0  right-0 top-0 bottom-0 md:justify-center md:items-center z-20 h-screen bg-black/20  flex flex-col   space-y-3`}
					>
						<div className='bg-white m-5 rounded-md p-5'>
							<h1 className='mb-5'>Добавить таймер:</h1>
							<input
								className='p-1 border-none focus:outline-cyan-400'
								value={timerName}
								onChange={e => setTimerName(e.currentTarget.value)}
								type='text'
								placeholder='Название таймера:'
							/>
							<DatePicker
								dateFormat='dd.MM.yyyy'
								locale={ru}
								minDate={new Date()}
								selected={deadline}
								onChange={date => {
									setDeadline(Date.parse(date))
									setTimerDate(date.toLocaleDateString('ru-RU'))
								}}
							/>
							<button className='mr-5' onClick={addTimer}>
								Добавить
							</button>
							<button className='' onClick={() => setIsVisible(false)}>
								Отмена
							</button>
						</div>
					</div>
				)}

				{viewItems.map((item, index) => {
					return (
						<Countdown
							removeHandler={removeHandler}
							key={index}
							deadline={item.deadline}
							timerName={item.timerName}
							timerDate={item.timerDate}
							id={item.id}
						/>
					)
				})}
			</div>
		</>
	)
}

export default App
