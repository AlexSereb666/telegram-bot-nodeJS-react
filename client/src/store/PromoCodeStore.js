//import {makeAutoObservable} from 'mobx'

export default class PromoCodeStore {
    constructor() {
        this._list = []

        //makeAutoObservable(this)
    }

    setList(list) {
        this._list = list
    }

    get list() {
        return this._list
    }
}
