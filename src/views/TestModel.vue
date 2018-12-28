<template>
  <v-container grid-list-md>
    <h1>Test Model</h1>
    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <form>
          <v-text-field
            v-model="komentar"
            label="Komentar"
            required
          ></v-text-field>
          <v-btn 
            block 
            color="blue-grey darken-2" 
            @click="handleClassify"
            class="white--text"
            text-xs-center
          >
            Classify
          </v-btn>
        </form>
      </v-flex>
    </v-layout>
    <div v-if="result" class="result display-3 mt-5 text-uppercase">
      {{result.label}}
    </div>
    <div v-if="result" class="probability display-1">
      {{`Probability: ${result.probability}`}}
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import {baseUrl, headers} from '../config/api.js'
export default {
  name: 'TestModel',
  data(){
    return{
      komentar: '',
      result: null,
      hasError: {
        status: false,
        message: ''
      }
    }
  },
  methods:{
    handleClassify(){
      if(this.komentar != ''){
        axios.post(`${baseUrl}classify`,{
          komentar: this.komentar
        },headers)
        .then(res => {
          this.result=res.data
        })
        .catch(err => {
          this.hasError = {
            status: true,
            message: err
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
