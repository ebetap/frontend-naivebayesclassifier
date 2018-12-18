<template>
  <v-container grid-list-md>
    <!-- <h1>Train Model</h1> -->
    <v-layout row wrap>
      <v-flex xs6 md6 lg6>
        <h2 class="mb-3">Dataset Spam</h2>
        <el-upload
          class="upload-demo"
          drag
          action="localhost"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="handlePreview">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </el-upload>
      </v-flex>
      <v-flex xs6 md6 lg6>
        <h2 class="mb-3">Dataset Not Spam</h2>
        <el-upload
          class="upload-demo"
          drag
          action="localhost"
          :on-remove="handleRemove2"
          :auto-upload="false"
          :on-change="handlePreview2">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </el-upload>
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
          :disabled="valid ? false : true"
        >
          Latih Model
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TrainModel',
  data(){
    return{
      fileSpam:[],
      fileNotSpam: [],
      valid: false
    }
  },
  watch:{
    fileSpam: function(value) {
      if(this.fileSpam.length > 0 && this.fileNotSpam.length >0){
        this.valid = true
      }else{
        this.valid = false
      }
    },

    fileNotSpam: function(value) {
      if(this.fileSpam.length > 0 && this.fileNotSpam.length >0){
        this.valid = true
      }else{
        this.valid = false
      }
    }
  },
  methods:{
    handlePreview(file){
      this.fileSpam.push(file)
    },

    handlePreview2(file){
      this.fileNotSpam.push(file)
    },

    handleRemove(file){
      this.fileSpam = []
    },

    handleRemove2(file){
      this.fileNotSpam = []
    },

    handleTrain(){

    }
  }
}
</script>

<style>

</style>
