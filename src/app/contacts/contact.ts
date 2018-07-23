export interface IContact {
	id: string,
	fName: string,
	lName: string,
	email?: string,
	phone?: string,
	status: string
}

export class Contact implements IContact {
	id: string
	fName: string
	lName: string
	email: string
	phone: string
	status: string
}
