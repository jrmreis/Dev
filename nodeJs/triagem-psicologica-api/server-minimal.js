import dotenv from 'dotenv';
import express from 'express';
import { Client } from '@notionhq/client';

dotenv.config();
const getDatabaseId = (assessmentType) => {
  const databases = {
    'bipolar': process.env.NOTION_DATABASE_BIPOLAR,
    'depression': process.env.NOTION_DATABASE_DEPRESSION,
    'anxiety': process.env.NOTION_DATABASE_ANXIETY,
    'adhd': process.env.NOTION_DATABASE_ADHD,
    'narcisismo': process.env.NOTION_DATABASE_NARCISISMO,
    'mitomania': process.env.NOTION_DATABASE_MITOMANIA
  };
  return databases[assessmentType];
};
const app = express();
app.use(express.json());

const notion = new Client({
  auth: process.env.NOTION_API_SECRET,
});

app.get('/test', async (req, res) => {
  try {
    const response = await notion.databases.retrieve({
      const assessmentType = 'anxiety'; // Default or get from request
      const databaseId = getDatabaseId(assessmentType);
      database_id: databaseId,
    });
    res.json({ success: true, database: response.title });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
