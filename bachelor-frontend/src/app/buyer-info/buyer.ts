export class Buyer {
    products: any[] | undefined;
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public phoneNumber: string,
        public streetAndNumber: string,
        public postalCode: string,
        public city: string,
        public note: string,
    ) { }
}