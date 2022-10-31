const path = require('node:path');
const fs = require('node:fs');
const http = require('node:http');
const net = require('node:net');
const { URL } = require('node:url');
const axios = require('axios')
const { NodeHtmlMarkdown } = require('node-html-markdown');
const slugify = require('slugify')

const contentPath = 'content/podcasts/';

const getCreds = async () => {
    const env = await fs.readFileSync(path.resolve(__dirname, ".env"), 'utf8');
    const vars = env.split('\n');
    return {
        apiKey: (vars.find((envVar) => envVar.includes('HEY_BUDDY_PODCAST_API_TOKEN'))).split('=')[1],
        podcastId: (vars.find((envVar) => envVar.includes('HEY_BUDDY_PODCAST_ID'))).split('=')[1]
    }
}

const getAllEpisodes = async (apiKey, podcastId) => {
    const { data: episodes } = await axios.get(
        `https://www.buzzsprout.com/api/${podcastId}/episodes.json`,
        {
            headers: {
                Authorization: `Token token=${apiKey}`,
            },
        }
    );
    return episodes.filter(episode => episode.season_number !== 99);
}

const deleteCurrentFiles = async () => {
    const files = await fs.readdirSync(contentPath)
    await Promise.all(
        files.map(filename => fs.unlinkSync(`${contentPath}${filename}`))
    );
}

const nhm = new NodeHtmlMarkdown();
const writeMdFile = async (episodeData) => {
    const slug = slugifyString(episodeData.title);
    try {
        let data = `---
title: ${episodeData.title}
id: ${episodeData.id}
slug: ${slug}
featuredimage: ${episodeData.artwork_url}
audio: ${episodeData.audio_url}
date: ${episodeData.published_at}
episodeNumber: ${episodeData.episode_number}
seasonNumber: ${episodeData.season_number}
totalPlays: ${episodeData.total_plays}
---
${nhm.translate(episodeData.description)}`;

        fs.writeFileSync(path.resolve(__dirname, `${contentPath}${slug}.md`), data);
        console.log(`Success: ${slug}`);
    } catch (error) {
        console.error(error)
    }
}


const run = async () => {
    const { apiKey, podcastId } = await getCreds();
    const episodes = await getAllEpisodes(apiKey, podcastId);
    await deleteCurrentFiles();
    await Promise.all(episodes.map(episode => writeMdFile(episode)));
}

// * Run script
run();


// utils
function slugifyString(titleString) {
    return titleString.toLowerCase().replace(/[^A-Za-z0-9]+/g, '-')
}

/**
 * * Data ex
 *id: 10354687,
  title: 'Tanner and Jean the Movie - Act 1 brainstorm',
  audio_url: 'https://www.buzzsprout.com/1942641/10354687-tanner-and-jean-the-movie-act-1-brainstorm.mp3',
  artwork_url: 'https://storage.buzzsprout.com/variants/o8jlnit6h6grsaix3s6v6cr4dlbq/60854458c4d1acdf4e1c2f79c4137142d85d78e379bdafbd69bd34c85f5819ad.jpg',
  description: `<p>html</p>`,
  summary: '',
  artist: 'Butler',
  tags: '',
  published_at: '2022-03-31T13:00:00.000-04:00',
  duration: 683,
  hq: false,
  magic_mastering: false,
  guid: 'Buzzsprout-10354687',
  inactive_at: null,
  custom_url: '',
  episode_number: 1,
  season_number: 1,
  explicit: true,
  private: false,
  total_plays: 102
 */