export interface PersonInfo {
	readonly Name: string
	readonly BirthDate: string
	readonly Citizenship: string
}

export interface CardInfo {
	readonly CardNumber: string
	readonly CardName: string
	readonly ExpDate: string
}

export interface UserProfile {
	readonly ProfileId: string
	readonly PersonInfo: PersonInfo
	readonly CardInfo: CardInfo[]
}