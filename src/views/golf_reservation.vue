<template>
  <div class="container my-calendar">
    <!-- Calendar Header -->
    <div class="calendar-header">
      <button @click="previousMonth">‹</button>
      <h2>{{ monthName }}</h2>
      <button @click="nextMonth">›</button>
    </div>

    <!-- Days of the Week -->
    <div class="days-of-week">
      <div v-for="(day, index) in daysOfWeek" :key="index">{{ day }}</div>
    </div>

  <!-- Dates in the Month -->
<div class="calendar-dates">
  <div v-for="(week, index) in weeks" :key="index" class="week">
    <div v-for="(day, index) in week" :key="index" class="day" :class="{ 'inactive': !isCurrentMonth(day.date) }">
      <div class="date-number" @click="fetchEvents(day.date)">{{ day.date.getDate() }}</div>
      <div class="remaining-events">
        잔여타임 : {{ 16 - (eventCounts[formatDate(day.date)]) }}
      </div>
    </div>
  </div>
</div>


    <!-- Event Details Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div v-for="event in selectedDayEvents" :key="event.id">
          <p>{{ event.details }}</p>
        </div>

        <!-- Time Buttons in Modal -->
        <div class="time-buttons">
          <button v-for="(slot, index) in selectedDayEvents" :key="index"
                  :class="{ 'disabled': slot.status === 'reserved' }"
                  :disabled="slot.status === 'reserved'"
                  @click="slot.status === 'available' && reserveTime(index + 1, slot)">
            {{ index + 1 }}타임: {{ slot.status === 'reserved' ? ' 불가' : '예약가능' }}
          </button>
        </div>
        <!-- Close Button -->
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'GolfReservation',
  data() {
    return {
      currentMonth: new Date(),
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      showModal: false,
      showReservationModal: false,
      selectedDayEvents: [],
      eventCounts: {},
      participantCount: null,
      selectedTimeSlot: null,
      reservationPrompt: '',
      formattedDate: '',  // formattedDate를 컴포넌트의 데이터로 저장
    };
  },
  computed: {
    monthName() {
      const options = { year: 'numeric', month: 'long' };
      return this.currentMonth.toLocaleDateString('en-US', options);
    },
    weeks() {
      const startDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
      const endDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
      const startWeekDay = startDay.getDay();
      let date = new Date(startDay);
      date.setDate(date.getDate() - startWeekDay);
      const weeks = [];
      while (date <= endDay || weeks.length < 6) {
        const week = [];
        for (let i = 0; i < 7; i++) {
          week.push({ date: new Date(date) });
          date.setDate(date.getDate() + 1);
        }
        weeks.push(week);
      }
      return weeks;
    },
    ...mapGetters([
      'getCurrentLoginId'
    ])
  },
  methods: {
    reserveTime(time) {
      const rsvDate = this.formattedDate;
      const memberId = this.$store.getters.getUserInfo[0].memberid;
      const rsvNum = time;
      console.log(rsvDate);
      console.log(memberId);
      console.log(rsvNum);
      axios.post('http://localhost:3000/reserve', {
        rsvnum: rsvNum,
        rsvdate: rsvDate,
        rsv_memberid: memberId
      }).then(response => {
        console.log('예약 성공:', response.data);
        // 예약 성공 알림
        const formattedReservationDate = this.formatDateToHumanReadable(this.formattedDate);
        alert(`${this.$store.getters.getUserInfo[0].memberid}님 ${formattedReservationDate}에 \n${time}타임 예약이 완료되었습니다.`);

        this.fetchEventCountsForVisibleDates();
      // 상태 업데이트
      // this.updateSlotStatusToReserved(time);
      // 모달을 다시 열기
      this.showModal = false;
      // this.showModal = true;
      }).catch(error => {
        console.error('예약 실패:', error);
      });
    },
     formatDateKey(date) {
    return date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);
  },

    
  formatDateToHumanReadable(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  },
    closeReservationModal() {
      this.showReservationModal = false;
      this.participantCount = null;  // Reset the input form
      this.showModal = true;  // Re-open the main modal if necessary
    },
    async makeReservation(rsvnum) {
      if (!this.participantCount) {
        alert('Please enter the number of participants.');
        return;
      }
      try {
        const response = await axios.post('http://localhost:3000/reservations/make', {
          rsvnum,
          participants: this.participantCount
        });
        alert(response.data.message);
        this.closeReservationModal();
      } catch (error) {
        console.error('Error making reservation:', error);
      }
    },
    previousMonth() {
      this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
      this.fetchEventCountsForVisibleDates();
    },
    nextMonth() {
      this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
      this.fetchEventCountsForVisibleDates();
    },
    isCurrentMonth(date) {
      return date.getMonth() === this.currentMonth.getMonth() && date.getFullYear() === this.currentMonth.getFullYear();
    },

    fetchEventCountsForVisibleDates() {
      this.weeks.forEach(week => {
        week.forEach(day => {
          if (this.isCurrentMonth(day.date)) {
            this.fetchEventsForDate(day.date);
          }
        });
      });
      
    },
    
    formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      // console.log([year, month, day].join(''))
      return [year, month, day].join('');
    },
    closeModal() {
      this.showModal = false;
    },
    async fetchEvents(date) {
      this.selectedDayEvents = [];
      const formattedDate = this.formatDate(date);
      this.formattedDate = formattedDate;
      console.log(this.formattedDate);

      try {
        const response = await axios.get(`http://localhost:3000/reservations?date=${formattedDate}`);
        const timeSlots = new Array(16).fill({ status: 'available', time: 'Unknown' });
        response.data.forEach(slot => {
          if (slot.rsvnum) {
            const timeIndex = parseInt(slot.rsvnum, 10) - 1;
            if (timeIndex >= 0 && timeIndex < 16) {
              timeSlots[timeIndex] = { status: 'reserved', time: slot.rsv_firsthalf_start || 'Reserved' };
            }
          }
        });
        this.selectedDayEvents = timeSlots;
        this.showModal = true;  // Open modal after data processing
      } catch ( error) {
        console.error('Error fetching event details:', error);
      }
    },
    async fetchEventsForDate(date) {
      const formattedDate = this.formatDate(date);
      try {
        const response = await axios.get(`http://localhost:3000/reservations?date=${formattedDate}`);
        this.eventCounts[formattedDate] = response.data.length;
        this.$set(this.eventCounts, formattedDate, response.data.length);  // Vue.set을 사용하여 반응성 유지
      } catch (error) {
        //console.error('Error fetching events for date:', formattedDate, error);
        //this.$set(this.eventCounts, formattedDate, 0);  // 에러 발생 시 이벤트 수를 0으로 설정
      }
  }
    
    // async fetchEventsForDate(date) {
    // const formattedDate = this.formatDate(date);
    // try {
    //   const response = await axios.get(`http://localhost:3000/reservations?date=${formattedDate}`);
    //   this.$set(this.eventCounts, formattedDate, response.data.length);  // Vue.set을 사용하여 반응성 유지
    // } catch (error) {
    //   console.error('Error fetching events for date:', formattedDate, error);
    //   this.$set(this.eventCounts, formattedDate, 0);  // 에러 발생 시 이벤트 수를 0으로 설정
    // }

    

  },
  created() {
    console.log('12345');
    this.fetchEventCountsForVisibleDates();

  }
}
</script>

<style scoped>
@import '@/assets/styles.css';
</style>