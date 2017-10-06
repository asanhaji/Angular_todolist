
export class Todo {
    constructor(public name:String,
                public description:string,
                public created_at:Date = new Date(),
                public status:boolean = false,
                public edited_at:Date = null,              
            ){
    }
}