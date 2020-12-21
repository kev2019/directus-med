export async function useAPI(api, options) {
  try {
    const result = await api.get("items/patients");
    return result;
  } catch (error) {
    console.log(error);
  }
}
