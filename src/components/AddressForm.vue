<template>
  <div class="address-form">
    <b-input-group class="label-form">
      <template #prepend>
        <b-input-group-text>City</b-input-group-text>
      </template>
      <b-form-input
        type="text"
        id="form-city"
        placeholder="Enter city"
        v-model="newAddress.city"
        @blur="changeAddress"
      ></b-form-input>
    </b-input-group>

    <b-input-group class="label-form">
      <template #prepend>
        <b-input-group-text>Street</b-input-group-text>
      </template>
      <b-form-input
        type="text"
        id="form-street"
        placeholder="Enter street"
        v-model="newAddress.street"
        @blur="changeAddress"
      ></b-form-input>
    </b-input-group>

    <b-input-group class="label-form">
      <template #prepend>
        <b-input-group-text>House Number</b-input-group-text>
      </template>
      <b-form-input
        type="number"
        min="1"
        id="form-house-number"
        placeholder="Enter house number"
        v-model="newAddress.houseNumber"
        @blur="changeAddress"
      ></b-form-input>
    </b-input-group>

    <b-input-group class="label-form">
      <template #prepend>
        <b-input-group-text>Apartment Number</b-input-group-text>
      </template>
      <b-form-input
        type="number"
        min="1"
        id="form-apartment-number"
        placeholder="Enter apartment number"
        v-model="newAddress.apartmentNumber"
        @blur="changeAddress"
      ></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
export default {
  props: {
    address: Object,
  },
  data() {
    return {
      newAddress: this.address,
    };
  },
  methods: {
    changeAddress() {
      this.$emit("changeAddress", this.address);
    },
  },
};
</script>
