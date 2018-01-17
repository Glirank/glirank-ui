import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

export class ArrayDataSource<T> extends DataSource<T> {

    _dataChange = new BehaviorSubject([]);

    getData(): T[] { return this._dataChange.value; }
    setData(data: T[]) { this._dataChange.next(data); }

    connect(): Observable<T[]> {
        return new Observable<T[]>(fn => this._dataChange.subscribe(fn));
    }

    disconnect() { }
}
