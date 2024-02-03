import { VERSION } from '/src/constants.js';
import {
  Time,
  Random,
  isNullish,
  isEmpty,
  rounding,
  range,
  createElement,
  loadImage,
  isExistFile
} from '/src/utils.js';
import Dialog from '/src/dialog.js';

function getDifficultyName(difficulty) {
  return ['PST', 'PRS', 'FTR', 'BYD'][difficulty];
}

function getClearType(clearType) {
  return ['TL', 'NC', 'FR', 'PM', 'EC', 'HC'][clearType]
}

const cav = createElement('canvas', {
  style: {
    width: '100%',
    height: 'auto'
  }
});
const ctx = cav.getContext('2d');

export async function generate(name = 'Unknown', songs, records = [], ptt = '0.00') {
  records = records.slice();
  const b30 = records.slice(0, 30);
  const b30avg = b30.reduce((total, record) => total + record.rating, 0) / 30;
  const maxptt = (b30avg * 30 + b30.slice(0, 10).reduce((total, record) => total + record.rating, 0)) / 40;
  const r10avg = (ptt * 4 - b30avg * 3) > 0 ? (ptt * 4 - b30avg * 3) : 0;
  
  const realHeight = cav.height = 3600;
  const realWidth = cav.width = cav.height / 16 * 9;
  const lineWidth = realHeight / 800;
  const padding = realHeight / 45;
  const rowCount = 10;
  const columnCount = 3;
  const fs1 = realHeight * 0.005;
  const fs2 = realHeight * 0.01;
  const fs3 = realHeight * 0.02;
  let y = padding * 2;
  
  ctx.clearRect(0, 0, cav.width, cav.height);
  
  ctx.fillStyle = '#F9F9F9';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.font = `${fs3}px "NotoSansCJKsc"`;
  ctx.fillText("test", padding * 2, y, (realWidth * 0.45 - padding * 2));
  ctx.font = `${fs3}px "Exo"`;
  ctx.fillText("test", padding * 2, y, (realWidth * 0.45 - padding * 2));
  ctx.font = `${fs3}px "GeosansLight"`;
  ctx.fillText("test", padding * 2, y, (realWidth * 0.45 - padding * 2));
  ctx.font = `${fs3}px "KingsGambit"`;
  ctx.fillText("test", padding * 2, y, (realWidth * 0.45 - padding * 2));
  ctx.font = `bold ${fs2 * 1.25}px "Exo"`;
  ctx.fillText("test", padding * 2, y, (realWidth * 0.45 - padding * 2));
  
  let img = await loadImage(`/assets/images/backgrounds/${ Random.integer(0, 9)() }.jpg`);
  if(ptt >= 13.00){
    img = await loadImage(`/assets/images/backgrounds/1001.jpg`);
  }
  ctx.drawImage(img, 0, 0, 1152, 2048, 0, 0, realWidth, realHeight);
  
  const imageData = ctx.getImageData(0, 0, cav.width, cav.height);
  const data = imageData.data;
  let colorSum = 0;
  for (let x = 0, len = data.length; x < len; x += 4) {
    colorSum += Math.floor((data[x] + data[x + 1] + data[x + 2]) / 3);
  }
  const brightness = Math.floor(colorSum / (cav.width * cav.height));
  
  const fontColor = brightness > 127 ? '#F9F9F9' : '#252525';
  const fontColorReverse = brightness <= 127 ? '#F9F9F9' : '#252525';
  const backgroundColor = brightness > 127 ? 'rgba(0, 0, 0, 0.35)' : 'rgba(255, 255, 255, 0.65)';
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(padding*0.5, padding*0.5, realWidth - padding, realHeight - padding * 2);
  
  let pttText = ``;
  ctx.shadowColor = "#514859";
  if (ptt == 0.00 || isEmpty(ptt) || isNullish(ptt)) {
    const pttImg = await loadImage(`/assets/images/rating/rating_off.png`);
    ctx.drawImage(pttImg, padding * 0.5, padding * 0.5, 256, 256);
    pttText = `--`;
  }else if (ptt > 0.00 && ptt < 3.50){
    const pttImg = await loadImage(`/assets/images/rating/rating_0.png`);
    ctx.drawImage(pttImg, padding * 0.5, padding * 0.5, 256, 256);
    pttText = Number(ptt).toFixed(2).toString();
  }else if (ptt >= 3.50 && ptt < 7.00){
    const pttImg = await loadImage(`/assets/images/rating/rating_1.png`);
    ctx.drawImage(pttImg, padding * 0.5, padding * 0.5, 256, 256);
    pttText = Number(ptt).toFixed(2).toString();
  }else if (ptt >= 7.00 && ptt < 10.00){
    const pttImg = await loadImage(`/assets/images/rating/rating_2.png`);
    ctx.drawImage(pttImg, padding * 0.5, padding * 0.5, 256, 256);
    pttText = Number(ptt).toFixed(2).toString();
  }else if (ptt >= 10.00 && ptt < 11.00){
    const pttImg = await loadImage(`/assets/images/rating/rating_3.png`);
    ctx.drawImage(pttImg, padding * 0.5, padding * 0.5, 256, 256);
    pttText = Number(ptt).toFixed(2).toString();
  }else if (ptt >= 11.00 && ptt < 12.00){
    const pttImg = await loadImage(`/assets/images/rating/rating_4.png`);
    ctx.drawImage(pttImg, padding * 0.5, padding * 0.5, 256, 256);
    pttText = Number(ptt).toFixed(2).toString();
  }else if (ptt >= 12.00 && ptt < 12.50){
    const pttImg = await loadImage(`/assets/images/rating/rating_5.png`);
    ctx.drawImage(pttImg, padding * 0.5, padding * 0.5, 256, 256);
    pttText = Number(ptt).toFixed(2).toString();
  }else if (ptt >= 12.50 && ptt < 13.00){
    const pttImg = await loadImage(`/assets/images/rating/rating_6.png`);
    ctx.drawImage(pttImg, padding * 0.5, padding * 0.5, 256, 256);
    pttText = Number(ptt).toFixed(2).toString();
  }else if (ptt >= 13.00){
    const pttImg = await loadImage(`/assets/images/rating/rating_7.png`);
    ctx.drawImage(pttImg, padding * 0.5, padding * 0.5, 256, 256);
    pttText = Number(ptt).toFixed(2).toString();
    ctx.shadowColor = "#6C0633";
  }
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.font = `${fs3}px "Exo"`;
  ctx.shadowBlur = 12;
  ctx.fillText(pttText, padding * 0.5 + 128, padding * 0.5 + 128);
  
  ctx.shadowBlur = 0;
  
  ctx.fillStyle = fontColor;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.font = `${fs3}px "NotoSansCJKsc"`;
  ctx.fillText(`${name}`, padding * 3.5, y, (realWidth * 0.45 - padding));
  
  ctx.textAlign = 'right';
  ctx.font = `${fs3}px "KingsGambit"`;
  ctx.fillText('Arcaea Player Best 30', realWidth - padding, y);
  
  y += padding * 1.5;
  ctx.textAlign = 'left';
  ctx.font = `${fs2 * 1.25}px "Exo"`;
  ctx.fillText(`Best 30 Avg: ${rounding(b30avg, 4)} / Max PTT: ${rounding(maxptt, 4)} ${ptt==0.00 ? '' : '/ Recent Best 10 AVG: '}${ptt==0.00 ? '' : rounding(r10avg, 4)}`, padding, y);
  
  ctx.textAlign = 'right';
  ctx.fillText(new Date().toLocaleString(), realWidth - padding, y + 45);
  
  y += padding * 1.25;
  ctx.strokeStyle = fontColor;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(padding, y + 30);
  ctx.lineTo(realWidth - padding, y + 30);
  ctx.closePath();
  ctx.stroke();
  
  y += padding * 0.8125;
  ctx.textAlign = 'center';
  const boxPadding = realHeight * 0.01;
  const boxWidth = (realWidth - padding * 2 - boxPadding * 2) / columnCount;
  
  for (const i of range(columnCount)) {
    const x = padding + boxWidth * (i + 0.5) + boxPadding * i;
    ctx.fillText(`#${1 + i * 10} ~ #${(1 + i) * 10}`, x, y + 15);
  }
  
  y += padding * 1.25;
  //const boxHeight = (realHeight - y - padding * 2 - boxPadding * (rowCount - 1)) / rowCount;
  const boxHeight = 256;
  
  for (const i of range(b30.length)) {
    const row = i % rowCount;
    const column = Math.floor(i / rowCount);
    if (row >= rowCount) break;
    const left = padding  + boxWidth * column + boxPadding * column;
    const top = y + row * boxHeight + boxPadding * row;
    const right = left + boxWidth;
    const bottom = top + boxHeight;
    let Y = top;
    let reverseY = bottom;
    
    const { songId, songDifficulty, clearType, scoreDisplay, rank, ranking, constant, ratingDisplay, shinyPerfectCount, perfectCount, nearCount, missCount} = b30[i];
    const { title_localized, difficulties, remote_dl } = songs.find(({ id }) => id === songId);
    
    const remoteDl = (isNullish(remote_dl) || !remote_dl) ? "" : "dl_";
    const jacketDiff = (isNullish(difficulties[songDifficulty].jacketOverride) || !difficulties[songDifficulty].jacketOverride) ? "base" : songDifficulty;
    if(isExistFile(`/assets/images/songs/${remoteDl + songId}/1080_${jacketDiff}_256.jpg`)){
      const songImg = await loadImage(`/assets/images/songs/${remoteDl + songId}/1080_${jacketDiff}_256.jpg`,'曲绘加载失败，请尝试刷新网页！');
      for (const i of range(256)) {
        ctx.globalAlpha = i / 255;
        ctx.drawImage(songImg, i * 1.5, 0, 1, 384, right - 256 + i, top, 1, 256);
      }
    }else{
      const songImg = await loadImage(`/assets/images/songs/${remoteDl + songId}/${jacketDiff}_256.jpg`,'曲绘加载失败，请尝试刷新网页！');
      for (const i of range(256)) {
        ctx.globalAlpha = i / 255;
        ctx.drawImage(songImg, i, 0, 1, 256, right - 256 + i, top, 1, 256);
      }
    }
    
    ctx.strokeStyle = fontColorReverse;
    ctx.lineWidth = 0.75;
    
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = `bold ${fs2 * 1.25}px "Exo"`;
    const titleLocalized = difficulties[songDifficulty].title_localized;
    ctx.fillText(isNullish(titleLocalized) ? title_localized.en : titleLocalized.en, left, Y + 5, boxWidth);
    
    Y += boxPadding * 1.4;
    ctx.fillStyle = perfectCount - shinyPerfectCount + nearCount + missCount === 0 ? '#CCFFFF' : fontColor;
    ctx.font = `${fs3}px "GeosansLight"`;
    ctx.fillText(scoreDisplay, left, Y, boxWidth);
    
    ctx.fillStyle = fontColor;
    ctx.textBaseline = 'bottom';
    ctx.font = `${fs2}px "Exo"`;
    ctx.fillText(`FAR ${nearCount} / LOST ${missCount}`, left, reverseY, boxWidth);
    
    ctx.textAlign = 'right';
    ctx.fillText(`#${ranking}`, right, reverseY, boxWidth);
    ctx.strokeText(`#${ranking}`, right, reverseY, boxWidth);
    
    reverseY -= boxPadding * 1.2;
    ctx.textAlign = 'left';
    ctx.fillText(`PURE ${perfectCount} (+${shinyPerfectCount})`, left, reverseY, boxWidth);
    
    ctx.textAlign = 'right';
    ctx.fillText(`${rank}`, right, reverseY, boxWidth);
    ctx.strokeText(`${rank}`, right, reverseY, boxWidth);
    
    reverseY -= boxPadding * 1.2;
    ctx.fillStyle = ['#668CFF', '#66FF66', '#9966FF', '#FF6666'][songDifficulty];
    ctx.textAlign = 'left';
    const difficultyName = getDifficultyName(songDifficulty);
    ctx.fillText(difficultyName, left, reverseY, boxWidth);
    
    ctx.fillStyle = fontColor;
    ctx.fillText(`${constant} → ${ratingDisplay}`, left + ctx.measureText(difficultyName).width + ctx.measureText(' ').width, reverseY, boxWidth);
    
    ctx.textAlign = 'right';
    ctx.fillText(`${getClearType(clearType)}`, right, reverseY, boxWidth);
    ctx.strokeText(`${getClearType(clearType)}`, right, reverseY, boxWidth);
  }
  
  ctx.font = `bold ${fs2}px "Exo"`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = backgroundColor;
  ctx.fillText(`Arcaea Local Querier v${VERSION.join('.')}`, realWidth / 2, realHeight - padding / 2);
  
  return cav.toDataURL();
}