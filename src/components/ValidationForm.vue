<template>
  <div>
    <form class="validation-form" @submit.prevent="sendForm">
      <label class="label-form" for="form-name">
        Name:
        <input @blur="validateName" type="text" id="form-name" placeholder="Enter your name here" v-model="name">
        <span>{{ errors.name }}</span>
      </label>
      <label class="label-form" for="form-email">
        Email:
        <input @blur="validateEmail" type="email" id="form-email" placeholder="Enter your email here" v-model="email">
        <span>{{ errors.email }}</span>
      </label>
      <label class="label-form" for="form-subject">
        Subject:
        <input @blur="validateSubject" type="text" id="form-subject" placeholder="Enter subject here" v-model="subject">
        <span>{{ errors.subject }}</span>
      </label>
      <label class="label-form" for="form-message">
        Message:
        <input @blur="validateMessage" type="text" id="form-message" placeholder="Enter message here" v-model="message">
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

import '../styles/ValidationForm.css';

const maxSubjectLength = 100;
const minNameLength = 5;
const maxNameLength = 50;
const maxMessageLength = 500;
const NAME_REQUIRED_ERROR = 'Name is required!';
const NAME_MIN_LENGTH_ERROR = 'Name must be minimum 5 characters!';
const NAME_MAX_LENGTH_ERROR = 'Name must be maximum 50 characters!';
const EMAIL_REQUIRED_ERROR = 'Email is required!';
const EMAIL_BAD_ID_ERROR = 'Name is required!';
const SUBJECT_MAX_LENGTH_ERROR = 'Subject must be less than 100 characters!';
const MESSAGE_REQUIRED_ERROR = 'Message is required!';
const MESSAGE_MAX_LENGTH_ERROR = 'Message must be less than 500 characters!';
const SUCCESS_MESSAGE = 'Form send successfully';
const ERROR_MESSAGE = 'Something went wrong with sending form :(';


Vue.use(VueAxios, axios);

export default {

  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
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
    validateName() {
      this.errors.name = '';
      if (!this.name) {
        this.errors.name = NAME_REQUIRED_ERROR;
      } else {
        if (this.name.length < minNameLength) {
          this.errors.name = NAME_MIN_LENGTH_ERROR;
        } else if (this.name.length > maxNameLength) {
          this.errors.name = NAME_MAX_LENGTH_ERROR;
        }
      }
    },
    validateEmail() {
      this.errors.email = '';
      if (!this.email) {
        this.errors.email = EMAIL_REQUIRED_ERROR;
      } else {
        if (this.email.indexOf('@') === 0) {
          this.errors.email = EMAIL_BAD_ID_ERROR;
        }
      }
    },
    validateSubject() {
      this.errors.subject = '';
      if (this.subject.length >= maxSubjectLength) {
        this.errors.subject = SUBJECT_MAX_LENGTH_ERROR;
      }
    },
    validateMessage() {
      this.errors.message = '';
      if (!this.message) {
        this.errors.message = MESSAGE_REQUIRED_ERROR;
      } else {
        if (this.message.length >= maxMessageLength) {
          this.errors.message = MESSAGE_MAX_LENGTH_ERROR;
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
      if (this.checkErrors()) {
        this.axios.post('https://940b0ec3-8a38-4aae-9e22-fff37a53afca.mock.pstmn.io/message',
          this.dataToSend)
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
  computed: {
    dataToSend() {
      return {
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message,
      }
    }
  },
  watch: {
    sendStatus: function () {
      if (this.sendStatus === 'success') {
        alert(SUCCESS_MESSAGE);
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
      } else if (this.sendStatus === 'error') {
        alert(ERROR_MESSAGE)
      }
      this.sendStatus = '';
    }
  }
}
</script>