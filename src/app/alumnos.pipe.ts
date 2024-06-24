import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alumnos'
})
export class AlumnosPipe implements PipeTransform {

  transform(mObjects: { nombreCompleto: string;}[], input: string) {
    if (!input) return mObjects;
    return mObjects.filter(val => this.filterBy(val, input));
    // return null;
  }

  private filterBy(
    mObject: { nombreCompleto: string;},
    search: string
  ) {
    const reduced = Object.keys(mObject)
      .reduce((prev, current) => this.reduceKeys(prev, current, mObject), "")
      .toLocaleLowerCase();
    return reduced.indexOf(search.toLocaleLowerCase()) > -1;
  }

  private reduceKeys(
    prev: string,
    current: string,
    mObject: { nombreCompleto: string;}
  ): string {
    if (this.isProp(current)) {
      prev = `${prev}\$${mObject[current]}`;
    }
    return prev;
  }

  private isProp(key: string): boolean {
    return key.includes("nombreCompleto");
  }

}
