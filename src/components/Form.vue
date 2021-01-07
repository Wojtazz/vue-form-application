<template>
  <form class="form" @submit="checkForm">
    <div class="outsideDiv">
      <div class="section">
        <h3 class="sectionTitle">About</h3>
        <hr class="lineBreak" />
        <div class="formGrid">
          <label class="inputLabel customFont"
            >TITLE <span class="requiredMark">*</span></label
          >
          <span class="fieldSet">
            <input
              v-model="formData.title"
              class="formInput customBorder"
              type="text"
              placeholder="Make it short and clear"
            />
            <ErrorMessage :message="this.errors.title"></ErrorMessage>
          </span>
          <label class="inputLabel customFont"
            >DESCRIPTION <span class="requiredMark">*</span></label
          >
          <div>
            <span class="fieldSet">
              <textarea
                v-model="formData.description"
                maxlength="140"
                class="textfieldInput hintAlign customBorder"
                type="text"
                placeholder="Write about your event, be creative"
              />
              <ErrorMessage :message="this.errors.description"></ErrorMessage>
            </span>

            <div class="hintWrapper">
              <p style="float: left" class="hintParagraph">
                <i>Max length 140 characters</i>
              </p>
              <p style="float: right" class="hintParagraph">
                <i>{{ charactersLeft }}/140</i>
              </p>
            </div>
          </div>
          <label class="inputLabel customFont">CATEGORY</label>
          <div>
            <select
              class="selectInput hintAlign customBorder"
              :options="categories"
              @change="setCategoryId($event.target.selectedIndex)"
            >
              <option value="" disabled selected hidden>
                Select category (skills, interests, locations)
              </option>
              <option v-for="(row, index) in categories" v-bind:key="index">
                {{ row.name }}
              </option>
            </select>
            <p style="float: left" class="hintParagraph">
              <i
                >Describes topic and people who should be interested in this
                event
              </i>
            </p>
          </div>
          <label class="inputLabel customFont">PAYMENT</label>
          <span>
            <label class="radioLabel customFont"
              ><input
                v-model="selected"
                type="radio"
                id="free"
                name="payment"
                value="free"
                checked
              />
              Free event</label
            >
            <label class="radioLabel customFont">
              <input
                v-model="selected"
                type="radio"
                id="paid"
                name="payment"
                value="paid"
              />
              Paid event</label
            >
            <span v-if="selected === 'paid'">
              <label class="marginLabel customFont"
                ><input
                  v-model="formData.event_fee"
                  class="feeInput customBorder"
                  type="text"
                  placeholder="Fee"
                />
                $</label
              >
              <ErrorMessage :message="this.errors.fee"></ErrorMessage>
            </span>
          </span>
          <label class="inputLabel customFont">REWARD</label>
          <span>
            <input
              v-model="formData.reward"
              class="numberInput customBorder"
              type="text"
              placeholder="Number"
            />
            <label class="customFont marginLabel">
              reward points for attendance</label
            >
            <ErrorMessage :message="this.errors.reward"></ErrorMessage>
          </span>
        </div>
      </div>
    </div>
    <div class="outsideDiv">
      <div class="section">
        <h3 class="sectionTitle">Coordinator</h3>
        <hr class="lineBreak" />
        <div class="formGrid">
          <label class="inputLabel customFont"
            >RESPONSIBLE <span class="requiredMark">*</span></label
          >
          <select
            class="selectInput customBorder"
            :options="employes"
            @change="setEmployeeId($event.target.selectedIndex)"
            required
          >
            <option value="me" disabled>Me</option>
            <template v-for="(row, index) in employes">
              <option
                class="employeeOption"
                v-if="index === 3"
                v-bind:key="index"
                selected
              >
                {{ row.name + " " + row.lastname }}
              </option>
            </template>
            <option value="others" disabled>Others</option>
            <template v-for="(row, index) in employes">
              <option
                class="employeeOption"
                v-if="index !== 3"
                v-bind:key="index"
              >
                {{ row.name + " " + row.lastname }}
              </option>
            </template>
          </select>
          <label class="inputLabel customFont">EMAIL</label>
          <span class="fieldSet">
            <input
              v-model="formData.coordinator.email"
              class="formInput customBorder"
              type="text"
              placeholder="Email"
            />
            <ErrorMessage :message="this.errors.email"></ErrorMessage>
          </span>
        </div>
      </div>
    </div>
    <div class="outsideDiv">
      <div class="section">
        <h3 class="sectionTitle">When</h3>
        <hr class="lineBreak" />
        <div class="formGrid">
          <label class="inputLabel customFont"
            >STARTS ON <span class="requiredMark">*</span></label
          >
          <span>
            <input
              v-model="eventDate"
              class="dataInput customBorder"
              type="text"
              placeholder="dd/mm/yyyy"
            />
            <label class="customFont">at</label>
            <input
              v-model="eventTime"
              class="timeInput customBorder"
              type="text"
              placeholder="--;--"
            />
            <label class="customFont"
              ><input
                v-model="timeType"
                type="radio"
                id="am"
                name="timeAM"
                value="am"
                checked
              />
              AM</label
            >
            <label class="customFont marginLabel">
              <input
                v-model="timeType"
                type="radio"
                id="pm"
                name="timePM"
                value="pm"
              />
              PM</label
            >
            <ErrorMessage :message="this.errors.eventDate"></ErrorMessage>
            <ErrorMessage
              id="eventDateTime"
              v-show="!this.errors.eventDate"
              :message="this.errors.eventTime"
            ></ErrorMessage>
          </span>
          <label class="inputLabel customFont">DURATION</label>
          <span>
            <input
              v-model="formData.duration"
              class="numberInput customBorder"
              type="text"
              placeholder="Number"
            />
            <label class="customFont marginLabel"> hour</label>
            <ErrorMessage :message="this.errors.duration"></ErrorMessage>
          </span>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <input type="submit" class="button submitButton" value="PUBLISH EVENT" />
    </div>
  </form>
