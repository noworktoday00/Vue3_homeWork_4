import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
//插入元件
import pagination from './pagination.js';
import updateModal from './updateModal.js';
import delProductModal from './delProductModal.js';

let productModal = {};
//卡關在這邊delProductModal因為import進來了所以重複了乾!!!
let delModal = {};

const apiUrl = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'vanmoritz';

const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: '',
            pagination:{},
        }
    },
    methods: {
        checkLogin() {
            //提取token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)vansToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common['Authorization'] = token;
            // console.log(token);
            const url = `${apiUrl}api/user/check`;
            axios.post(url)
                .then(res => {
                    // console.log(res);
                    this.getProducts()
                })
                .catch(err => {
                    alert(err.data.message);
                    window.location = '.login.html';
                })
        },
        getProducts(page = 1) { //參數預設值 沒有帶參數的時候參數會是undefined
            const url = `${apiUrl}api/${api_path}/admin/products/?page=${page}`; //"?"後面的就是query
            axios.get(url)
                .then(res => {
                    // console.log(res);
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                }).catch(err => {
                    alert(err.message);
                })
        },
        openModal(status, product) {
            console.log(status, product)
            if (status === 'addProduct') {
                this.tempProduct = {
                    imagesUrl: [],
                }
                this.isNew = true;
                productModal.show();
            } else if (status === 'editProduct') {
                //注意物件傳參考特性 要做展開淺拷貝
                this.tempProduct = { ...product };
                this.isNew = false;
                productModal.show();
            } else if (status === 'delProduct'){
                this.tempProduct = {...product};
                delModal.show();
            }
        },
        closeModal(status){
            if (status === 'editProduct') {
                productModal.hide();
            } else if (status === 'delProduct'){
                delModal.hide();
            }
        }
    },
    mounted() {
        this.checkLogin();
        productModal = new bootstrap.Modal(document.getElementById('productModal'));
        delModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    },
    components:{
        pagination,
        updateModal,
        delProductModal,
    }
})

    .mount('#app')