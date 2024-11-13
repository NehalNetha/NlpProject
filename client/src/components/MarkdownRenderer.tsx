import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({markdown}: {markdown: string}) => {
  
  
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
};

export default MarkdownRenderer;