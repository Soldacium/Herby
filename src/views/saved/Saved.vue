<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import exampleResults from "../home-search/home/example-result";
import SearchResult from "../../shared/components/SearchResult.vue";
import { SavedCrestsService } from "../../shared/services/save.service";
import SectionSpacer from "../../shared/components/SectionSpacer.vue";
import ResultImage from "../../shared/models/result-image.model";
import ApiCrestData from "../../shared/models/api-crest-data.model";

const saved = SavedCrestsService.crests;
const searchQuery = ref("");
const searched: Ref<ApiCrestData[]> = ref([]);
onMounted(() => {
  search();
});

const search = () => {
  searched.value = saved.value.filter((save) =>
    save.name.toLowerCase().includes(searchQuery.value)
  );
};
</script>
<template>
  <div class="wrapper">
    <div class="search">
      <input type="text" @input="search()" v-model="searchQuery" />
      <img
        src="/src/shared/assets/icons/search.svg"
        alt=""
        class="search-icon"
      />
    </div>
    <SectionSpacer>Saved icons</SectionSpacer>
    <div class="saved-crests">
      <div class="crest" v-for="save in searched">
        <SearchResult :result="save"></SearchResult>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  padding: 6em 15%;
  min-height: 100vh;
}

.search {
  width: 100%;
  display: flex;
  // padding: 5em 3em;
  // border: 1px solid rgb(221, 221, 221);
  // background-color: rgb(248, 248, 248);

  position: relative;
  //box-shadow: 0 3px 5px 0 rgb(221, 221, 221);
  transition: 0.3s ease;
  overflow: hidden;

  &:hover {
    // box-shadow: 0 3px 5px 0 rgb(221, 221, 221);
  }

  input {
    width: 100%;
    display: flex;
    border: 1px solid var(--gray-medium);
    background-color: var(--color-white);
    transition: 0.2s ease;
    box-shadow: 0 0 8px transparent;
    padding: 0.6em 1.2em;
    font-size: 1.3em;
    outline: 1px solid transparent;
    border-radius: 10px;

    &:hover {
      // border-color: var(--color-primary);
      box-shadow: var(--box-shadow-medium);
    }

    &:active:hover {
      // border-color: var(--color-secondary);
      box-shadow: var(--box-shadow-medium);
    }

    &:focus {
      // outline: 1px solid gray;
      box-shadow: var(--box-shadow-medium);
    }
  }

  img {
    position: absolute;
    pointer-events: none;
    right: 20px;
    top: 50%;
    height: 1.5em;
    transform: translate(-0%, -50%);
  }
}

.saved-crests {
  display: flex;
  flex-wrap: wrap;
  .crest {
    flex: 1 1 15em;
    max-width: 16em;
    margin: 0.5em;
  }
}
</style>
