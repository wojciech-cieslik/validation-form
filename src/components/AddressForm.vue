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
        :value="this.address.city"
        @blur="changeAddress({ value: $event.target.value, name: 'city' })"
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
        :value="this.address.street"
        @blur="changeAddress({ value: $event.target.value, name: 'street' })"
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
        :value="this.address.houseNumber"
        @blur="
          changeAddress({ value: $event.target.value, name: 'houseNumber' })
        "
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
        :value="this.address.apartmentNumber"
        @blur="
          changeAddress({ value: $event.target.value, name: 'apartmentNumber' })
        "
      ></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
export default {
  props: {
    address: Object,
  },
  methods: {
    changeAddress(obj) {
      this.$emit("changeAddress", obj);
    },
  },
};
</script>
