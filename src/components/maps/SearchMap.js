import React, { useEffect, useState } from "react";
// import "./styles.css";

export default function SearchMap() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Fetch the HTML content from the public directory
    fetch("/SearchMap.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        setHtmlContent(data);
      })
      .catch((error) => {
        console.error("Error fetching HTML content:", error);
      });
  }, []);

  // return (htmlContent);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
