<template>
  <div>
    <div v-if="isLoading" class="overlay"></div>
    <v-container v-if="isLoading" class="loader-training">
      <v-progress-linear :indeterminate="true" color="blue-grey darken-2"></v-progress-linear>
      <h3>Training Model...</h3>
    </v-container>
    <v-container grid-list-md>
      <!-- <h1>Train Model</h1> -->
      <v-layout row wrap>
        <v-flex row wrap xs12 md12 lg12>
          <v-alert v-model="alertSuccess" class="green lighten-1" type="success">
            Dataset Berhasil Diupload
          </v-alert>
          <v-alert v-model="alertError" class="red lighten-1" type="error">
            Dataset Gagal DiUpload
          </v-alert>
          <v-alert v-model="alertTraining" class="green lighten-1" type="success">
            {{alertTrainingMessage}}
          </v-alert>
        </v-flex>
        <v-flex xs6 md6 lg6>
          <h2 class="mb-3">Dataset Spam</h2>
          <v-text-field label="Select File" @click='pickFile' v-model='fileSpamName' prepend-icon='attach_file' :disabled="btnSpamDisable ? true:false"></v-text-field>
          <form>
            <input type="file" style="display: none" ref="spam" name="spam" accept="json/*" @change="onFilePickedSpam">
            <v-btn color="blue-grey darken-2" class="white--text mt-1" text-xs-center block v-on:click.prevent="handleFileSpam" :disabled="btnSpamDisable ? true:false">
              Upload Dataset
            </v-btn>
          </form>
        </v-flex>
  
        <v-flex xs6 md6 lg6>
          <h2 class="mb-3">Dataset Not Spam</h2>
          <v-text-field label="Select File" @click='pickFileNotSpam' v-model='fileNotSpamName' prepend-icon='attach_file' :disabled="btnNotSpamDisable ? true:false"></v-text-field>
          <form>
            <input type="file" style="display: none" ref="notspam" name="notspam" accept="json/*" @change="onFilePickedNotSpam">
            <v-btn color="blue-grey darken-2" class="white--text mt-1" text-xs-center block v-on:click.prevent="handleFileNotSpam" :disabled="btnNotSpamDisable ? true:false">
              Upload Dataset
            </v-btn>
          </form>
        </v-flex>
      </v-layout>
  
      <v-layout row wrap>
        <v-flex xs12 md12 lg12>
          <v-btn v-if="alertTraining === false" color="blue-grey darken-2" class="white--text mt-5" @click="handleTrain" text-xs-center block :disabled="btnSpamDisable && btnNotSpamDisable ? false:true">
            Latih Model
          </v-btn>
        </v-flex>

        <v-flex xs12 md12 lg12>
          <v-btn v-if="alertTraining" color="blue-grey darken-2" class="white--text mt-5" @click="$router.push('/')" text-xs-center block :disabled="btnSpamDisable && btnNotSpamDisable ? false:true">
            Kembali
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {
    baseUrl
  } from '../config/api.js'
  import axiosFu from 'axios-fileupload'
  import axios from 'axios'
  export default {
    name: 'TrainingForm',
    data() {
      return {
        alertTraining: false,
        alertTrainingMessage: '',
        alertError: false,
        alertSuccess: false,
        btnSpamDisable: false,
        btnNotSpamDisable: false,
        valid: false,
        fileSpamName: '',
        fileSpam: '',
        imageUrl: '',
        fileNotSpamName: '',
        fileNotSpam: '',
        isLoading: false
      }
    },
    methods: {
      pickFile() {
        this.$refs.spam.click()
      },
  
      pickFileNotSpam() {
        this.$refs.notspam.click()
      },
  
      onFilePickedSpam(e) {
        const files = e.target.files
        if (files[0] !== undefined) {
          this.fileSpamName = files[0].name
          if (this.fileSpamName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.fileSpam = files[0]
          })
        }
      },
  
      onFilePickedNotSpam(e) {
        const files = e.target.files
        if (files[0] !== undefined) {
          this.fileNotSpamName = files[0].name
          if (this.fileNotSpamName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.fileNotSpam = files[0]
          })
        }
      },
  
      handleFileSpam() {
        axiosFu(`${baseUrl}datasets`, this.fileSpam)
          .then(res => {
            if (res.data !== 'OK') {
              this.alertError = true
              setTimeout(() => {
                this.alertError = false
              }, 5000)
            } else {
              this.alertSuccess = true
              setTimeout(() => {
                this.alertSuccess = false
              }, 5000)
              this.btnSpamDisable = true
            }
          })
      },
  
      handleFileNotSpam() {
        axiosFu(`${baseUrl}datasets`, this.fileNotSpam)
          .then(res => {
            if (res.data !== 'OK') {
              this.alertError = true
              setTimeout(() => {
                this.alertError = false
              }, 5000)
            } else {
              this.alertSuccess = true
              setTimeout(() => {
                this.alertSuccess = false
              }, 5000)
              this.btnNotSpamDisable = true
            }
          })
      },
  
      handleTrain() {
        this.isLoading = true
        axios.post(`${baseUrl}train`)
          .then(res => {
            if (res.data.error == false) {
              this.alertTraining = true
              this.alertTrainingMessage = res.data.message
            } else {
              this.alertTraining = false
            }
            this.isLoading = false
          })
          .catch(err => {
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
    transform: translate(-50%,-50%);
    max-width: 500px!important;
  }
</style>
