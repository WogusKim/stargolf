<template>
  <div>
    <main class="membership-main">
      <section class="membership-banner">
        <!-- 배너 추가 -->
        <div class="membership-banner"></div>
        <!-- Notice 제목 추가 -->
        <h1 class="notice-title">Notice</h1>
      </section>
    </main>
    <div class="golf-feedback-container">
      <div class="search-container">
        <input v-model="searchQuery" placeholder="Search posts..." class="search-box"/>
        <button @click="searchPosts">Search</button>
        <button @click="resetSearch">Reset</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성시간</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in filteredPosts" :key="post.id">
            <td>{{ post.category }}</td>
            <td @click="openModal(post)">{{ post.title }}</td>
            <td>{{ post.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 모달 창 -->
    <div v-if="selectedPost" class="modal">
      <div class="modal-content">
        <h3>{{ selectedPost.title }}</h3>
        <p>{{ selectedPost.content }}</p>
        <button @click="selectedPost = null">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'golf-feedback',
  data() {
    return {
      searchQuery: '',
      selectedPost: null,
      posts: [
        { id: 1, category: '공지사항', title: '새로운 코스 오픈', time: '2024-04-01', content: '새로운 골프 코스를 오픈했어요~!' },
        { id: 2, category: '이벤트', title: '2024 봄 골프 토너먼트 대회 개최', time: '2024-03-25', content: '라베의 주인공은 누가 될까요?' },
        { id: 3, category: '프로모션', title: '봄 시즌 20% 할인', time: '2024-03-10', content: '회원권이 없으셔도 20% 할인은 동일하게 적용됩니다.' },
        { id: 4, category: '경기 일정', title: '여름 챔피언십 일정 공지', time: '2023-06-15', content: '여름 챔피언십 대회의 일정이 확정되었습니다. 모든 참가자는 대회 3일 전까지 등록을 완료해 주시기 바랍니다.' },
        { id: 5, category: '이벤트', title: '어린이 골프 클리닉 개최', time: '2023-05-20', content: '어린이들을 위한 골프 클리닉을 개최합니다. 골프를 처음 접하는 어린이들도 쉽게 참여할 수 있는 프로그램입니다.' },
        { id: 6, category: '공지사항', title: '회원 전용 라운지 개장', time: '2023-05-01', content: '새로운 회원 전용 라운지가 개장합니다. 편안한 휴식과 다양한 편의 시설을 이용할 수 있습니다.' },
        { id: 7, category: '프로모션', title: '가을 시즌 선수권 대회 참가자 모집', time: '2023-03-05', content: '가을 시즌을 맞이하여 선수권 대회 참가자를 모집합니다. 모든 참가자에게는 특별 기념품을 제공합니다.' },
        { id: 8, category: '공지사항', title: '골프 카트 이용 규정 변경', time: '2023-01-22', content: '골프 카트 이용 규정이 변경되었습니다. 모든 이용객은 변경된 규정을 확인하시기 바랍니다.' },
        { id: 9, category: '공지사항', title: '시설 개선 작업 공지', time: '2023-01-10', content: '시설 개선을 위한 작업이 진행될 예정입니다. 이용에 불편을 드려 죄송합니다.' },
        { id: 10, category: '유지보수', title: '유지보수로 인한 코스 임시 폐쇄 안내', time: '2023-01-02', content: '러프 가꾸기'}
      ],
      filteredPosts: []
    };
  },
  mounted() {
    this.filteredPosts = this.posts;
  },
  methods: {
    searchPosts() {
      this.filteredPosts = this.posts.filter(post => post.title.includes(this.searchQuery));
    },
    resetSearch() {
      this.searchQuery = '';
      this.filteredPosts = this.posts;
    },
    openModal(post) {
      this.selectedPost = post;
    }
  }
};
</script>
<style scoped>
.membership-banner {
  background-image: url('@/assets/image/feedback.jpg');
  background-attachment: fixed; /* 배경 이미지를 스크롤 시 고정 */
  background-size: cover;
  background-position: center;
  height: 50vh;
}

.membership-main {
  text-align: center;
  color: #333;
  padding: 20px;
}

.notice-title {
  text-align: center;
  font-size: 2em;
  margin: 40px 0; /* 적절한 간격 조정 */
  
}

.golf-feedback-container {
  margin: 20px;
  padding: 70px;
}

.search-container {
  text-align: right;
  margin-bottom: 10px;
}

.search-box, button {
  padding: 5px;
  margin-right: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #f4f4f4;
  text-align: center; /* 컬럼 이름 가운데 정렬 */
}

td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  cursor: pointer; /* 커서를 포인터로 변경 */
}

td:hover {
  background-color: #f4f4f4; /* 호버 효과 추가 */
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px; /* 최대 너비 설정 */
}

.modal-content h3 {
  margin-top: 0; /* 상단 마진 제거 */
  margin-bottom: 20px; /* 제목 아래 마진 추가 */
  font-size: 24px; /* 제목 글자 크기 */
}

.modal-content p {
  margin-top: 0; /* 상단 마진 제거 */
  margin-bottom: 20px; /* 본문 아래 마진 추가 */
  font-size: 16px; /* 본문 글자 크기 */
  line-height: 1.5; /* 줄 간격 */
}

.button {
  margin-top: 20px; /* 버튼 상단 마진 추가 */
  padding: 10px 20px; /* 버튼 패딩 */
  border: none; /* 테두리 제거 */
  background-color: #007BFF; /* 배경색 */
  color: white; /* 글자색 */
  cursor: pointer; /* 커서 변경 */
  border-radius: 5px; /* 테두리 둥글게 */
}

.button:hover {
  background-color: #0056b3; /* 호버 시 배경색 변경 */
}
</style>
