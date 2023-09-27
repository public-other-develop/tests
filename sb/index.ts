import { UserProfile } from "./types"

type Invalidate<T> = T | undefined

const userData = {
	ProfileId: "12w562qrx",
	PersonInfo: {
		Name: "Василий Иванов",
		BirthDate: "12-09-1990",
		Citizenship: "Russian Federation"
	},
	CardInfo: [
		{
			CardNumber: "1234000145293333",
			CardName: "MASTERCARD GOLD",
			ExpDate: "21-05-2020"
		},
		{
			CardNumber: "1234000145293232",
			CardName: "MIR КЛАССИЧЕСКАЯ",
			ExpDate: "20-12-2019"
		},
		{
			CardNumber: "1234890456793131",
			CardName: "VISA CLASSIC",
			ExpDate: "30-02-2019"
		}
	]
}

export function getCardsArrayExpDate(data: Invalidate<UserProfile>, date: Invalidate<Date>): number[][] | null {
	// избегаем неверные данные (на входе)
	if (data === undefined || date === undefined) {
		return null
	}

	if (!Object.keys(data).length || !data.CardInfo.length) {
		return null
	}

	// исходя из объекта
	const maxCardLength = 16 // максимальная длина номера карты
	const maxExpDateLength = 3 // максимальная длина даты
	const maxLastCardLength = maxExpDateLength + 1 // максимальная длина последних цифр карты

	const isValidCardInfo = (cardExpDate: string, cardNumber: string) =>
		cardExpDate.length === maxExpDateLength && cardNumber.length === maxCardLength

	const arrLastNumberCards: number[][] = []
	for (const card of data.CardInfo) {
		const cardExpDate = card.ExpDate
		const cardNumber = card.CardNumber

		// прекращаем работу с циклом (на входе некорректные данные - вернуть null)
		// так-как в задаче стоит вернуть null при любом неверном значении в массиве CardInfo, завершаем цикл без continue)
		if (!isValidCardInfo(cardExpDate, cardNumber)) {
			return null
		}

		const [year, month, day] = Array.from(cardNumber.split("-", maxExpDateLength).reverse(), Number)
		const serializeExpDate = new Date(year, month, day)

		if (serializeExpDate.getTime() > date.getTime()) {
			continue
		}


		arrLastNumberCards.push(Array.from(cardNumber.slice(cardNumber.length - maxLastCardLength).split(""), Number))
	}

	if (!arrLastNumberCards.length) {
		return null
	}

	return arrLastNumberCards
}
