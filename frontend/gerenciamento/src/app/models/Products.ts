import { NumberValueAccessor } from "@angular/forms";

export class Product {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public serie?: number
    ){
        
    }
}