import { defineStore } from 'pinia';
import type { testState } from './model/testModel';
export const useTestStore = defineStore({
    id:'pinia-test',
    state:(): testState => {
        return { 
            Helloworld:'helloworld',
            count:0
        }
    },
    getters:{},
    actions:{},
    persist: true,
})