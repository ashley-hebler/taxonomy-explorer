import { TagOrCategory, Settings } from "@/app/types";

import {
  WORDPRESS_STANDARD_PRE_PATH,
  WORDPRESS_VIP_PRE_PATH,
  WORDPRESS_STANDARD_POST_CAT_PATH,
  WORDPRESS_STANDARD_POST_TAG_PATH,
  WORDPRESS_VIP_POST_TAG_PATH,
  WORDPRESS_VIP_POST_CAT_PATH,
  WORDPRESS_STANDARD_POST_SETTINGS_PATH,
  WORDPRESS_VIP_POST_SETTINGS_PATH,
} from "@/app/lib/constants";

const API_URL = process.env.WORDPRESS_VIP;



interface API_RESPONSE {
  isWordPress: boolean;
  isVip: boolean;
  categories: Array<TagOrCategory>;
  tags: Array<TagOrCategory>;
  settings: Settings;
}


export async function fetchAPI(domain: string): Promise<API_RESPONSE> {


  const info = {
    isWordPress: false,
    isVip: false,
    isForbidden: false,
    categories: [],
    tags: [],
    settings: {
      title: "",
      description: "",
      url: "",
      logo: ""
    }
  };

  const STANDARD_TAG = `${WORDPRESS_STANDARD_PRE_PATH}${domain}${WORDPRESS_STANDARD_POST_TAG_PATH}`;
  const STANDARD_CAT = `${WORDPRESS_STANDARD_PRE_PATH}${domain}${WORDPRESS_STANDARD_POST_CAT_PATH}`;
  const VIP_TAG = `${WORDPRESS_VIP_PRE_PATH}${domain}${WORDPRESS_VIP_POST_TAG_PATH}`;
  const VIP_CAT = `${WORDPRESS_VIP_PRE_PATH}${domain}${WORDPRESS_VIP_POST_CAT_PATH}`;

  // First get tags
  try {
    const tagsResp = await fetch(STANDARD_TAG);
    if (tagsResp.status === 403 || tagsResp.status === 401) {
      info.isForbidden = true;
    }
    if (tagsResp.status === 200) {
      info.isWordPress = true;
    }
    info.tags = await tagsResp.json();
  } catch (error) {
    console.error("Error fetching tags:", error);
    try {
      const tagsResp = await fetch(VIP_TAG);
      if (tagsResp.status === 403 || tagsResp.status === 401) {
        info.isForbidden = true;
        return info;
      }
      if (tagsResp.status === 200) {
        info.isWordPress = true;
        info.isVip = true;
      }
      info.tags = await tagsResp.json();
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }
  // if at this point it's not wordpress, return
  if (!info.isWordPress) return info;

  // Next get categories
  try {
    const catsResp = await fetch(STANDARD_CAT);
    info.categories = await catsResp.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    try {
      const catsResp = await fetch(VIP_CAT);
      info.categories = await catsResp.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Finally get settings
  try {
    const settingsResp = await fetch(`${WORDPRESS_STANDARD_PRE_PATH}${domain}${WORDPRESS_STANDARD_POST_SETTINGS_PATH}`);
    info.settings = await settingsResp.json();
  } catch (error) {
    console.error("Error fetching settings:", error);
    try {
      const settingsResp = await fetch(`${WORDPRESS_VIP_PRE_PATH}${domain}${WORDPRESS_VIP_POST_SETTINGS_PATH}`);
      info.settings = await settingsResp.json();
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }
  console.log(info);

  return info;
}
