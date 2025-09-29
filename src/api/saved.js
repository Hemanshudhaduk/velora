import { EndPoint, TokenAPI } from "@/src/utils/common";

export async function getSavedListData(props) {
  try {
    const response = await TokenAPI.get(
      `${EndPoint.savedModule.getSavedList}?guid=${props.guid}&pageSize=${props.pageSize}`
    );
    if (response.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error during fetching saved list:", error);
  }
}

export async function removeFromSavedData({ _id }) {
  try {
    const response = await TokenAPI.get(`${EndPoint.savedModule.removeFromSaved}?guid=${_id}`);
    if (response.status === "Success") return response;
    else return null;
  } catch (error) {
    console.error("Error while removing from saved list:", error);
  }
}
