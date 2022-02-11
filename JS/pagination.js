
export default {
  //props連接用的部分
  props: ['pages'],
  template:
    `<nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"
          :class="{'disabled': !pages.has_pre}"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getProducts(pages.current_page - 1)"
            >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" 
            :class="{active: page === pages.current_page}" 
            v-for="page in pages.total_pages" 
            :key="page+'13'"
        >
          <a class="page-link" 
              href="#" 
              @click.prevent="$emit('get-products',page)" >
              {{page}}
          </a>
        </li>
        <li class="page-item"
            :class="{'disabled': !pages.has_next}"
        >
          <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="getProducts(pages.current_page + 1)"
          >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
      </ul>
    </nav>`,
  methods: {
    getProducts(item) {
      this.$emit('get-products',item);
    }
  },
}
