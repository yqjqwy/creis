<template>
  <div>
    <p>
      Here is the demo of vue-fullcalendar, no jquery fullcalendar.js required!
    </p>
    <full-calendar class="test-fc" :events="fcEvents" first-day='1' locale="fr" @changeMonth="changeMonth" @eventClick="eventClick" @dayClick="dayClick" @moreClick="moreClick">
      <template slot="fc-event-card" scope="p">
        <p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>
      </template>
    </full-calendar>
  </div>
</template>
<script>
let demoEvents = [
  {
    title: '测试1',
    start: '2018-10-01',
    end: '2018-10-01',
    cssClass: 'family'
  },
  {
    title: '测试2',
    start: '2018-10-02',
    end: '2018-10-03',
    cssClass: ['home', 'work']
  },
  {
    title: '测试3',
    start: '2018-10-04',
    end: '2018-10-05'
  },
  {
    title: '测试4',
    start: '2018-10-06',
    end: '2018-10-07'
  },
  {
    title: '测试5',
    start: '2018-10-08',
    end: '2018-10-09'
  },
  {
    title: '测试6',
    start: '2018-10-10',
    end: '2018-10-11'
  },
  {
    title: '测试7',
    start: '2018-10-12',
    end: '2018-10-13'
  },
  {
    title: '测试8',
    start: '2018-10-14',
    end: '2018-10-15'
  },
  {
    title: '测试9',
    start: '2018-10-16',
    end: '2018-10-17'
  }
];

export default {
  data() {
    return {
      name: 'Sunny!',
      fcEvents: demoEvents
    };
  },
  methods: {
    changeMonth(start, end, current) {
      console.log('changeMonth', start, end, current);
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos);
    },
    dayClick(day, jsEvent) {
      console.log('dayClick', day, jsEvent);
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent);
    }
  },
  components: {
    'full-calendar': require('vue-fullcalendar')
    // 'full-calendar': require('./vue-fullcalendar')
  }
};
</script>