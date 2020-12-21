export function getCollectionData(system, { table }) {
  return {
    collections: system.useCollectionsStore().getCollection(table),
    fields: system.useFieldsStore().getFieldsForCollection(table),
    items: getItem(system.api, { table }),
  };
}

export async function getItem(api, { table }) {
  const endpoint = `/items/${table}`;

  try {
    const response = await api.get(endpoint);
    const result = await response.data;
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function save(api) {}
