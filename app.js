const puppeteer = require('puppeteer');

async function scrapeYouTubePlaylist() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // URL da playlist do YouTube
  const playlistUrl = 'https://www.youtube.com/playlist?list=PLVRdJEqvAMbccRcixguBFkQuuW0mC_nKn';

  await page.goto(playlistUrl);

  // Aguarde um curto período de tempo para garantir que a página seja carregada completamente
  await page.waitForTimeout(10000);

  // Execute um código JavaScript na página para extrair os títulos e links dos vídeos
  const videoData = await page.evaluate(() => {
    const videos = [];
    const videoElements = document.querySelectorAll('.style-scope ytd-playlist-video-renderer');

    videoElements.forEach((element) => {
      const titleElement = element.querySelector('#video-title');
      const linkElement = element.querySelector('a#thumbnail');

      if (titleElement && linkElement) {
        const title = titleElement.textContent.trim();
        const link = linkElement.href;

        videos.push({ title, link });
      }
    });

    return videos;
  });

  // Exiba os títulos e links dos vídeos
  videoData.forEach((video, index) => {
    console.log(`Vídeo ${index + 1}:`);
    console.log('Título:', video.title);
    console.log('Link:', video.link);
    console.log('---');
  });

  await browser.close();
}

// Chama a função de scraping
scrapeYouTubePlaylist();