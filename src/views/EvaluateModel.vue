<template>
  <div>
    <div v-if="isLoading" class="overlay"></div>
    <v-container v-if="isLoading" class="loader-training">
      <v-progress-linear :indeterminate="true" color="blue-grey darken-2"></v-progress-linear>
      <h3>Sedang Memvalidasi Model Menggunakan 10-Fold Cross Validation...</h3>
    </v-container>
    <v-container grid-list-md>
      <h1>Validasi Model</h1>
      <v-layout row wrap>
        <v-flex xs12 md12 lg12>
          <column-chart v-if="dataValidasi.length > 0" xtitle="Fold" ytitle="Accuracy(%)" :data="dataValidasi"></column-chart>
          <v-btn v-if="dataValidasi.length === 0" block dark color="blue-grey darken-2" class="white--text mt-1" @click="validateModel">
            Validasi Model
          </v-btn>
          <h1 v-if="akurasiModel" class="akurasi-model">
            Akurasi Model = {{akurasiModel}}
          </h1>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    baseUrl,
    headers
  } from '../config/api.js'
  export default {
    name: 'ValidationForm',
    data() {
      return {
        isLoading: false,
        dataValidasi: [],
        akurasiModel: null
      }
    },
    methods: {
      validateModel() {
        this.isLoading = true
        axios.get(`${baseUrl}validasi`, headers)
          .then(res => {
            let arrayData = []
            arrayData = res.data.statistic.map(data => {
              return [`Fold ${data.fold}`,data.accuracy]
            })
            arrayData.map(arrData => this.dataValidasi.push(arrData))
            this.akurasiModel = res.data.modelAccuracy
            this.isLoading = false
          })
          .catch(err => {
            console.log(err)
            this.isLoading = false
          })
      }
    }
  }
</script>

<style>
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    z-index: 9;
  }
  
  .loader-training {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px!important;
  }

  .akurasi-model {
    margin-top: 30px;
  }
</style>
