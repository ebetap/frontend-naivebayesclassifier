<template>
  <div>
    <div v-if="isLoading" class="overlay"></div>
    <v-container v-if="isLoading" class="loader-training">
      <v-progress-linear :indeterminate="true" color="blue-grey darken-2"></v-progress-linear>
      <h3>Getting data and classifying...</h3>
    </v-container>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md12 lg12>
          <form>
            <v-text-field solo name="input-7-4" label="Instagram Photo/Video URL" v-model="url"></v-text-field>
            <v-btn block color="blue-grey darken-2" @click="handleClassify" class="white--text" text-xs-center>
              Classify
            </v-btn>
          </form>
        </v-flex>
      </v-layout>
      <!-- <div v-if="result" class="result display-3 mt-5 text-uppercase">
        {{result.label}}
      </div> -->
      <!-- <div v-if="result" class="probability display-1">
        {{`Probability: ${result.probability}`}}
      </div> -->
      <img v-if="imageUrl" class="image-instagram" :src="imageUrl" alt="imageUrl">
      <video v-if="videoUrl" :src="videoUrl" class="video-instagram" controls>
  
      </video>
      <v-data-table :headers="headers" :items="result" class="elevation-1" :rows-per-page-items="[30]">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.komentar}}</td>
          <td>{{ props.item.label}}</td>
</template>
    </v-data-table>
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
    name: 'PredictionForm',
    data() {
      return {
        url: '',
        isLoading: false,
        result: null,
        hasError: {
          status: false,
          message: ''
        },
        imageUrl: null,
        videoUrl: null,
        headers: [{
            text: 'Komentar',
            align: 'left',
            sortable: true,
            value: 'komentar',
            width: '80%'
          },
          {
            text: 'Label',
            align: 'left',
            sortable: false,
            value: 'label',
            width: '20%'
          }
        ]
      }
    },
    methods: {
      handleClassify() {
        if (this.url != '') {
          this.isLoading = true
          axios.post(`${baseUrl}classify`, {
              url: this.url
            }, headers)
            .then(res => {
              this.result = res.data.hasilKlasifikasi
              if (res.data.hasOwnProperty('imageUrl')) {
                this.imageUrl = res.data.imageUrl
              }
              if (res.data.hasOwnProperty('videoUrl')) {
                this.videoUrl = res.data.videoUrl
              }
              this.isLoading = false
            })
            .catch(err => {
              this.hasError = {
                status: true,
                message: err
              }
              this.isLoading = false
            })
        }
      }
    }
  }
</script>

<style>
  tr {
    text-align: left!important;
  }
  
  .image-instagram {
    max-width: 100%;
    height: 335px;
  }

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
    transform: translate(-50%,-50%);
    max-width: 500px!important;
  }
</style>