</template>
<script>
import categories from "../mocks/categories.json";
import employes from "../mocks/employes.json";
import { checkForm } from "../validation/form-validation.js";
import ErrorMessage from "./ErrorMessage.vue";
export default {
  components: { ErrorMessage },
  data() {
    return {
      loggedUserId: 3,
      paidEvent: false,
      selected: "free",
      categories: categories,
      employes: employes,
      eventDate: "",
      eventTime: "",
      timeType: "am",
      errors: [],
      formData: {
        title: "",
        description: "",
        category_id: "",
        paid_event: false,
        event_fee: "",
        reward: "",
        date: "", // format: YYYY-MM-DDTHH:mm (example: 2018-01-19T15:15)
        duration: "", // in seconds
        coordinator: {
          email: "",
          id: 3,
        },
      },
      selectedEmployee: "",
    };
  },
  methods: {
    setCategoryId(selectedIndex) {
      this.formData.category_id = selectedIndex - 1;
    },
    setEmployeeId(selectedIndex) {
      this.formData.coordinator.id = selectedIndex;
    },
    setEventType() {
      if (this.selected === "paid") {
        this.formData.paid_event = true;
      } else {
        this.formData.paid_event = false;
      }
    },
    parseData() {
      let hours = Number(this.eventTime.match(/^(\d+)/)[1]);
      let minutes = Number(this.eventTime.match(/;(\d+)/)[1]);
      if (this.timeType === "pm") {
        hours += 12;
      }
      this.formData.date =
        this.eventDate.split("/").reverse().join("-") +
        "T" +
        hours +
        ":" +
        minutes;
    },
    checkForm(e) {
      e.preventDefault();
      this.setEventType();
      this.errors = checkForm(this.formData, this.eventDate, this.eventTime);
      if (Object.keys(this.errors).length === 0) {
        this.parseData();
        this.$router.push({
          name: "success",
          params: {
            formData: this.formData,
          },
        });
      }
    },
  },
  watch: {
    selected: function (val) {
      if (val === "paid") {
        this.formData.event_fee = "";
      }
    },
  },
  computed: {
    charactersLeft() {
      let char = this.formData.description.length;
      return char;
    },
  },
};
</script>

<style src="../styles/form.css">
</style>
