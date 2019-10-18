export class Category{
  title: string;
  body: string;
  constructor( Values: Object= {}){
    Object.assign(this, Values)
  }
}
