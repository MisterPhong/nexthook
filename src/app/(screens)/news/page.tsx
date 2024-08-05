'use client'
import React, { useEffect, useState } from 'react';

// Define interfaces
interface Article {
  title: string;
  description: string;
  url: string;
}

interface NewsApiResponse {
  articles: Article[];
}

// FinancialNews component
const FinancialNews: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const apiKey = 'b44d9180be554cb7a52d448a3505d32f'; // Replace with your NewsAPI key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=financial&apiKey=${apiKey}`);
        const data: NewsApiResponse = await response.json();
        setNews(data.articles);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [apiKey]);

  if (isLoading) {
    return <p>Loading news...</p>;
  }

  return (
    <div>
      <h1>Financial News</h1>
      {news.length === 0 ? (
        <p>No news articles found.</p>
      ) : (
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Financial News Page</h1>
      <FinancialNews />
    </div>
  );
};

export default App;
