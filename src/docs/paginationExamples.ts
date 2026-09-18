export const paginationExamples = {
  basic: '<AppPagination v-model="page" :total-items="120" :page-size="10" />',
  siblings: '<AppPagination v-model="page" :total-items="400" :sibling-count="2" />',
  compact: '<AppPagination v-model="page" :total-items="48" :show-edges="false" />',
  interactive: '<AppPagination v-model="page" :total-items="totalItems" :page-size="pageSize" :sibling-count="siblings" :show-edges="showEdges" :disabled="disabled" @change="handlePageChange" />',
} as const
