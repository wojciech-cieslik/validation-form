<template>
  <div class="contact-form">
    <notifications group="foo" position="bottom right" />
    <form class="validation-form" @submit.prevent="sendForm">
      <h2 class="title-form">Contact Form</h2>

      <b-input-group class="label-form">
        <template #prepend>
          <b-input-group-text
            >Name<span class="require">*</span></b-input-group-text
          >
        </template>
        <b-form-input
          @blur="validateName"
          type="text"
          id="form-name"
          placeholder="Enter your name"
          v-model="name"
        ></b-form-input>
        <span>{{ errors.name }}</span>
      </b-input-group>

      <b-input-group class="label-form">
        <template #prepend>
          <b-input-group-text
            >Email<span class="require">*</span>
          </b-input-group-text>
        </template>
        <b-form-input
          @blur="validateEmail"
          type="email"
          id="form-email"
          placeholder="Enter your email"
          v-model="email"
        ></b-form-input>
        <span>{{ errors.email }}</span>
      </b-input-group>

      <b-input-group class="label-form">
        <template #prepend>
          <b-input-group-text>Subject</b-input-group-text>
        </template>
        <b-form-input
          @blur="validateSubject"
          type="text"
          id="form-subject"
          placeholder="Enter subject"
          v-model="subject"
        ></b-form-input>
        <span>{{ errors.subject }}</span>
      </b-input-group>

      <b-input-group class="label-form">
        <template #prepend>
          <b-input-group-text
            >Message<span class="require">*</span></b-input-group-text
          >
        </template>
        <b-form-input
          @blur="validateMessage"
          type="text"
          id="form-message"
          placeholder="Enter message"
          v-model="message"
        ></b-form-input>
        <span>{{ errors.message }}</span>
      </b-input-group>

      <b-form-checkbox size="large" v-model="isAddressVisible"
        >Address options</b-form-checkbox
      >

      <AddressForm
        v-if="isAddressVisible"
        :address="address"
        @changeAddress="changeAddress"
      />

      <b-button
        v-b-modal="'sex-modal'"
        class="button-form"
        pill
        id="sex-modal-btn"
        >Choose sex</b-button
      >

      <b-modal id="sex-modal" hide-footer title="Choose your sex">
        <b-form-radio-group
          v-model="sex"
          :options="sexOptions"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-radio-group>
      </b-modal>

      <b-button pill variant="success" class="button-form" type="submit"
        >Send</b-button
      >
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import AddressForm from "./AddressForm.vue";

import "../styles/ContactForm.css";

const maxSubjectLength = 100;
const minNameLength = 5;
const maxNameLength = 50;
const maxMessageLength = 500;
const NAME_REQUIRED_ERROR = "Name is required!";
const NAME_MIN_LENGTH_ERROR = "Name must be minimum 5 characters!";
const NAME_MAX_LENGTH_ERROR = "Name must be maximum 50 characters!";
const EMAIL_REQUIRED_ERROR = "Email is required!";
const EMAIL_BAD_ID_ERROR = "Name is required!";
const SUBJECT_MAX_LENGTH_ERROR = "Subject must be less than 100 characters!";
const MESSAGE_REQUIRED_ERROR = "Message is required!";
const MESSAGE_MAX_LENGTH_ERROR = "Message must be less than 500 characters!";
const SUCCESS_MESSAGE = "Form send successfully!";
const ERROR_MESSAGE = "Something went wrong with sending form :(";
const MESSAGE_REQUIRED_VALUES = "Match required fields!";

Vue.use(VueAxios, axios);

export default {
  name: "ContactForm",
  components: {
    AddressForm,
  },
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
      sex: "",
      sexOptions: [
        {
          item: "male",
          name: "Male",
        },
        {
          item: "female",
          name: "Female",
        },
      ],
      address: {
        city: "",
        street: "",
        houseNumber: "",
        apartmentNumber: "",
      },
      errors: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      isAddressVisible: false,
    };
  },
  props: {
    redirectPath: String,
  },
  methods: {
    validateName() {
      this.errors.name = "";
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
      this.errors.email = "";
      if (!this.email) {
        this.errors.email = EMAIL_REQUIRED_ERROR;
      } else {
        if (this.email.indexOf("@") === 0) {
          this.errors.email = EMAIL_BAD_ID_ERROR;
        }
      }
    },
    validateSubject() {
      this.errors.subject = "";
      if (this.subject.length >= maxSubjectLength) {
        this.errors.subject = SUBJECT_MAX_LENGTH_ERROR;
      }
    },
    validateMessage() {
      this.errors.message = "";
      if (!this.message) {
        this.errors.message = MESSAGE_REQUIRED_ERROR;
      } else {
        if (this.message.length >= maxMessageLength) {
          this.errors.message = MESSAGE_MAX_LENGTH_ERROR;
        }
      }
    },
    checkErrors() {
      if (
        this.errors.name === "" &&
        this.errors.email === "" &&
        this.errors.subject === "" &&
        this.errors.message === "" &&
        this.name.length > 5 &&
        this.message.length > 0 &&
        this.email.length > 0
      ) {
        return true;
      } else return false;
    },
    goToNextForm() {
      const id = this.$route.params.id;
      if (id === "primary") {
        this.$router.push({
          name: "contact-form",
          params: { id: "secondary" },
        });
      } else if (id === "secondary") {
        this.$router.push({ name: "contact-form", params: { id: "contact" } });
      }
    },
    sendForm() {
      if (this.checkErrors()) {
        const url =
          "https://940b0ec3-8a38-4aae-9e22-fff37a53afca.mock.pstmn.io/message";
        console.log(this.dataToSend);
        this.axios
          .post(url, this.dataToSend)
          .then((response) => {
            if (response) {
              this.resetFields();
              this.$notify({
                group: "foo",
                title: SUCCESS_MESSAGE,
                type: "success",
              });
              this.goToNextForm();
            }
          })
          .catch((err) => {
            console.log(err);
            if (err) {
              this.$notify({
                group: "foo",
                title: ERROR_MESSAGE,
                type: "error",
              });
            }
          });
      } else {
        this.$notify({
          group: "foo",
          title: MESSAGE_REQUIRED_VALUES,
          type: "error",
        });
      }
    },
    changeAddress(newAddress) {
      this.address = newAddress;
    },
    resetFields() {
      this.name = "";
      this.email = "";
      this.subject = "";
      this.message = "";
      this.sex = "";
      this.address.city = "";
      this.address.street = "";
      this.address.houseNumber = "";
      this.address.apartmentNumber = "";
    },
  },
  computed: {
    dataToSend() {
      return {
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message,
        sex: this.sex,
        address: this.address,
      };
    },
  },
  directives: {
    info: {
      bind: function (el) {
        alert(el.innerHTML);
      },
    },
  },
};
</script>
