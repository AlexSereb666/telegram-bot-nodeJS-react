import {makeAutoObservable} from 'mobx'

export default class PromoCodeStore {
    constructor() {
        this._list = []

        makeAutoObservable(this)
    }

    setList(list) {
        this._list = list
    }

    addItem(item) {
        this._list.push(item);
    }

    get list() {
        return this._list
    }
}
