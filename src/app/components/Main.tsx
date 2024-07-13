// app/HomePageClient.js
"use client";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

import { fetchAPI } from "@/app/lib/api";
import { isValidUrl } from "@/app/lib/utils";

import { API_RESPONSE, TagOrCategory, Settings } from "@/app/types";

import Toggler from "@/app/components/Toggler";
import Examples from "@/app/components/Examples";
import Loader from "@/app/components/Loader";
import styles from "@/app/ui/main.module.css";

const Main = ({}) => {
  const [startingExample, setStartingExample] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [insructions, setInstructions] = useState(
    "Enter a domain to search for tags and categories"
  );
  const [isWordPress, setIsWordPress] = useState(false);
  const [categories, setCategories] = useState<TagOrCategory[]>([]);
  const [tags, setTags] = useState<TagOrCategory[]>([]);
  const [settings, setSettings] = useState<Settings>({
    name: "",
    description: "",
    url: "",
    site_icon_url: "",
  });

  useEffect(() => {
    
    // if startingExample is set, set the query to the startingExample and fetch the data
    if (startingExample) {
      setQuery(startingExample);
    }
    if (query && !isValidUrl(query)) {
      setInstructions("Please enter a valid domain");
      return;
    }
    if (query && isValidUrl(query)) {
      // scroll to the top of the page
      window.scrollTo(0, 0);
      setLoading(true);
      // update the query to a clean the url
      setQuery(cleanUrl(query));
      setInstructions("");
      setData([]);

      const fetchData = async () => {
        // wipe out any previous data
        try {
          const result = await fetchAPI(query);
          handResults(result);
        } catch (error) {
          console.error("Error fetching data:", error);
          setData([]);
          setError(true);
          setInstructions("There was an error fetching the data");
        } finally {
          setLoading(false);
          // empty the query and startingExample
          setQuery("");
          setStartingExample("");
        }
      };

      const debouncedFetch = debounce(fetchData, 3000);
      debouncedFetch();

      return () => {
        debouncedFetch.cancel();
      };
    }
  }, [query, startingExample]);

  const handResults = (result: API_RESPONSE) => {
    console.log(result);
    if (result.isForbidden) {
      setInstructions(
        'This site says, "none of your business". (403 Forbidden)'
      );
    } else if (result.isWordPress) {
      setInstructions("");
      setTags(result.tags);
      setCategories(result.categories);
      setSettings(result.settings);
    } else {
      setInstructions("This site is not a WordPress site");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };


  const cleanUrl = (url: string) => {
    setInstructions("Cleaning URL...");
    const address = new URL(url);
    const protocol = address.protocol;
    const domain = address.hostname;
    const newUrl = protocol + "//" + domain;
    if (newUrl != url) {
      setInstructions("URL cleaned");
    } else {
      setInstructions("URL is already clean");
    }
    return newUrl;
  };

  // return the JSX
  return (
    <section className="wrapper">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="https://example.com"
        className={styles.input}
      />
      <p className={styles.instructions}>{insructions}</p>
      {loading && <div className={styles.loading}><Loader /></div>}
      {categories.length > 0 && tags.length > 0 && (<section className={`${styles.results} ${loading ? styles.resultsLoading : ""}`}><Toggler categories={categories} tags={tags} site={settings} /></section>)}
      <Examples onSelection={setStartingExample} />
      
    </section>
  );
};

export default Main;
