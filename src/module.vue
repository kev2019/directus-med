<template>
  <private-view :title="$tc('Analytics', 2)">
    <template #title-outer:prepend>
      <v-button class="header-icon" rounded disabled icon secondary>
        <v-icon name="insert_chart_outlined" />
      </v-button>
    </template>
    <h1>{{ title }}</h1>
    <template>
      <v-input v-model="title">
        <template #prepend><v-icon name="person_search"/></template>
      </v-input>
      <v-select v-model="dropdownValue" :items="dropdownOptions">
        <template #prepend><v-icon name="person_search"/></template>
      </v-select>
    </template>
    <template #sidebar>
      <sidebar-detail icon="info_outline" :title="$t('information')" close>
        <div
          class="page-description"
          v-html="$t('page_help_collections_item')"
        />
      </sidebar-detail>
      <!-- <revisions-drawer-detail
				v-if="isNew === false && _primaryKey"
				:collection="collection"
				:primary-key="_primaryKey"
				ref="revisionsDrawerDetail"
				@revert="refresh"
			/>
			<comments-sidebar-detail
				v-if="isNew === false && _primaryKey"
				:collection="collection"
				:primary-key="_primaryKey"
			/> -->
    </template>
  </private-view>
</template>

<script>
import { computed } from "@vue/composition-api";
import { getCollectionData } from "./composables";

export default {
  inject: ["system"],
  async mounted() {
    console.log("option api", this.system);

    // console.log(this.system.useCollectionsStore().getCollection("patients"));
    // console.log(this.getCollections());

    // this.dropdownOptions = this.getCollections();

    // console.log(this.system.useCollectionsStore().getCollection("patients"));
    // console.log(
    //   this.system.useFieldsStore().getFieldsForCollection("patients")
    // );

    // const result = JSON.stringify(await useAPI(this.system.api));
    // console.log(result);

    console.log(getCollectionData(this.system, {table: "patients"}))
  },
  data() {
    return {
      title: "New Title",
      dropdownOptions: [],
      dropdownValue: "",
    };
  },
  methods: {
    getCollections: function() {
      return this.system
        .useCollectionsStore()
        .visibleCollections.value.map((collection) => {
          return {
            text: collection.name,
            value: collection.collection,
          };
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.icon {
  --v-icon-color: var(--foreground-subdued);

  ::v-deep i {
    vertical-align: unset;
  }
}

.header-icon {
  --v-button-color-disabled: var(--foreground-normal);
}
</style>
