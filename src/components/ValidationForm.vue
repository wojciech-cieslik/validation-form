<template>
  <div>

    <div class="form-errors">

      <p class="errors-msg" v-for="error in errors" :key="error">{{ error }}</p>

    </div>

    <form class="validation-form" @submit.prevent="sendForm">

      <label class="label-form" for="form-name">

        Name:

        <input type="text" id="form-name" placeholder="Enter your name here" v-model="userName">

      </label>

      <label class="label-form" for="form-email">

        Email:

        <input type="email" id="form-email" placeholder="Enter your email here" v-model="userEmail">

      </label>

      <label class="label-form" for="form-subject">

        Subject:

        <input type="text" id="form-subject" placeholder="Enter subject here" v-model="userSubject">

      </label>

      <label class="label-form" for="form-message">

        Message:

        <input type="text" id="form-message" placeholder="Enter message here" v-model="userMessage">

      </label>

      <button class="button-form" type="submit">SEND</button>

    </form>

  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

import '../styles/ValidationForm.css';


export default {

  data() {
    return {
      userName: '',
      userEmail: '',
      userSubject: '',
      userMessage: '',
      messageBody: {
        userName: this.userName,
        userEmail: this.userEmail,
        userSubject: this.userSubject,
        userMessage: this.userMessage,
      },
      errors: [],
      sendStatus: '',
    }
  },
  methods: {
    validateForm() {
      this.errors = [];
      if (!this.userName) {
        this.errors.push('Name is required!')
      } else {
        if (this.userName.length < 5) {
          this.errors.push('Name must have minimum 5 characters!')
        } else if (this.userName.length > 50) {
          this.errors.push('Name must have maximum 50 characters!')
        }
      }
      if (!this.userEmail) {
        this.errors.push('Email is required!')
      } else {
        if (this.userEmail.indexOf('@') < 1) {
          this.errors.push('Id need before @ in email!')
        }
      }
      if (this.userSubject.length >= 100) {
        this.errors.push('Subject must be less than 100 characters!')
      }
      if (!this.userMessage) {
        this.errors.push('Message is required!')
      } else {
        if (this.userMessage.length >= 500) {
          this.errors.push('Message must be less than 500 characters!')
        }
      }
    },
    sendForm() {
      this.validateForm();
      if (this.errors.length === 0) {
        this.axios.post('https://f16636d1-e3c1-4119-bd35-4f5587ddc2cb.mock.pstmn.io/message',
          this.messageBody)
          .then(response => this.sendStatus = response.data.status)
          .catch(err => console.log(err))
        if (this.sendStatus === 'succes') {
          alert('Send succesfully!');
        }
        this.userName = '';
        this.userEmail = '';
        this.userSubject = '';
        this.userMessage = '';
      }
    }
  }
}
</script>