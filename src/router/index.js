import Router from 'vue-router';
import ContactForm from '../components/ContactForm.vue'
import NotFound from '../components/NotFound'

let router = new Router({
  routes:[
    {
      path: '/',
      redirect: '/contact-form/1',
    },
    {
      path: '/contact-form/:id?',
      name: 'ContactForm',
      component: ContactForm,
    },
   {
    path: '*',
    component: NotFound
   },
  ]
})

export default router;