<template>
  <el-footer height="unset">
    <div class="container-info-service">
      <div class="about-web">
        <div class="title-service">
          <h4>về chúng tôi</h4>
        </div>
        <div class="content">
          <h5>CÔNG TY CP XNK MÔ HÌNH QUANG 10 NGÓN</h5>
          <p>Văn phòng : 43 Lê Thị Hồng, P 17, Quận Gò Vấp, TPHCM</p>
          <p>ĐT : (077) 51 95 882</p>
          <p>Websites : <a href="">gundambienhoa.vn</a></p>
        </div>
      </div>
      <div class="info-web">
        <div class="title-service">
          <h4>thông tin</h4>
        </div>
        <div class="content">
          <a href="">CHÍNH SÁCH BẢO MẬT THÔNG TIN </a>
          <a href="">CHÍNH SÁCH CHUNG</a>
          <a href="">THÀNH VIÊN THÀNH LẬP</a>
        </div>
      </div>
      <div class="contact-web">
        <div class="title-service">
          <h4>liên hệ</h4>
        </div>
        <div class="content">
          <a href="#" class="fa fa-facebook"></a>
          <a href="#" class="fa fa-twitter"></a>
          <a href="#" class="fa fa-google"></a>
          <a href="#" class="fa fa-linkedin"></a>
          <a href="#" class="fa fa-youtube"></a>
          <a href="#" class="fa fa-instagram"></a>
        </div>
      </div>
    </div>

    <div class="container-footer">
      <p>
        Copyright ©2021 All rights reserved | This template is made with
        <i class="far fa-heart"></i> by <span>QUANG MƯỜI NGÓN</span>
      </p>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.el-footer {
  padding: unset !important;
}

/* line 307, home.scss */
.container-info-service {
  width: inherit;
  display: flex;
  justify-content: space-around;
  padding: 30px 0px;
}
/* line 313, home.scss */
.container-info-service .about-web .content {
  font-style: italic;
}
/* line 315, home.scss */
.container-info-service .about-web .content h5 {
  font-size: 16px;
}
/* line 319, home.scss */
.container-info-service .about-web .content p a {
  display: inline-block;
}
/* line 328, home.scss */
.container-info-service .contact-web .content {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 5px;
}
/* line 332, home.scss */
.container-info-service .contact-web .content .fa {
  padding: unset;
  line-height: 50px;
  height: 50px;
  font-size: 30px;
  width: 50px;
  text-align: center;
  text-decoration: none;
}
/* line 342, home.scss */
.container-info-service .contact-web .content .fa:hover {
  opacity: 0.7;
}
/* line 346, home.scss */
.container-info-service .contact-web .content .fa-facebook {
  background: #3b5998;
  color: white;
}
/* line 351, home.scss */
.container-info-service .contact-web .content .fa-twitter {
  background: #55acee;
  color: white;
}
/* line 356, home.scss */
.container-info-service .contact-web .content .fa-google {
  background: #dd4b39;
  color: white;
}
/* line 361, home.scss */
.container-info-service .contact-web .content .fa-linkedin {
  background: #007bb5;
  color: white;
}
/* line 366, home.scss */
.container-info-service .contact-web .content .fa-youtube {
  background: #bb0000;
  color: white;
}
/* line 370, home.scss */
.container-info-service .contact-web .content .fa-instagram {
  background: #125688;
  color: white;
}

.content a {
  display: block;
  padding: 5px;
  color: #2f8dd2;
}

.title-service {
  padding: 10px 0px;
}
.title-service h4 {
  text-transform: uppercase;
  font-weight: 500;
  border-bottom: 2px solid #495057;
}

.container-footer {
  border-top: 3px solid #30698c;
  width: 100%;
  background-color: unset;
  padding: 30px;
}
.container-footer p {
  text-align: center;
  font-size: 15px;
  color: #596672;
  font-weight: 500;
}
.container-footer p span {
  color: #e83030;
  font-weight: 550;
}
</style>
