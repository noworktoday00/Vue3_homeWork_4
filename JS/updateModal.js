export default {
    props:['tempProduct','isNew'],
    template:`  <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">
                        <span v-if="isNew === true">新增產品</span>
                        <span v-else>編輯產品</span>
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-sm-4">
                          <div class="mb-3">
                            <label for="imageUrl" class="form-label">主圖網址</label>
                            <input
                              type="text"
                              class="form-control mb-2"
                              v-model="tempProduct.imageUrl"
                              placeholder="請輸入圖片連結"
                            />
                            <img class="img-fluid" :src="tempProduct.imageUrl" />
                          </div>
                          <div class="mb-3">
                            <h3>多圖設置</h3>
                            <!-- 判斷是否是一個陣列 -->
                            <div v-if="Array.isArray(tempProduct.imagesUrl)">
                              <div
                                v-for="(img,key) in tempProduct.imagesUrl"
                                :key="key+'1'"
                              >
                                <div class="row">
                                  <div class="col-md-9">
                                    <input
                                      type="text"
                                      class="form-control mb-2"
                                      v-model="tempProduct.imagesUrl[key]"
                                      placeholder="請輸入圖片連結"
                                    />
                                  </div>
                                  <div class="col-md-3">
                                    <button
                                      class="btn btn-outline-danger"
                                      @click="tempProduct.imagesUrl.splice([key],1)"
                                    >
                                      取消
                                    </button>
                                  </div>
                                </div>

                                <img
                                  class="img-fluid mb-3"
                                  :src="tempProduct.imagesUrl[key]"
                                />
                              </div>
                              <button
                                v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length -1]"
                                class="btn btn-outline-dark w-100"
                                @click="tempProduct.imagesUrl.push('')"
                              >
                                新增
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-8">
                          <div class="mb-3">
                            <label for="title" class="form-label">標題</label>
                            <input
                              id="title"
                              v-model="tempProduct.title"
                              type="text"
                              class="form-control"
                              placeholder="請輸入標題"
                            />
                          </div>
                          <div class="row">
                            <div class="mb-3 col-md-6">
                              <label for="origin_price" class="form-label">原價</label>
                              <!-- 這邊要記得，要幫v-model加上數字型別!!! -->
                              <input
                                id="origin_price"
                                v-model.number="tempProduct.origin_price"
                                type="number"
                                class="form-control"
                                placeholder="請輸入原價"
                              />
                            </div>
                            <div class="mb-3 col-md-6">
                              <label for="price" class="form-label">售價</label>
                              <!-- 這邊也要記得，v-model要加上數字型別啊!!! -->
                              <input
                                id="price"
                                v-model.number="tempProduct.price"
                                type="number"
                                class="form-control"
                                placeholder="請輸入售價"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div class="mb-3 col-md-6">
                              <label for="category" class="form-label">分類</label>
                              <input
                                id="category"
                                v-model="tempProduct.category"
                                type="text"
                                class="form-control"
                                placeholder="請輸入分類"
                              />
                            </div>
                            <div class="mb-3 col-md-6">
                              <label for="unit" class="form-label">單位</label>
                              <input
                                id="unit"
                                v-model="tempProduct.unit"
                                type="text"
                                class="form-control"
                                placeholder="請輸入單位"
                              />
                            </div>
                          </div>
                          <div class="mb-3">
                            <label for="description" class="form-label">產品描述</label>
                            <input
                              id="description"
                              v-model="tempProduct.description"
                              type="text"
                              class="form-control"
                              placeholder="商品描述..."
                            />
                          </div>
                          <div class="mb-3">
                            <label for="content" class="form-label">說明內容</label>
                            <input
                              id="content"
                              v-model="tempProduct.content"
                              type="text"
                              class="form-control"
                              placeholder="內容說明..."
                            />
                          </div>
                          <div class="mb-3">
                            <div class="form-check">
                              <input
                                id="is_enabled"
                                v-model="tempProduct.is_enabled"
                                class="form-check-input"
                                type="checkbox"
                                :true-value="1"
                                :false-value="0"
                              />
                              <label class="form-check-label" for="is_enabled"
                                >是否啟用</label
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        data-bs-dismiss="modal"
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        @click="updateProduct"
                      >
                        確定
                      </button>
                    </div>
                  </div>
                </div>`,
    methods:{
      updateProduct() {
        //把新增&編輯合併起來
        const apiUrl = 'https://vue3-course-api.hexschool.io/v2/';
        const api_path = 'vanmoritz';
        let url = `${apiUrl}api/${api_path}/admin/product`;
        let method = 'post';
        //判斷為新增/編輯
        if (!this.isNew) {
            url = `${apiUrl}api/${api_path}/admin/product/${this.tempProduct.id}`;
            method = 'put';
        }
        axios[method](url, { data: this.tempProduct })
            .then(res => {
                console.log(res);
                // this.getProducts(); 這個函式不在元件裡面，要想辦法連接外部哦~
                this.$emit('get-products');
                alert(res.data.message);
                this.$emit('close-modal');
            }).catch(err => {
                alert(err.message);
            })
      },
    },
  mounted(){
  }
};