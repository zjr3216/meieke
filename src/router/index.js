import Vue from 'vue'
import Router from 'vue-router'
const Layout = r => require.ensure([], () => r(require('../layout/Layout.vue')), 'layout')
const PersonCenter = r => require.ensure([], () => r(require('../views/PersonCenter/PersonCenter.vue')), 'personcenter')
const Home = r => require.ensure([], () => r(require('../views/Home/Home.vue')), 'home')
const BaseInfo = r => require.ensure([], () => r(require('../views/PersonCenter/BaseInfo.vue')), 'personcenter')
const UploadQRcode = r => require.ensure([], () => r(require('../views/PersonCenter/UploadQRcode.vue')), 'personcenter')
const Login = r => require.ensure([], () => r(require('../views/Login/Login.vue')), 'login')
const SimpleLogin = r => require.ensure([], () => r(require('../views/Login/SimpleLogin.vue')), 'login')
const CodeTemp = r => require.ensure([], () => r(require('../views/Temp/CodeTemp.vue')), 'temp')
const MemberVIP = r => require.ensure([], () => r(require('../views/PersonCenter/MemberVIP.vue')), 'personcenter')
const ImgTest = r => require.ensure([], () => r(require('../views/Test/ImgTest.vue')), 'test')
const PersonHome1 = r => require.ensure([], () => r(require('../views/PersonHome/PersonHome.vue')), 'personhome')
const ActivePage = r => require.ensure([], () => r(require('../views/PersonCenter/ActivePage.vue')), 'personcenter')
const Article1 = r => require.ensure([], () => r(require('../views/ArticlePage/Article1.vue')), 'personcenter')
const ClubInfo = r => require.ensure([], () => r(require('../views/PersonCenter/ClubInfo.vue')), 'personcenter')
const ClubT = r => require.ensure([], () => r(require('../views/PersonCenter/ClubT.vue')), 'personcenter')
const ClubA = r => require.ensure([], () => r(require('../views/PersonCenter/ClubA.vue')), 'personcenter')

const PosterCenter1 = r => require.ensure([], () => r(require('../views/PosterCenter/TJPoster.vue')), 'poster')
const PosterCenter2 = r => require.ensure([], () => r(require('../views/PosterCenter/PosterClass.vue')), 'poster')
const PosterList = r => require.ensure([], () => r(require('../views/PosterCenter/PosterClassList.vue')), 'poster')
const PosterPreview = r => require.ensure([], () => r(require('../views/PosterCenter/PosterPreview.vue')), 'poster')
const ViedoPage = r => require.ensure([], () => r(require('../views/ViedoPage/ViedoPage.vue')), 'viedo')
const ArticlePage = r => require.ensure([], () => r(require('../views/ArticlePage/ArticlePage.vue')), 'article')

const Templat1 = r => require.ensure([], () => r(require('../views/Templat/Templat1.vue')), 'poster')
const Templat2 = r => require.ensure([], () => r(require('../views/Templat/Templat2.vue')), 'poster')
const Templat3 = r => require.ensure([], () => r(require('../views/Templat/Templat3.vue')), 'poster')
const Templat4 = r => require.ensure([], () => r(require('../views/Templat/Templat4.vue')), 'poster')

const PosterMain = r => require.ensure([], () => r(require('../views/PosterCenter/PosterMain.vue')), 'poster')
const Info2 = r => require.ensure([], () => r(require('../views/PersonCenter/Info.vue')), 'personcenter')
const AboutMe = r => require.ensure([], () => r(require('../views/PersonCenter/AboutMe.vue')), 'personcenter')
const P404 = r => require.ensure([], () => r(require('../views/BUGPage/P404.vue')), 'bug')
const P500 = r => require.ensure([], () => r(require('../views/BUGPage/P500.vue')), 'bug')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/simplelogin',
      children: [
        {
          path: '/person',
          name: 'personcenter',
          component: PersonCenter
        },
        {
          path: '/home',
          name: 'Home',
          component: Home
        }
      ]
    },
    {
      path: '/person/baseinfo',
      name: 'BaseInfo',
      component: BaseInfo
    },
    {
      path: '/person/uploadQrCode/:code',
      name: 'UploadQRcode',
      component: UploadQRcode
    },
    {
      path: '/membervip',
      name: 'MemberVIP',
      component: MemberVIP
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/simplelogin',
      name: 'SimpleLogin',
      component: SimpleLogin
    },
    {
      path: '/temp',
      name: 'CodeTemp',
      component: CodeTemp
    },
    {
      path: '/imgtest',
      name: 'ImgTest',
      component: ImgTest
    },
    {
      path: '/person/personhome/:userid',
      name: 'PersonHome',
      component: PersonHome1
    },
    {
      path: '/postercenter/tj',
      name: 'PosterCenter1',
      component: PosterCenter1
    },
    {
      path: '/postercenter/class',
      name: 'PosterCenter2',
      component: PosterCenter2
    },
    {
      path: '/postercenter/class/:classname',
      name: 'PosterList',
      component: PosterList
    },
    {
      path: '/postercenter/preview/:posterid',
      name: 'PosterPreview',
      component: PosterPreview
    },
    {
      path: '/poster/templat1/:posterid/userid/:userid',
      name: 'Templat1',
      component: Templat1
    },
    {
      path: '/poster/templat2/:posterid/userid/:userid',
      name: 'Templat2',
      component: Templat2
    },
    {
      path: '/poster/templat3/:posterid/userid/:userid',
      name: 'Templat3',
      component: Templat3
    },
    {
      path: '/poster/templat4/:posterid/userid/:userid',
      name: 'Templat4',
      component: Templat4
    },
    {
      path: '/poster/mian/:posterid/userid/:userid',
      name: 'PosterMain',
      component: PosterMain
    },
    {
      path: '/viedo',
      name: 'ViedoPage',
      component: ViedoPage
    },
    {
      path: '/article',
      name: 'ArticlePage',
      component: ArticlePage
    },
    {
      path: '/person/active',
      name: 'ActivePage',
      component: ActivePage
    },
    {
      path: '/article/:id/userid/:userid',
      name: 'Active1',
      component: Article1
    },
    {
      path: '/person/clubinfo',
      name: 'ClupInfo',
      component: ClubInfo
    },
    {
      path: '/person/clubT',
      name: 'ClubT',
      component: ClubT
    },
    {
      path: '/person/clubA',
      name: 'ClubA',
      component: ClubA
    },
    {
      path: '/person/wsinfo',
      name: 'Info2',
      component: Info2
    },
    {
      path: '/person/about',
      name: 'AboutMe',
      component: AboutMe
    },
    {
      path: '/bug/p404',
      name: 'P404',
      component: P404
    },
    {
      path: '/bug/p500',
      name: 'P500',
      component: P500
    }
  ]
})
