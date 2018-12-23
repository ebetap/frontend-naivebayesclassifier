<template>
  <v-container grid-list-md>
    <!-- <h1>Train Model</h1> -->
    <v-layout row wrap>
      <v-flex row wrap xs12 md12 lg12>
        <v-alert
          v-model="alertSuccess"
          class="green lighten-1"
          type="success"
        >
          Dataset Berhasil Diupload
        </v-alert>
        <v-alert
          v-model="alertError"
          class="red lighten-1"
          type="error"
        >
          Dataset Gagal DiUpload
        </v-alert>
        <v-alert
          v-model="alertTraining"
          class="green lighten-1"
          type="success"
        >
          {{alertTrainingMessage}}
        </v-alert>
      </v-flex>
      <v-flex xs6 md6 lg6>
        <h2 class="mb-3">Dataset Spam</h2>
        <v-text-field 
          label="Select File" 
          @click='pickFile' 
          v-model='fileSpamName' 
          prepend-icon='attach_file'
          :disabled="btnSpamDisable ? true:false"></v-text-field>
				<form>
          <input
						type="file"
						style="display: none"
						ref="spam"
            name="spam"
						accept="json/*"
						@change="onFilePickedSpam"
					>
          <v-btn 
            color="blue-grey darken-2"
            class="white--text mt-1"
            text-xs-center
            block
            v-on:click.prevent="handleFileSpam"
            :disabled="btnSpamDisable ? true:false"
          >
            Upload Dataset
          </v-btn>
        </form>
      </v-flex>

      <v-flex xs6 md6 lg6>
        <h2 class="mb-3">Dataset Not Spam</h2>
        <v-text-field 
        label="Select File" 
        @click='pickFileNotSpam' 
        v-model='fileNotSpamName' 
        prepend-icon='attach_file'
        :disabled="btnNotSpamDisable ? true:false"></v-text-field>
				<form>
          <input
						type="file"
						style="display: none"
						ref="notspam"
            name="notspam"
						accept="json/*"
						@change="onFilePickedNotSpam"
					>
          <v-btn 
            color="blue-grey darken-2"
            class="white--text mt-1"
            text-xs-center
            block
            v-on:click.prevent="handleFileNotSpam"
            :disabled="btnNotSpamDisable ? true:false"
          >
            Upload Dataset
          </v-btn>
        </form>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <v-btn 
          color="blue-grey darken-2"
          class="white--text mt-5"
          @click="handleTrain"
          text-xs-center
          block
          :disabled="btnSpamDisable && btnNotSpamDisable ? false:true"
        >
          Latih Model
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axiosFu from 'axios-fileupload'
import axios from 'axios'
export default {
  name: 'TrainModel',
  data(){
    return{
      alertTraining: false,
      alertTrainingMessage: '',
      alertError: false,
      alertSuccess: false,
      btnSpamDisable: false,
      btnNotSpamDisable:false,
      valid: false,
      fileSpamName: '',
      fileSpam: '',
      imageUrl: '',
      fileNotSpamName: '',
      fileNotSpam: '',
      isLoading: false
    }
  },
  methods:{
    pickFile() {
      this.$refs.spam.click()
    },

    pickFileNotSpam(){
      this.$refs.notspam.click()
    },

    onFilePickedSpam(e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.fileSpamName = files[0].name
				if(this.fileSpamName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
          this.fileSpam = files[0]
				})
      }
    },

    onFilePickedNotSpam(e){
      const files = e.target.files
			if(files[0] !== undefined) {
				this.fileNotSpamName = files[0].name
				if(this.fileNotSpamName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
          this.fileNotSpam = files[0]
				})
      }
    },
    
    handleFileSpam(){
      axiosFu('http://localhost:3000/datasets',this.fileSpam)
      .then(res => {
        if(res.data !== 'OK'){
          this.alertError = true
          setTimeout(() => {
            this.alertError = false
          },5000)
        }else{
          this.alertSuccess = true
          setTimeout(() => {
            this.alertSuccess = false
          },5000)
          this.btnSpamDisable = true
        }
      })
    },

    handleFileNotSpam(){
      axiosFu('http://localhost:3000/datasets',this.fileNotSpam)
      .then(res => {
        if(res.data !== 'OK'){
          this.alertError = true
          setTimeout(() => {
            this.alertError = false
          },5000)
        }else{
          this.alertSuccess = true
          setTimeout(() => {
            this.alertSuccess = false
          },5000)
          this.btnNotSpamDisable = true
        }
      })
    },

    handleTrain(){
      axios.post('http://localhost:3000/train')
      .then(res => {
        if(res.data.error == false){
          this.alertTraining = true
          this.alertTrainingMessage = res.data.message
        }else{
          this.alertTraining = false
        }
      })
    }
  }
}
</script>

<style>

</style>
