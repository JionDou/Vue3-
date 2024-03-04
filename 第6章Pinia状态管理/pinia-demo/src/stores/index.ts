import { defineStore } from 'pinia';

export const useTestStore = defineStore('pinia-test',{
    
    state:()=>({count:0}),
    getters:{},
    actions:{}
})