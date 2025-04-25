let input;
let slider;
let button;
let dropdown;
let iframe;
let jump = false;
let offsets = [];

function setup() {
  // 產生一個充滿視窗的畫布
  createCanvas(windowWidth, windowHeight);
  frameRate(10); // 設定跳動速度
  
  // 在左上角新增一個文字框
  input = createInput();
  input.position(10, 10);
  
  // 新增一個滑桿物件
  slider = createSlider(12, 30, 12);
  slider.position(200, 10);
  
  // 新增一個按鈕
  button = createButton('跳動');
  button.position(360, 10);
  button.mousePressed(toggleJump);
  
  // 新增一個下拉式選單
  dropdown = createSelect();
  dropdown.position(420, 10);
  dropdown.option('請選擇');
  dropdown.option('淡江大學');
  dropdown.option('淡江大學教育科技學系');
  dropdown.changed(goToWebsite);
  
  // 新增一個 iframe 來顯示網站內容
  iframe = createElement('iframe');
  iframe.position(10, 50);
  iframe.size(windowWidth - 20, windowHeight - 200); // 調整 iframe 的大小
  
  // 設定字型
  textFont('Arial'); // 使用系統內建的字型
}

function toggleJump() {
  jump = !jump;
  if (jump) {
    // 初始化每行的偏移量
    offsets = [];
    for (let y = 0; y < height; y += 50) {
      offsets.push(random(-5, 5));
    }
  }
}

function goToWebsite() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw');
  } else if (selected === '淡江大學教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw');
  } else {
    iframe.attribute('src', '');
  }
}

function draw() {
  // 設定背景顏色為鵝黃色
  background(255, 255, 224);
  
  // 根據滑桿值設定文字大小
  let textSizeValue = slider.value();
  textSize(textSizeValue);
  
  // 設定文字對齊方式
  textAlign(CENTER, CENTER);
  
  // 繪製充滿整個頁面的文字
  let textContent = input.value() || "🐱‍💻🐱‍🐉🐱‍🚀🐱‍👓🐱‍👤";
  let textWidthValue = textWidth(textContent);
  let textHeightValue = textAscent() + textDescent();
  
  for (let y = 0, row = 0; y < height; y += textHeightValue * 1.2, row++) { // 行間距縮小為文字高度的1.2倍
    let offsetY = jump ? offsets[row % offsets.length] : 0;
    if (jump) {
      offsets[row % offsets.length] = random(-5, 5);
    }
    for (let i = 0; i < width; i += textWidthValue + 10) { // 字間距設為文字寬度加10像素
      text(textContent, i + textWidthValue / 2, y + textHeightValue / 2 + offsetY); // 調整位置以確保文字顯示在正確位置
    }
  }
}
