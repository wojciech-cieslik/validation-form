<template>
  <div>

    <form class="validation-form" @submit.prevent="sendForm">

      <label class="label-form" for="form-name">

        Name:

        <input type="text" id="form-name" placeholder="Enter your name here" v-model="userName">
        <span>{{ errors.name }}</span>

      </label>

      <label class="label-form" for="form-email">

        Email:

        <input type="email" id="form-email" placeholder="Enter your email here" v-model="userEmail">
        <span>{{ errors.email }}</span>

      </label>

      <label class="label-form" for="form-subject">

        Subject:

        <input type="text" id="form-subject" placeholder="Enter subject here" v-model="userSubject">
        <span>{{ errors.subject }}</span>
      </label>

      <label class="label-form" for="form-message">

        Message:

        <input type="text" id="form-message" placeholder="Enter message here" v-model="userMessage">
        <span>{{ errors.message }}</span>

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
      errors: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      sendStatus: '',
    }
  },
  methods: {
    validateForm() {
      this.errors.name = '';
      this.errors.email = '';
      this.errors.subject = '';
      this.errors.message = '';

      if (!this.userName) {
        this.errors.name = 'Name is required!';
      } else {
        if (this.userName.length < 5) {
          this.errors.name = 'Name must be minimum 5 characters!';
        } else if (this.userName.length > 50) {
          this.errors.name = 'Name must be maximum 50 characters!';
        }
      }

      if (!this.userEmail) {
        this.errors.email = 'Email is required!';
      } else {
        if (this.userEmail.indexOf('@') < 1) {
          this.errors.email = 'Id need before @ in email!';
        }
      }

      if (this.userSubject.length >= 100) {
        this.errors.subject = 'Subject must be less than 100 characters!';
      }

      if (!this.userMessage) {
        this.errors.message = 'Message is required!';
      } else {
        if (this.userMessage.length >= 500) {
          this.errors.message = 'Message must be less than 500 characters!';
        }
      }
    },
    checkErrors() {
      if (this.errors.name === '' && this.errors.email === ''
        && this.errors.subject === '' && this.errors.message === '') {
        return true;
      } else
        return false;
    },
    sendForm() {
      this.validateForm();
      if (this.checkErrors()) {
        this.axios.post('https://f16636d1-e3c1-4119-bd35-4f5587ddc2cb.mock.pstmn.io/message',
          this.messageBody)
          .then(response => this.sendStatus = response.data.status)
          .catch(err => {
            if (err) {
              this.sendStatus = 'error'
            }
            return console.log(err)
          })
      }
    }
  },
  watch: {
    sendStatus: function () {
      if (this.sendStatus === 'succes') {
        alert('Form send succesfully');
        this.userName = '';
        this.userEmail = '';
        this.userSubject = '';
        this.userMessage = '';
      } else if (this.sendStatus === 'error') {
        alert('Something went wrong with sending form :(')
      }
    }
  }
}
</script>