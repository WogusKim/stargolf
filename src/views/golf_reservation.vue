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
              잔여타임 : {{ 16 - (eventCounts[formatDate(day.date)] || 0) }}
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
    <button 
      v-for="(slot, index) in selectedDayEvents" 
      :key="index"
      :class="{ 'disabled': slot.status === 'reserved' }"
      :disabled="slot.status === 'reserved'"
      @click="slot.status === 'available' && handleTimeClick(index + 1)"
    >
      {{ index + 1 }}타임: {{ slot.status === 'reserved' ? '예약불가' : '예약가능' }}
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
  export default {
    data() {
      return {
        currentMonth: new Date(),
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        showModal: false,
        selectedDayEvents: [],
        eventCounts: {}
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
            week.push({
              date: new Date(date),
            });
            date.setDate(date.getDate() + 1);
          }
          weeks.push(week);
        }
        return weeks;
      }
    },
    methods: {
      handleTimeClick(time) {
      console.log(`타임 ${time} 버튼이 클릭되었습니다.`);
      // 여기에 버튼 클릭시 수행할 로직을 추가하세요.
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
  
      async fetchEventsForDate(date) {
        const formattedDate = this.formatDate(date);
        try {
          const response = await axios.get(`http://localhost:3000/reservations?date=${formattedDate}`);
          this.eventCounts[formattedDate] = response.data.length;
        } catch (error) {
          console.error('Error fetching events for date:', formattedDate, error);
        }
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
  
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
  
        return [year, month, day].join('');
      },
  
      closeModal() {
        this.showModal = false;
      },
  
      async fetchEvents(date) {
    this.selectedDayEvents = [];  // 초기화
    const formattedDate = this.formatDate(date);
    try {
      const response = await axios.get(`http://localhost:3000/reservations?date=${formattedDate}`);
      const timeSlots = new Array(16).fill({ status: 'available', time: 'Unknown' });
  
      response.data.forEach(slot => {
        if (slot.rsvnum) { // Assuming the presence of rsvnum indicates reservation
          const timeIndex = parseInt(slot.rsvnum, 10) - 1;
          if (timeIndex >= 0 && timeIndex < 16) {
            timeSlots[timeIndex] = { status: 'reserved', time: slot.rsv_firsthalf_start || 'Reserved' };
          }
        }
      });
  
      this.selectedDayEvents = timeSlots; // Store processed time slots
      this.showModal = true;  // Open modal after data processing
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  },
  
    },
    created() {
      this.fetchEventCountsForVisibleDates();
    }
  }
  </script>
  
  <style scoped>
  @import '@/assets/styles.css';
  </style>