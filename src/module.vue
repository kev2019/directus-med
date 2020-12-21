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
      <v-select v-model="dropdownValue2" :items="dropdownOptionsPatients">
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
import {
  getCollectionData,
  getVisibleCollections,
  getItem,
} from "./composables";

export default {
  inject: ["system"],
  async mounted() {
    console.log("option api", this.system);
    console.log(await getCollectionData(this.system, { table: "patients" }));

    // console.log(this.system.useCollectionsStore().getCollection("patients"));
    // console.log(this.getCollections());

    this.dropdownOptions = this.getCollections();

    // console.log(this.system.useCollectionsStore().getCollection("patients"));
    // console.log(
    //   this.system.useFieldsStore().getFieldsForCollection("patients")
    // );

    // const result = JSON.stringify(await useAPI(this.system.api));
    // console.log(result);
  },

  data() {
    return {
      title: "New Title",
      dropdownOptions: [],
      dropdownValue: "",
      dropdownOptionsPatients: [],
      dropdownValue2: "",
      patient: [],
    };
  },
  watch: {
    dropdownValue: function(newValue, oldValue) {
      return getItem(this.system.api, {
        table: this.dropdownValue.value,
      }).then((result) => {
        this.dropdownOptionsPatients = result.data.map((x) => {
          return {
            text: x.name,
            value: x.id,
          };
        });
      });
    },
  },
  methods: {
    getCollections: function() {
      return getVisibleCollections(this.system).map((collection) => {
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
