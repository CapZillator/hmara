import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import './animation.css';
import icon1 from './img/01d.svg';
import icon2 from './img/01n.svg';
import icon3 from './img/02d.svg';
import icon4 from './img/02n.svg';
import icon5 from './img/03d.svg';
import icon6 from './img/04d.svg';
import icon7 from './img/09d.svg';
import icon8 from './img/10d.svg';
import icon9 from './img/11d.svg';
import icon10 from './img/13d.svg';
import icon11 from './img/50d.svg';
import wind_icon from './img/wind_dir.svg';
import * as serviceWorker from './serviceWorker';

async function backendRequest(params) {//Отправляет ассинхронный запрос на сервер
  let response = await fetch('backend/core.php',{
    method: 'POST',
    body: JSON.stringify(params),
  });
  let answer = await response.json();
  return answer;
}
function getTimeOfDay(weather){//Определяет, темное или светлое время суток сейчас. Если светлое - вернет true, тёмное - false
  const sunrise = new Date(weather.current.sunrise * 1000);
  const sunset = new Date(weather.current.sunset * 1000);
  const now = new Date();
  if (now > sunrise && now < sunset) return true;
  else return false;
}
function convertTemp(temp){
  let t = Math.round(temp);
  if (t > 0) t = `+${t}`;
  return t;
}
function convertUVI(index = 1){
  let key;
  if (index < 3) key = "low";
  else if (index >= 3 && index < 6) key = "mod";
  else if (index >= 6 && index < 8) key = "high";
  else if (index >= 8 && index < 11) key = "vh";
  else if (index >= 11) key = "ex";
  index = index.toFixed(1);
  return [index, key];
}
function getWindDir(dir = 0){
  if (dir < 23 || dir > 337) dir = "N";
  else if (dir > 22 && dir < 68) dir = "NE";
  else if (dir > 67 && dir < 113) dir = "E";
  else if (dir > 112 && dir < 158) dir = "SE";
  else if (dir > 157 && dir < 203) dir = "S";
  else if (dir > 202 && dir < 248) dir = "SW";
  else if (dir > 247 && dir < 293) dir = "W";
  else if (dir > 292 && dir < 338) dir = "NW";
  else dir = "N";
  return dir;
}
function getBofortscaleWind(windspeed, units){
  if (units === "imperial") windspeed = windspeed * 0.4469;
  let bofort = 0;
  if (windspeed >= 0.3 && windspeed < 1.6) bofort = 1;
  else if (windspeed >= 1.6 && windspeed < 3.4) bofort = 2;
  else if (windspeed >= 3.4 && windspeed < 5.5) bofort = 3;
  else if (windspeed >= 5.5 && windspeed < 8.0) bofort = 4;
  else if (windspeed >= 8.0 && windspeed < 10.8) bofort = 5;
  else if (windspeed >= 10.8 && windspeed < 13.9) bofort = 6;
  else if (windspeed >= 13.9 && windspeed < 17.2) bofort = 7;
  else if (windspeed >= 17.2 && windspeed < 20.8) bofort = 8;
  else if (windspeed >= 20.8 && windspeed < 24.5) bofort = 9;
  else if (windspeed >= 24.5 && windspeed < 28.5) bofort = 10;
  else if (windspeed >= 28.5 && windspeed < 32.7) bofort = 11;
  else if (windspeed >= 32.7) bofort = 12;
  return bofort;
}
function formatPrecip(precip, w_code){
  let result = 0;
  if (w_code >= 200 && w_code < 700 && precip) result = precip;
  return result;
}
function checkMinutes(min){
  if (min < 10) min = `0${min}`;
  return min;
}
function getImage(code){
  let result;
  switch(code){
    case "01d": result = icon1; break;
    case "01n": result = icon2; break;
    case "02d": result = icon3; break;
    case "02n": result = icon4; break;
    case "03d": result = icon5; break;
    case "03n": result = icon5; break;
    case "04d": result = icon6; break;
    case "04n": result = icon6; break;
    case "09d": result = icon8; break;
    case "09n": result = icon8; break;
    case "10d": result = icon7; break;
    case "10n": result = icon7; break;
    case "11d": result = icon9; break;
    case "11n": result = icon9; break;
    case "13d": result = icon10; break;
    case "13n": result = icon10; break;
    case "50d": result = icon11; break;
    case "50n": result = icon11; break;
    default: result = icon5;
  }
  return result;
}
function getRandomInt(max) {//Возвращает псевдослучайное число от 0 до max
  return Math.floor(Math.random() * Math.floor(max));
}
function getMist(){//Возвращает туман
  let mist = <div className="mistwrapper">
    <div className="mist"></div>
  </div>;
  return mist;
}
function getSnow(intensity = 2){//Возвращает снег
  let precip;
  let snowflake_array = [];
  let el_class = "snow";
  let wrappper_class = "precip";
  const limit = Math.ceil(100 / intensity);
  for (let i = 1; i < limit; i++){
    snowflake_array.push(i);
  };
  let prevclassflag = 0;
  let prevanimflag = 0;
  snowflake_array = snowflake_array.map((el, i) => {
    let classflag = getRandomInt(6);
    let delayflag = getRandomInt(16);
    let stepflag = getRandomInt(2);
    let animation = getRandomInt(10);
    let flake;
    let step;
    let class_name;
    while (classflag === prevclassflag){
    classflag = getRandomInt(6);
    };
    while (animation === prevanimflag){
      animation = getRandomInt(6);      
    };
    prevanimflag = animation;
    switch (animation){
      case 0: animation = "snow"; break;
      case 1: animation = "snow2"; break;
      case 2: animation = "snow3"; break;
      case 3: animation = "snow4"; break;
      case 4: animation = "snow5"; break;
      case 5: animation = "snow6"; break;
      case 6: animation = "snow7"; break;
      case 7: animation = "snow8"; break;
      case 8: animation = "snow9"; break;
      case 9: animation = "snow10"; break;
      default: animation = "snow"; 
    };
    switch (classflag){
      case 0: class_name = el_class; break;
      case 1: class_name = el_class + 2; break;
      case 2: class_name = el_class + 3; break;
      case 3: class_name = el_class + 4; break;
      case 4: class_name = el_class + 5; break;
      case 5: class_name = el_class + 6; break;
      default: class_name = el_class;
    };
    switch (stepflag){
      case 0: step = el * intensity; break;
      case 1: step = el * intensity + 1; break;
      default: step = el * 2;
    };
    switch (delayflag){
      case 0: flake = <div key={i} className={class_name} style={{left: step +"%", animationName: `${animation}`}}></div>; break;
      case 1: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: ".2s", animationName: `${animation}`}}></div>; break;
      case 2: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: ".5s", animationName: `${animation}`}}></div>; break;
      case 3: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: ".7s", animationName: `${animation}`}}></div>; break;
      case 4: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "1", animationName: `${animation}`}}></div>; break;
      case 5: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "1.3s", animationName: `${animation}`}}></div>; break;
      case 6: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "1.5s", animationName: `${animation}`}}></div>; break;
      case 7: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "1.7s", animationName: `${animation}`}}></div>; break;
      case 8: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "2s", animationName: `${animation}`}}></div>; break;
      case 9: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "2.2s", animationName: `${animation}`}}></div>; break;
      case 10: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "2.5s", animationName: `${animation}`}}></div>; break;
      case 11: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "2.8s", animationName: `${animation}`}}></div>; break;
      case 12: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "3s", animationName: `${animation}`}}></div>; break;
      case 13: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "3.3s", animationName: `${animation}`}}></div>; break;
      case 14: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "3.5s", animationName: `${animation}`}}></div>; break;
      case 15: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "3.7s", animationName: `${animation}`}}></div>; break;
      case 16: flake = <div key={i} className={class_name} style={{left: step + "%", animationDelay: "4s", animationName: `${animation}`}}></div>; break;
      default: flake = <div key={i} className={class_name} style={{left: step +"%",  animationName: `${animation}`}}></div>; 
    };
    return flake;
  });
  precip = <div className={wrappper_class}>{snowflake_array}</div>;
  return precip;
}
function getRain(storm = false, kind = 0, intensity = 2, wind = false){//Возвращает дождь, грозу и морось
  let precip;
  let raindrops_array = [];
  let el_class = "raindrop";
  let wrappper_class = wind ? "precip_wind": "precip";
  if (kind === 2){
    el_class = "drizzle";
  };
  const limit = Math.ceil(100 / intensity);
  for (let i = 1; i < limit; i++){
    raindrops_array.push(i);
  };
  let prevclassflag = 0;
  raindrops_array = raindrops_array.map((el, i) => {
    let classflag = getRandomInt(6);
    let delayflag = getRandomInt(5);
    let stepflag = getRandomInt(2);
    let drop;
    let step;
    let class_name;
    while (classflag === prevclassflag){
      classflag = getRandomInt(6);
    };
    prevclassflag = classflag;
    switch (classflag){
      case 0: class_name = el_class; break;
      case 1: class_name = el_class + 2; break;
      case 2: class_name = el_class + 3; break;
      case 3: class_name = el_class + 4; break;
      case 4: class_name = el_class + 5; break;
      case 5: class_name = el_class + 6; break;
      default: class_name = el_class;
    };
    switch (stepflag){
      case 0: step = el * intensity; break;
      case 1: step = el * intensity + 1; break;
      default: step = el * 2;
    };
    switch (delayflag){
      case 0: drop = <div key={i} className={class_name} style={{left: step +"%"}}></div>; break;
      case 1: drop = <div key={i} className={class_name} style={{left: step + "%", animationDelay: ".2s"}}></div>; break;
      case 2: drop = <div key={i} className={class_name} style={{left: step + "%", animationDelay: ".4s"}}></div>; break;
      case 3: drop = <div key={i} className={class_name} style={{left: step + "%", animationDelay: ".6s"}}></div>; break;
      case 4: drop = <div key={i} className={class_name} style={{left: step + "%", animationDelay: ".8s"}}></div>; break;
      default:  drop = <div key={i} className={class_name} style={{left: step +"%"}}></div>; 
    };
    return drop;
  });
  if (storm) precip = <div className={wrappper_class}><div className="storm">{raindrops_array}</div></div>;
  else precip = <div className={wrappper_class}>{raindrops_array}</div>;
  return precip;
}
function GetBackground(props){
  let weathercode = props.weather.current.weather[0].id;
  let wind = props.weather.current.wind_speed;
  wind = wind > 2 ? true : false;
  //wind = false;
  //weathercode = 200;
  let result;
  if (weathercode === 200){//2хх - гроза
    result = getRain(true, 0, 3, wind);
  }
  else if (weathercode === 201){
    result = getRain(true, 0, 2, wind);
  }
  else if (weathercode === 202){
    result = getRain(true, 0, 1, wind);
  }
  else if (weathercode >= 210 && weathercode <= 221){
    result = <div className="storm"></div>;
  }
  else if (weathercode === 230){
    result = getRain(true, 2, 3, wind);
  }
  else if (weathercode === 231){
    result = getRain(true, 2, 2, wind);
  }
  else if (weathercode === 232){
    result = getRain(true, 2, 1, wind);
  }
  else if (weathercode >= 300 && weathercode < 400){//3хх - морось
    if (weathercode === 300 || weathercode == 310){
    result = getRain(false, 2, 3, wind);
    }
    else if (weathercode === 301 || weathercode === 311){
      result = getRain(false, 2, 2, wind);
    }
    else result = getRain(false, 2, 1, wind);
  }  
  else if (weathercode === 500){//5хх - дождь
    result = getRain(false, 0, 3, wind);
  }
  else if (weathercode === 501){
    result = getRain(false, 0, 2, wind);
  }
  else if (weathercode >= 502 && weathercode < 600){
    result = getRain(false, 0, 1, wind);
  }
  else if (weathercode >= 600 && weathercode < 700){
    if (weathercode === 600 || weathercode === 615) result = getSnow(3);
    else if (weathercode === 601 || weathercode === 611 || weathercode === 616) result = getSnow(2);
    else result = getSnow(1);
  }
  else result = null;
  return result;
}
function GetRoundchartCloud(props){
  let cloudness = props.clouds;
  let multiplier = 2.65;
  let params = multiplier * cloudness + " " +  multiplier * (100 - cloudness);
  let chart = <svg x="0" y="0" viewBox="0 0 100 100" className="round_chart_canvas">
    <g>
	    <circle className="round_chart_circle_back" cx="50" cy="50" r="42.287"/>
      <circle className="round_chart_circle_front" cx="50" cy="50" r="42.287" strokeDasharray={params} strokeDashoffset={25 * multiplier}/>
	    <path fill="none" d="M49.25,27.531"/>
    </g>
    <g>
	    <path d="M52.766,21.25"/>
	    <path className="round_chart_icon" d="M73.749,36.24c0,6.68-5.412,12.094-12.094,12.094H34.749c-4.693,0-8.498-3.805-8.498-8.499
		s3.805-8.498,8.498-8.498c0.55,0,1.072,0.052,1.595,0.157C37.782,25.532,43.156,21.1,49.563,21.1c3.387,0,7.281,1.288,9.508,3.519
		c1.919,1.922,2.737,3.473,3.636,5.556c0.246,0.47,0.043-1.425-0.653-3.105c-0.637-1.535-1.443-2.896-1.443-2.896
		c0.772-0.157,1.439-0.023,2.28,0.035C68.271,24.577,73.749,29.559,73.749,36.24z"/>
    </g>
    <g>
      <text x="50" y="70" className="round_chart_text">{cloudness}%</text>
    </g>
  </svg>;
  return chart;
}
function GetRoundchartUV(props){
  let uv = props.uv;
  let multiplier = 2.65;
  let params = multiplier * (uv / 12 * 100) + " " +  multiplier * (100 - (uv / 12 * 100));
  let chart = <svg x="0" y="0" viewBox="0 0 100 100" className="round_chart_canvas">
   <g>
	<circle className="round_chart_circle_back" cx="50" cy="50" r="42.287"/>
  <circle className="round_chart_circle_front" cx="50" cy="50" r="42.287" strokeDasharray={params} strokeDashoffset={25 * multiplier}/>
	<path fill="none" d="M49.25,27.531"/>
</g>
<g id="Слой_2">
	<path d="M52.766,21.25"/>
	<path className="round_chart_icon2" strokeMiterlimit="10" d="M50,39.563"/>
	<path className="round_chart_icon2" strokeMiterlimit="10" d="M50,39.563"/>
	<path className="round_chart_icon2" strokeMiterlimit="10" d="M50,39.563L50,39.563L50,39.563z"/>
	<line className="round_chart_icon2" strokeMiterlimit="10" x1="29.65" y1="47.437" x2="70.232" y2="47.437"/>
	<polyline className="round_chart_icon2" strokeMiterlimit="10" points="54.958,34.023 59.614,34.023 
		59.614,38.679 	"/>
	<polyline className="round_chart_icon2" strokeMiterlimit="10" points="31.458,28.335 48.38,45.258 
		59.614,34.023 	"/>
	<polyline className="round_chart_icon2" strokeMiterlimit="10" points="63.767,34.023 68.423,34.023 
		68.423,38.679 	"/>
	<polyline className="round_chart_icon2" strokeWidth="2" strokeMiterlimit="10" points="40.266,28.335 57.188,45.258 
		68.423,34.023 	"/>
</g>
<g>
      <text x="50" y="70" className="round_chart_text">{uv}</text>
</g>
</svg>;
  return chart;
}
function GetRoundchartPress(props){
  let chart = <svg x="0" y="0" viewBox="0 0 100 100" className="round_chart_canvas">
    <g>
	   <circle className="round_chart_circle_back" cx="50" cy="50" r="42.287"/>
     <circle className="round_chart_circle_front" cx="50" cy="50" r="42.287" strokeDasharray="2 2" strokeDashoffset="66.25"/>
	   <path fill="none" d="M49.25,27.531"/>
    </g>
    <g>
	    <circle className="round_chart_icon2" strokeMiterlimit="10" cx="49.999" cy="32.854" r="14.584"/>
	    <path className="round_chart_icon3" strokeMiterlimit="10" d="M50,39.563"/>
	    <path className="round_chart_icon3" strokeMiterlimit="10" d="M50,39.563"/>
	    <path className="round_chart_icon3" strokeMiterlimit="10" d="M50,39.563L50,39.563L50,39.563z"/>
    	<path className="round_chart_icon" d="M61.71,32.85h-2.33c0-5.28-4.27-9.54-9.55-9.54s-9.55,4.26-9.55,9.54h-2.32c0-6.55,5.31-11.87,11.87-11.87
		C56.4,20.98,61.71,26.3,61.71,32.85z"/>
	    <circle className="round_chart_icon2" strokeMiterlimit="10" cx="49.835" cy="40.178" r="3.125"/>
	    <polygon className="round_chart_icon" points="53.032,28.867 53.147,37.727 48.332,36.377 	"/>
    </g>
    <g>
      <text x="50" y="70" className="round_chart_text">{props.press}</text>
    </g>
  </svg>;
  return chart;
}
function GetRoundchartHum(props){
  let hum = props.hum;
  let multiplier = 2.65;
  let params = multiplier * props.hum + " " +  multiplier * (100 - props.hum);
  let chart = <svg x="0" y="0" viewBox="0 0 100 100" className="round_chart_canvas">
    <g>
	   <circle className="round_chart_circle_back" cx="50" cy="50" r="42.287"/>
     <circle className="round_chart_circle_front" cx="50" cy="50" r="42.287" strokeDasharray={params} strokeDashoffset={25 * multiplier}/>
	   <path fill="none" d="M49.25,27.531"/>
    </g>
    <g>
      <path d="M52.766,21.25"/>
	    <path className="round_chart_icon" d="M59.797,38.537c0,5.411-4.387,9.797-9.796,9.797c-5.411,0-9.797-4.386-9.797-9.797
		c0-1.701,0.454-4.266,1.998-6.622c1.719-2.624,2.727-3.474,3.806-5.689c1.392-2.858,0.09-7.008,0.527-7.008
		c0.374,0,5.907,5.497,8.208,8.659c1.393,1.917,2.414,3.293,3.246,4.792C59.107,34.687,59.797,36.713,59.797,38.537z"/>
    </g>
    <g>
      <text x="50" y="70" className="round_chart_text">{props.hum}%</text>
    </g>
  </svg>;
  return chart;
}
function GetSunChart(props){//Инфографика: солнце
  let canvas_h = 80;//Высота холста
  let canvas_w = 200;//Ширина холста
  let canvas_size = `0 0 ${canvas_w} ${canvas_h}`;
  let indent = Math.round(canvas_w * 0.05);
  let sun_baseline_y = Math.round(canvas_h * 0.75);
  let sun_baseline = `${indent},${sun_baseline_y} ${canvas_w - indent},${sun_baseline_y}`;
  let sun_circle_w = Math.round(canvas_w * 0.2);
  let sun_circle_w2 = Math.round(canvas_w * 0.16);
  let y_indent = indent * 0.1;
  let y_circle_indent = sun_baseline_y - sun_circle_w * 0.7 - y_indent;
  let sun_circle = `M${indent * 2},${sun_baseline_y - y_indent} C ${indent * 2},${y_circle_indent} ${indent * 2 + sun_circle_w},${y_circle_indent} ${indent * 2 + sun_circle_w},${sun_baseline_y - y_indent}`;
  let sun_circle2 = `M${canvas_w - indent * 2 - sun_circle_w2},${sun_baseline_y - y_indent} C ${canvas_w - indent * 1.5 - sun_circle_w2},${sun_baseline_y - sun_circle_w2 * 0.5 - y_indent} ${canvas_w - indent * 2.5},${sun_baseline_y - sun_circle_w2 * 0.5 - y_indent} ${canvas_w - indent * 2},${sun_baseline_y - y_indent}`;
  let left_arrow = `${indent * 4 + sun_circle_w},${sun_baseline_y - indent * 0.5} ${indent * 3.5 + sun_circle_w},${sun_baseline_y} ${indent * 4 + sun_circle_w},${sun_baseline_y + indent * 0.5}`;
  let right_arrow = `${canvas_w - indent * 4 - sun_circle_w2},${sun_baseline_y - indent * 0.5} ${canvas_w - indent * 3.5 - sun_circle_w2},${sun_baseline_y} ${canvas_w - indent * 4 - sun_circle_w2},${sun_baseline_y + indent * 0.5}`;
  let sun_path = `M${indent * 2 + sun_circle_w},${sun_baseline_y - indent * 3} C ${indent * 4 + sun_circle_w},${sun_baseline_y - indent * 6} ${canvas_w - indent * 4 - sun_circle_w2},${sun_baseline_y - indent * 6} ${canvas_w - indent * 2 - sun_circle_w2},${sun_baseline_y - indent * 3}`;
  let sun_arrow =`${canvas_w / 2 },${sun_baseline_y - indent * 5.75} ${canvas_w / 2 + indent * 0.5},${sun_baseline_y - indent * 5.25} ${canvas_w / 2},${sun_baseline_y - indent * 4.75}`; 
  let text_sunrise = null;
  let text_sunset = null;
  let text_day_dur = null;
  let polar1 = null;
  if (props.day_dur === -1) {
    polar1 = <text x={indent * 2 + sun_circle_w + (canvas_w - sun_circle_w - sun_circle_w2 - indent * 4) / 2} y={sun_baseline_y - indent * 2} className="sunchart_text">{props.cur_lang.description.polar_d}</text>;
  }
  else if(props.day_dur === -2) {
    polar1 = <text x={indent * 2 + sun_circle_w + (canvas_w - sun_circle_w - sun_circle_w2 - indent * 4) / 2} y={sun_baseline_y - indent * 2} className="sunchart_text">{props.cur_lang.description.polar_n}</text>;
  }
  else {
    text_sunrise = <text x={indent * 2 + sun_circle_w / 2} y={sun_baseline_y - indent * 3.5} className="sunchart_text">{props.sunrise}</text>;
    text_sunset = <text x={canvas_w - indent * 2 - sun_circle_w2 / 2} y={sun_baseline_y - indent * 3.5} className="sunchart_text">{props.sunset}</text>;
    text_day_dur = <text x={indent * 2 + sun_circle_w + (canvas_w - sun_circle_w - sun_circle_w2 - indent * 4) / 2} y={sun_baseline_y - indent / 2} className="sunchart_text">{props.day_dur}</text>;
  };
  let chart = <svg viewBox={canvas_size}>
    <polyline points={sun_baseline} className="chart_sun_baseline" />
    <polyline points={left_arrow} className="chart_sun_baseline" />
    <polyline points={right_arrow} className="chart_sun_baseline" />
    <path d={sun_circle} strokeWidth={indent} className="chart_sun_circle" />
    <path d={sun_circle2} strokeWidth={indent} className="chart_sun_circle" />
    <path d={sun_path} className="chart_sun_path" />
    <path d={sun_path} className="chart_sun_path2" />
    <polyline points={sun_arrow} className="chart_sun_baseline" />
    <text x={indent * 2 + sun_circle_w / 2} y={sun_baseline_y + indent * 1.5} className="sunchart_text">{props.cur_lang.description.sunrise}</text>
    <text x={canvas_w - indent * 2 - sun_circle_w2 / 2} y={sun_baseline_y + indent * 1.5} className="sunchart_text">{props.cur_lang.description.sunset}</text>
    {text_sunrise}{text_sunset}{text_day_dur}{polar1}
              </svg>;
  return chart;

}
function GetChart(props){//Возвращает инфографику: t, осадки, давление за 8 дней
  let data = props.data.daily;
  let temp_unit = (props.units === "metric") ? "C": "F";
  const is_day_now = props.is_day_now;
  const units_side_press_class = is_day_now ? "chart_units_side_press_light" : "chart_units_side_press";
  const chart_press_text = is_day_now ? "chart_press_text_light" : "chart_press_text";
  const chart_press_rect = is_day_now ? "chart_press_rect_light" : "chart_press_rect";
  let chart_params = {max_t: -1000, min_t: 1000, max_press: 0, min_press: 2000, max_precip: 0};
  let t_array = {max: [], min: []};
  let press_array = [];
  let precip_array = [];
  let days_name = [];
  let days_date = [];
  data.forEach((d, i) => {
    if (d.temp.max > chart_params.max_t) chart_params.max_t = Math.round(d.temp.max);
    if (d.temp.min < chart_params.min_t) chart_params.min_t = Math.round(d.temp.min);
    if (d.pressure > chart_params.max_press) chart_params.max_press = d.pressure;
    if (d.pressure < chart_params.min_press) chart_params.min_press = d.pressure;
    if (d.rain > chart_params.max_precip) chart_params.max_precip = d.rain;
    t_array.max.push(Math.round(d.temp.max));
    t_array.min.push(Math.round(d.temp.min));
    press_array.push(d.pressure);
    precip_array.push(formatPrecip(d.rain, d.weather[0].id));
    let date = new Date(d.dt * 1000);
    days_name.push(props.cur_lang.date.day_short[date.getDay()]);
    days_date.push(date.getDate());
  });
  let limit = t_array.max.length - 1;
  let canvas_h = 150;//Высота холста
  let canvas_w = 210;//Ширина холста
  let canvas_size = `0 0 ${canvas_w} ${canvas_h}`;
  let t_h = Math.round((canvas_h / 10) * 3.8);//Высота области Т в %
  let t_indent = Math.round((canvas_h - t_h) / 2);
  let t_step = Math.round(t_h / (chart_params.max_t - chart_params.min_t));
  let t_x_step = 20;//Шаг по гирозонтали
  let h_indent = 10;//Отступ по горизонтали
  let h_indent2 = Math.round(h_indent / 2);
  let press_w = Math.round(t_x_step / 2);//Ширина столбца давления
  let precip_w = Math.round(t_x_step / 4);//Ширина столбца осадков
  let v_text_indent = Math.round(t_h * 0.1);//Отступ текста от основных элементов
  let press_h = Math.round((canvas_h / 10) * 7);//Высота столбца давления в %
  let press_h_indent = Math.round((canvas_h - press_h) / 2);
  let press_step = Math.round((press_h / 3) / (chart_params.max_press - chart_params.min_press));
  let precip_step = Math.round(press_h / chart_params.max_precip);
  let y_daystext = Math.round(press_h_indent / 1.5);
  let y_datetext = Math.round(press_h_indent / 3);
  let y_presstext = press_h + press_h_indent + y_datetext;
  let y_preciptext = y_presstext + y_datetext;
  let down_line_length = t_x_step * 8 - h_indent2;
  let down_line = <line x1={Math.round(h_indent / 2)} y1={press_h + press_h_indent} x2={down_line_length} y2={press_h + press_h_indent} className="chart_line" />;
  let side_legend_indent = t_x_step * precip_array.length;
  let press_legend = <text x={side_legend_indent} y={y_presstext} className={units_side_press_class}>{props.cur_lang.description.press_name}, {props.cur_lang.pressure}</text>;
  let precip_legend = <text x={side_legend_indent} y={y_preciptext} className="chart_units_side_precip">{props.cur_lang.description.precip_name}, {props.cur_lang.description.precip_unit}</text>;
  let t_max_l_y = Math.round(press_h * 0.4) + press_h_indent;
  let t_min_l_y = Math.round(press_h * 0.6) + press_h_indent;
  let t_max_legend = <text x={side_legend_indent + t_x_step} y={Math.round(press_h * 0.33) + press_h_indent} className="chart_units_text">Tmax, °{temp_unit}</text>;
  let t_min_legend = <text x={side_legend_indent + t_x_step} y={Math.round(press_h * 0.69) + press_h_indent + 1} className="chart_units_text">Tmin, °{temp_unit}</text>;
  let t_max_legend_line = <line x1={side_legend_indent +  t_x_step / 2} y1={t_max_l_y} x2={side_legend_indent + t_x_step * 1.5} y2={t_max_l_y} className="chart_t_path_d"/>;
  let t_max_legend_circle = <circle r="2" cx={side_legend_indent + t_x_step} cy={t_max_l_y} className="chart_circle_d" />;
  let t_min_legend_line = <line x1={side_legend_indent +  t_x_step / 2} y1={t_min_l_y} x2={side_legend_indent + t_x_step * 1.5} y2={t_min_l_y} className="chart_t_path_n"/>;
  let t_min_legend_circle = <circle r="2" cx={side_legend_indent + t_x_step} cy={t_min_l_y} className="chart_circle_n" />;
  const ti = t_x_step * 0.5;//Смещение для контрольных точек кривой температуры
  let t_max_path;
  let t_min_path;
  let precip_text = precip_array.map((p, i) => {
    let x = (t_x_step * i) + h_indent;
    let text = <text key={i} x={x} y={y_preciptext} className="chart_precip_text">{p}</text>;
    return text;
  });
  let press_text = press_array.map((p, i) => {
    let x = (t_x_step * i) + h_indent;
    let text = <text key={i} x={x} y={y_presstext} className={chart_press_text}>{p}</text>;
    return text;
  });
  let days_text = days_name.map((d, i) => {
    let x = (t_x_step * i) + h_indent;
    let text = <text key={i} x={x} y={y_daystext} className="chart_light_text">{d}</text>;
    return text;
  });
  let days_text_date = days_date.map((d, i) => {
    let x = (t_x_step * i) + h_indent;
    let text = <text key={i} x={x} y={y_datetext} className="chart_light_text">{d}</text>;
    return text;
  });
  let press_rect = press_array.map((p, i) => {
    let x = i * t_x_step + h_indent2;
    let y = (chart_params.max_press - p) * press_step + press_h_indent;
    let h = canvas_h - press_h_indent - y;
    let rect = <rect key={i} x={x} y={y} width={press_w} height={h} className={chart_press_rect}/>;
    return rect;
  });
  let precip_rect = precip_array.map((p, i) => {
    let x = i * t_x_step + h_indent2 + precip_w;
    let y = (chart_params.max_precip - p) * precip_step + press_h_indent;
    let h = canvas_h - press_h_indent - y;
    if (h < 0) h = 0;
    let rect = <rect key={i} x={x} y={y} width={precip_w} height={h} className="chart_precip_rect"/>;
    if (p > 0) return rect;
  });
  t_array.min.forEach((t, i) => { 
    let x = (t_x_step * i) + h_indent;
    let y = (chart_params.max_t - t) * t_step + t_indent; 
    if (i === 0) {
      t_min_path = `M${x},${y} C${x + ti},${y}`;
    }
    else if (i > 0 && i < limit) {
      t_min_path = t_min_path + ` ${x - ti},${y} ${x},${y} S`;
    }
    else if (i === limit) {
      t_min_path = t_min_path + ` ${x - ti},${y} ${x},${y}`;
    }
  });
  let t_min_points = t_array.min.map((t, i) => { 
    let x = (t_x_step * i) + h_indent;
    let y = (chart_params.max_t - t) * t_step + t_indent; 
    let circle = <circle key={i} r="2" cx={x} cy={y} className="chart_circle_n" />;
    return circle;
  });
  let t_min_text = t_array.min.map((t, i) => { 
    let x = (t_x_step * i) + h_indent;
    let y = (chart_params.max_t - t) * t_step + (t_indent + (v_text_indent * 2)); 
    if (t > 0) t = `+${t}°`;
    else t = `${t}°`;
    let text = <text key={i} x={x} y={y} className="chart_light_text">{t}</text>;
    return text;
  });
  let t_max_points = t_array.max.map((t, i) => { 
    let x = (t_x_step * i) + h_indent;
    let y = (chart_params.max_t - t) * t_step + t_indent; 
    let circle = <circle key={i} r="2" cx={x} cy={y} className="chart_circle_d" />;
    return circle;
  });
  let t_max_text = t_array.max.map((t, i) => { 
    let x = (t_x_step * i) + h_indent;
    let y = (chart_params.max_t - t) * t_step + (t_indent - v_text_indent); 
    if (t > 0) t = `+${t}°`;
    else t = `${t}°`;
    let text = <text key={i} x={x} y={y} className="chart_light_text">{t}</text>;
    return text;
  });
  t_array.max.forEach((t, i) => { 
    let x = (t_x_step * i) + h_indent;
    let y = (chart_params.max_t - t) * t_step + t_indent; 
    if (i === 0) {
      t_max_path = `M${x},${y} C${x + ti},${y}`;
    }
    else if (i > 0 && i < limit) {
      t_max_path = t_max_path + ` ${x - ti},${y} ${x},${y} S`;
    }
    else if (i === limit) {
      t_max_path = t_max_path + ` ${x - ti},${y} ${x},${y}`;
    }
  });
  let chart = <svg x="0" y="0" viewBox={canvas_size} className="big_chart">
    {press_rect}{precip_rect}{down_line}
    <path d={t_min_path} className="chart_t_path_n" />
    {t_min_points}{t_min_text}    
    <path d={t_max_path} className="chart_t_path_d" />
    {t_max_points}{t_max_text}
    {days_text_date}{days_text}{press_text}{precip_text}{press_legend}{precip_legend}
    {t_max_legend}{t_max_legend_line}{t_max_legend_circle}
    {t_min_legend_line}{t_min_legend_circle}{t_min_legend}
    </svg>;
  return chart;

}
function GetCurrentWind(props){
  const weather = props.weather.current;
  const cur_lang = props.cur_lang;
  const units = props.units;
  const wind_speed_units = (units === 'metric') ? cur_lang.wind.units.metric: cur_lang.wind.units.imperial;
  const bofort = getBofortscaleWind(weather.wind_speed, units);
  const bofort_points_class = props.is_day_now ? "bofort_points_light" : "bofort_points";
  const result = <div className="cur_wind">
      <div className="elements"><div><img src={wind_icon} className={`wind_dir_${getWindDir(weather.wind_deg)}`} alt={cur_lang.wind.direction[getWindDir(weather.wind_deg)]}/></div><div>{cur_lang.wind.direction[getWindDir(weather.wind_deg)]}</div><div>{Math.round(weather.wind_speed)} {wind_speed_units}</div></div>
      <p>{cur_lang.wind.desc.bofortname}: <span className={bofort_points_class} title={cur_lang.wind.desc.points}>{bofort}</span> - {cur_lang.wind.desc.bofort[bofort]}</p>
      </div>;
  return result;
}
function GetCurrentSunChart(props){
  let weather = props.weather.current;
  let cur_lang = props.cur_lang;
  let lat = props.weather.lat;
  let timezone_offset = props.weather.timezone_offset;
  let polar_date = new Date(props.weather.current.dt * 1000);
  polar_date = polar_date.getMonth();
  let current_time = new Date();
  let offset = current_time.getTimezoneOffset() * 60 + timezone_offset;
  let sunrise = 0;
  let sunset = 0;
  let day_dur = 0;
  if (weather.sunrise) {
    sunrise = new Date((weather.sunrise + offset) * 1000);
    sunrise = `${sunrise.getHours()}:${checkMinutes(sunrise.getMinutes())}`;
    sunset = new Date((weather.sunset + offset) * 1000);
    sunset = `${sunset.getHours()}:${checkMinutes(sunset.getMinutes())}`;
    day_dur = (weather.sunset - weather.sunrise);
    let hours = Math.floor(day_dur / 3600);
    let minutes = Math.floor((day_dur - (hours * 3600)) / 60);
    day_dur = `${hours}:${checkMinutes(minutes)}`;
  }
  else {
    if (lat > 0 && (polar_date < 4 || polar_date > 9)) day_dur = -2;
    else if (lat > 0 && polar_date > 3 && polar_date < 10) day_dur = -1;
    else if (lat < 0 && polar_date > 3 && polar_date < 10) day_dur = -2;
    else if (lat < 0 && (polar_date < 4 || polar_date > 9)) day_dur = -1;
  };
  let result = <div className="sunchart_wrapper"><GetSunChart sunrise={sunrise} sunset={sunset} day_dur={day_dur} cur_lang={cur_lang}/></div>;
  return result;
}
function GetCircleCharts(props){
  let weather = props.weather.current;
  let cur_lang = props.cur_lang;
  let uvi = convertUVI(weather.uvi);
  let hum_chart = <GetRoundchartHum hum={weather.humidity}/>;
  let cloud_chart = <GetRoundchartCloud clouds={weather.clouds}/>;
  let uv_chart = <GetRoundchartUV uv={uvi[0]}/>;
  let press_chart = <GetRoundchartPress press={weather.pressure}/>;
  let result = <div className="circles"><div className="circles_wrapper">
    <div>{hum_chart}<p>{cur_lang.description.hum}</p></div><div>{cloud_chart}<p>{cur_lang.clouds}</p></div><div>{uv_chart}<p>{cur_lang.uvi.name}: {cur_lang.uvi.val[uvi[1]]}</p></div><div>{press_chart}<p>{cur_lang.description.press_name}, {cur_lang.pressure}</p></div>
  </div></div>;  
  return result;
}
function GetCurrentWeather(props){//Возвращает текущую погоду
  let weather = props.weather.current;
  let cur_lang = props.cur_lang;
  let units = props.units;
  let city = props.city;
  let temp_unit = (units === 'metric') ? 'C': 'F';
  let result = <div>
    <h2>{city}</h2>
    <p className="cur_temp">{convertTemp(weather.temp)}°{temp_unit}</p>
    <img src={getImage(weather.weather[0].icon)} alt={props.cur_lang.weathercodes[weather.weather[0].id]}/>
    <p className="cur_weather_desc">{props.cur_lang.weathercodes[weather.weather[0].id]}</p>   
    <p className="cur_feels_like">{cur_lang.feels_like} {convertTemp(weather.feels_like)}°{temp_unit}</p>
  </div>;
  return result;
}
function GetHourlyForecast(props){//Возвращает почасовой прогноз
  let temp_unit = (props.units === "metric") ? "C": "F";
  let wind_speed_units = (props.units === "metric") ? props.cur_lang.wind.units.metric: props.cur_lang.wind.units.imperial;
  let timezone_offset = props.forecast.timezone_offset;
  let current_time = new Date();
  let offset = current_time.getTimezoneOffset() * 60 + timezone_offset;
  let result = props.forecast.hourly.map((h, i) => {
      if (i < 24){
      let date = new Date((h.dt + offset) * 1000);
      let time = date.getHours();
      if (time === 0){
        let day = date.getDay();
        day = props.cur_lang.date.day_short[day];
        date = <div className="forecast_bigfont"><p>{day}</p><p>{time + ":00"}</p></div>;
      }
      else date = <div className="forecast_bigfont"><p className="hourly_date_margin_top">{time + ":00"}</p></div>;
      return <div key={i}>
        {date}<img src={getImage(h.weather[0].icon)} alt={props.cur_lang.weathercodes[h.weather[0].id]}/>
        <p className="forecast_bigfont">{convertTemp(h.temp)}°{temp_unit}</p>
        <p className="weather_desc">{props.cur_lang.weathercodes[h.weather[0].id]}</p>
        <p><img src={wind_icon} className={`wind_dir_${getWindDir(h.wind_deg)}`} alt='Wind direction'/></p>
        <div className="forecast_wind_desc_h">
          <span>{props.cur_lang.wind.direction[getWindDir(h.wind_deg)]}</span> <span>{Math.round(h.wind_speed)} {wind_speed_units}</span>
        </div>
        </div>;
      };
  });
  return <div className="hourly_wrapper">{result}</div>;
}
function GetDailyForecast(props){//Возвращает прогноз по дням
  let temp_unit = (props.units === "metric") ? "C": "F";
  const lat = props.forecast.lat;
  let wind_speed_units = (props.units === "metric") ? props.cur_lang.wind.units.metric: props.cur_lang.wind.units.imperial;
  let timezone_offset = props.forecast.timezone_offset;
  let current_time = new Date();
  let offset = current_time.getTimezoneOffset() * 60 + timezone_offset;
  let result = props.forecast.daily.map((d, i) => {
      let date = new Date((d.dt + offset) * 1000);
      const polar_date = date.getMonth();
      let day = props.cur_lang.date.day[date.getDay()];
      if (i === 0) day = props.cur_lang.date.today;
      else if (i === 1) day = props.cur_lang.date.tomorrow;
      let month = props.cur_lang.date.month[date.getMonth()];
      if (props.units === "imperial" && props.cur_lang.code === "en") date = `${day}, ${month} ${date.getDate()}`;
      else date = `${day}, ${date.getDate()} ${month}`;
      let sunrise = new Date((d.sunrise + offset) * 1000);
      sunrise = `${sunrise.getHours()}:${checkMinutes(sunrise.getMinutes())}`;
      let sunset = new Date((d.sunset + offset) * 1000);
      sunset = `${sunset.getHours()}:${checkMinutes(sunset.getMinutes())}`;
      let day_dur = d.sunrise ? (d.sunset - d.sunrise): 0;
      if (day_dur > 0){
        let hours = Math.floor(day_dur / 3600);
        let minutes = Math.floor((day_dur - (hours * 3600)) / 60);
        day_dur = `${hours}:${checkMinutes(minutes)}`;
      }
      else {
        if (lat > 0 && (polar_date < 4 || polar_date > 9)) day_dur = -2;
        else if (lat > 0 && polar_date > 3 && polar_date < 10) day_dur = -1;
        else if (lat < 0 && polar_date > 3 && polar_date < 10) day_dur = -2;
        else if (lat < 0 && (polar_date < 4 || polar_date > 9)) day_dur = -1;
      }
      day = <p><span className="temp_wrapper">{props.cur_lang.description.day} {convertTemp(d.temp.day)}°{temp_unit}</span> {props.cur_lang.feels_like} {convertTemp(d.feels_like.day)}°{temp_unit}</p>;
      let night = <p><span className="temp_wrapper">{props.cur_lang.description.night} {convertTemp(d.temp.night)}°{temp_unit}</span> {props.cur_lang.feels_like} {convertTemp(d.feels_like.night)}°{temp_unit}</p>;
      let morn = <p><span className="temp_wrapper">{props.cur_lang.description.morning} {convertTemp(d.temp.morn)}°{temp_unit}</span> {props.cur_lang.feels_like} {convertTemp(d.feels_like.morn)}°{temp_unit}</p>;
      let eve = <p><span className="temp_wrapper">{props.cur_lang.description.evening} {convertTemp(d.temp.eve)}°{temp_unit}</span> {props.cur_lang.feels_like} {convertTemp(d.feels_like.eve)}°{temp_unit}</p>;
      let uvi = convertUVI(d.uvi);
      let sunchart = <div className="sunchart_wrapper_forecast"><GetSunChart sunrise={sunrise} sunset={sunset} day_dur={day_dur} cur_lang={props.cur_lang}/></div>;
      return <div key={i}><h3>{date}</h3>
        <div className="single_forecast_wrapper"><div className="day_sector">
          {morn}{day}{eve}{night}
        </div><div>
          <p><img src={getImage(d.weather[0].icon)} alt={props.cur_lang.weathercodes[d.weather[0].id]}/></p>
          <p className="forecast_weather_desc">{props.cur_lang.weathercodes[d.weather[0].id]}</p>
        </div><div className="dayly_forecast_wind_wrapper">
          <img src={wind_icon} className={`wind_dir_${getWindDir(d.wind_deg)}`} alt={props.cur_lang.wind.direction[getWindDir(d.wind_deg)]}/>
          <p className="forecast_wind_desc"><span>{props.cur_lang.wind.direction[getWindDir(d.wind_deg)]}</span> {Math.round(d.wind_speed)} {wind_speed_units}</p>
        </div>
        <div className="info_wrapper">
          <div><div className="pressure_img"></div><div>{d.pressure} {props.cur_lang.pressure}</div><div className="hum_img"></div><div>{d.humidity}%</div></div>
          <div><div className="cloud_img"></div><div>{props.cur_lang.clouds} {d.clouds}%</div></div>
          <div><div className="precip_img"></div><div>{props.cur_lang.description.precip_name} {formatPrecip(d.rain, d.weather[0].id)} {props.cur_lang.description.precip_unit}</div></div>
          <div>{props.cur_lang.uvi.name} {uvi[0]} - {props.cur_lang.uvi.val[uvi[1]]}</div>
        </div><div>
          {sunchart}
        </div></div>
      </div>;
  });
  return result;
}

class WeatherScreen extends React.Component {
  constructor(props) {
  super(props);
  this.onChangeLang = this.onChangeLang.bind(this);
  this.onChangeUnits = this.onChangeUnits.bind(this);
  this.onHModeClick = this.onHModeClick.bind(this);
  this.onDModeClick = this.onDModeClick.bind(this);
  this.onChangeSearchField = this.onChangeSearchField.bind(this);
  this.onSearchResultClick = this.onSearchResultClick.bind(this);
  this.onClaerSearchClick = this.onClaerSearchClick.bind(this);
  this.onAddToFavouriteClick = this.onAddToFavouriteClick.bind(this);
  this.onDelFromFavourites = this.onDelFromFavourites.bind(this);
  this.onShowSidebarClick = this.onShowSidebarClick.bind(this);
  this.onCloseSidebarClick = this.onCloseSidebarClick.bind(this);
  this.state = {active_mode: "h", search_result: null, search_val: '', sidebar: false, add_to_favourites: false};
  }
  componentDidUpdate(){
    let add_to_favourites = this.state.add_to_favourites;
    if (add_to_favourites){
      setTimeout(() => {
      this.setState({add_to_favourites: false});
    }, 3000);
    }
  }
  onChangeLang(l){
    this.props.onChangeLang(l.target.value);
  }
  onChangeUnits(u){
    this.props.onChangeUnits(u.target.value);
  }
  onHModeClick(){
    if (this.state.active_mode !== "h") this.setState({active_mode: "h"});
  }
  onDModeClick(){
    if (this.state.active_mode !== "d") this.setState({active_mode: "d"});
  }
  onChangeSearchField(x){
    let name = x.target.value;
    this.setState({search_result: null, search_val: name});
    if (name.length > 2) backendRequest({mode: 2, name: name, lang: this.props.lang}).then((r) => {
      if (r.response === 200) this.setState({search_result: r.list});
    });
  }
  onSearchResultClick(x){
    let new_city = {name: x.target.dataset.name, lat: x.target.dataset.lat, lon: x.target.dataset.lon};
    this.props.onChangeCity(new_city);
  }
  onClaerSearchClick(){
    this.setState({search_result: null, search_val: ''});
  }
  onAddToFavouriteClick(){
    this.props.onAddToFavourite();
    this.setState({add_to_favourites: true});
  }
  onDelFromFavourites(x){
    this.props.onDelFromFavourite(x.target.dataset.id);
  }
  onShowSidebarClick(){
    let mode = this.state.sidebar;
    if (mode) this.setState({sidebar: false})
    else this.setState({sidebar: true});
  }
  onCloseSidebarClick(){
    if (this.state.sidebar) this.setState({sidebar: false});
  }
 
  render() {
    let lang = this.props.lang;
    let weather = this.props.weather;
    let city = this.props.city;
    let langpack = this.props.langpack;
    let units = this.props.units;
    let favourites = this.props.favourites;
    let lang_option = JSON.stringify({code: lang, reqlang: this.props.reqlang});
    let options = langpack.map((el, i) => {
      let val = JSON.stringify({code: el.code, reqlang: el.reqlang});
      return <option key={i} value={val}>{el.name}</option>;
    });
    const is_day_now = getTimeOfDay(weather);//Возвращает время суток: светлое или тёмное
    let main_background_class = "main_background";
    let switch_active_class = "switch_active";
    let switch_off_class = "switch_off";
    let select_class = "select_dark";
    if (is_day_now) {//Если сейчас день, включаем светлую тему
      main_background_class = "main_background_light";
      switch_active_class = "switch_active_light";
      switch_off_class = "switch_off_light";
      select_class = "select_light";
    };
    let cur_lang = langpack.find(l => l.code === lang);
    let current = <GetCurrentWeather city={city} weather={weather} cur_lang={cur_lang} units={units}/>;//Текущая погода
    let cur_wind = <GetCurrentWind weather={weather} cur_lang={cur_lang} units={units} is_day_now={is_day_now}/>;//Текущее направление, скорость ветра
    let circle_charts = <GetCircleCharts weather={weather} cur_lang={cur_lang}/>;//Круговая инфографика 
    let sun_chart = <GetCurrentSunChart weather={weather} cur_lang={cur_lang}/>;//Инфографика восход/закат
    let hourly = <GetHourlyForecast forecast={weather} cur_lang={cur_lang} units={units}/>;//Почасовой прогноз
    let daily = <GetDailyForecast forecast={weather} cur_lang={cur_lang} units={units}/>;//Прогноз по дням
    let chart = <GetChart data={weather} cur_lang={cur_lang} units={units} is_day_now={is_day_now}/>;//Инфографика t, p, precip на 8 дней
    let forecast = <div>{hourly}</div>;
    let switch_buttons = <div><button onClick={this.onHModeClick} className={switch_active_class}>{cur_lang.hourlyfrc}</button><button onClick={this.onDModeClick}  className={switch_off_class}>{cur_lang.dailyfrc}</button></div>;
    if (this.state.active_mode === "d") {
      forecast = <div className="daily_forecast_wrapper">{daily}</div>;
      switch_buttons = <div><button onClick={this.onHModeClick} className={switch_off_class}>{cur_lang.hourlyfrc}</button><button onClick={this.onDModeClick}  className={switch_active_class}>{cur_lang.dailyfrc}</button></div>;
    };
    let search_result = null;
    if (this.state.search_result){
      let list = this.state.search_result.sort(function (a, b) {
        if (a.name[lang] > b.name[lang]) {
          return 1;
        }
        if (a.name[lang] < b.name[lang]) {
          return -1;
        }
        return 0;
      });
      list = list.map((el, i) => {
        let row = el.name[lang];
        if (el.region[lang]) row = `${row}, ${el.region[lang]}`;
        return <li key={i} onClick={this.onSearchResultClick} data-lat={el.lat} data-lon={el.lon} data-name={el.name[lang]}>{row}</li>;
      });
      search_result = <div className="search_result"><ul>{list}</ul></div>;
    };
    let favourites_list = null;
    if (favourites && favourites.length > 0) {
      favourites = favourites.sort(function (a, b) {
        if (a.city > b.city) {
          return 1;
        }
        if (a.city < b.city) {
          return -1;
        }
        return 0;
      });
      favourites_list = favourites.map((el, i) => {
        return <div key={i}><span onClick={this.onSearchResultClick} data-lat={el.lat} data-lon={el.lon} data-name={el.city}>{el.city}</span><button onClick={this.onDelFromFavourites} data-id={i} className="del_button"></button></div>;
      });
      favourites_list = <div className="favourites_list"><h4>{cur_lang.description.fav}</h4>{favourites_list}</div>;
    }
    else favourites_list = <div className="favourites_list"><h4>{cur_lang.description.fav}</h4><p>{cur_lang.description.empty_list}</p></div>;
    let sidebar_class = "sidebar_off";
    if (this.state.sidebar) sidebar_class = "sidebar_off sidebar_on";
    let background = <GetBackground weather={weather}/>;//Анимированный фон
    let add_to_fav_message = null;
    if (this.state.add_to_favourites && this.props.addtofav === 1) add_to_fav_message = <div className="add_to_favourites_message">{cur_lang.addtofav}</div>;
    else if (this.state.add_to_favourites && this.props.addtofav === 2) add_to_fav_message = <div className="add_to_favourites_message">{cur_lang.alreadyinfav}</div>;
    document.title = `${city} - ${cur_lang.title}`;//Заголовок страницы
    let year = new Date();
    year = year.getFullYear();
    return(
      <div className={main_background_class}>
          <div className="main_wrapper" onClick={this.onCloseSidebarClick}>
            <nav className="nav_buttons">
                <button onClick={this.onShowSidebarClick}></button>
                <button onClick={this.onAddToFavouriteClick}></button>
            </nav>
            <div className="current">
              <div className="current_content">
                {add_to_fav_message} 
                <nav className="nav_buttons_mobile">
                  <button onClick={this.onShowSidebarClick}></button>
                  <button onClick={this.onAddToFavouriteClick}></button>
                </nav>
                {current}
              </div>
              <div className="weather_background">
              {background}
              </div>
            </div>
            <div className="wind_block">
              <h3>{cur_lang.wind.desc.name}</h3>
              {cur_wind}
              {sun_chart}
            </div>
            {circle_charts}
            <div className="chart">
              {chart}
            </div>
            <div className="switch">
              {switch_buttons}
            </div>
            <div className="forecast">
              {forecast}
            </div>
            <div className="footer_block"><p>© Hmara.by - {year}</p></div>
          </div>
          <aside className={sidebar_class}>
            <div className="sidebar_buttons">
            <div><select onChange={this.onChangeLang} className={select_class} value={lang_option}>
              {options}
            </select>
            <select onChange={this.onChangeUnits} className={select_class} value={units}>
              <option value="metric">°C</option>
              <option value="imperial">°F</option>
            </select>
            </div><div>
            <button className="close_button" onClick={this.onShowSidebarClick}></button>
            </div></div>
            <div className="searchstring_wrapper"><input onChange={this.onChangeSearchField} placeholder={cur_lang.description.searchfield} value={this.state.search_val}/><button className="close_button_2" onClick={this.onClaerSearchClick}></button></div>
              {search_result}
            <div>{favourites_list}</div>
          </aside>
      </div>
    ); 
    }
  }

class App extends React.Component {
  constructor(props) {
  super(props);
  this.onChangeLang = this.onChangeLang.bind(this);
  this.onChangeUnits = this.onChangeUnits.bind(this);
  this.onChangeCity = this.onChangeCity.bind(this);
  this.onAddToFavourite = this.onAddToFavourite.bind(this);
  this.onDelFromFavourite = this.onDelFromFavourite.bind(this);
  this.state = {weather: null, lat: 53.9, lon: 27.57, city: null, lang: 'ru', reqlang: 'ru', units: 'metric', finishload: false, favourites: null, addtofav: 0};
  /*Finishload управляет экраном загрузки. Значение, равное true, означает выполнение всех асинхронных запросов - будет отрисован основной контент.*/
  }
  componentDidMount(){
    let reqlang = this.state.reqlang;
    let lang = this.state.lang;
    let units = this.state.units;
    let lat = this.state.lat;
    let lon = this.state.lon;
    let settings = localStorage.getItem('settings');//Определяем, есть ли объекты localstorage и читаем из них данные
    if (settings) {
      settings = JSON.parse(settings);
      if (settings.reqlang && settings.reqlang != reqlang) {
        this.setState({reqlang: settings.reqlang});
        reqlang = settings.reqlang;
      };
      if (settings.lang && settings.lang != lang) {
        this.setState({lang: settings.lang});
        lang = settings.lang;
      };
      if (settings.units && settings.units != units) {
        this.setState({units: settings.units});
        units = settings.units;
      };
    };
    let favourites = localStorage.getItem('favourites');
    if (favourites){
      favourites = JSON.parse(favourites);
      this.setState({favourites: favourites});
    };
    let storage = localStorage.getItem('storage');
    if (storage) {
      const now = Date.now();
      storage = JSON.parse(storage);
      let create_time = storage.create_time;
      if ((now - create_time) > 300000) {
        navigator.geolocation.getCurrentPosition(position => {
          let navlat = Math.round(position.coords.latitude * 1000) / 1000;
          let navlon = Math.round(position.coords.longitude * 1000) / 1000;
          backendRequest({mode: 3, lat: navlat, lon: navlon, units: units, lang: reqlang}).then((w) => {
              if (w && w.response === 200) {
                this.setState({weather: w.onecall, city: w.name, finishload: true, lat: navlat, lon: navlon});
              }
              else {
                this.setState({finishload: true, lat: navlat, lon: navlon});
              };
            });
          }, error => {
          backendRequest({mode: 3, lat: lat, lon: lon, units: units, lang: reqlang}).then((w) => {
              if (w && w.response === 200) {
                this.setState({weather: w.onecall, city: w.name, finishload: true});
              }
              else {
                this.setState({finishload: true});
              };
            });
        });            
      }
      else {
        if (storage.lat === lat && storage.lon === lon) {
          this.setState({weather: storage.weather, lat: storage.lat, lon: storage.lon, city: storage.city, finishload: true});
        }
        else {
          navigator.geolocation.getCurrentPosition(position => {
            let navlat = Math.round(position.coords.latitude * 1000) / 1000;
            let navlon = Math.round(position.coords.longitude * 1000) / 1000;
            backendRequest({mode: 3, lat: navlat, lon: navlon, units: units, lang: reqlang}).then((w) => {
              if (w && w.response === 200) {                
                this.setState({weather: w.onecall, city: w.name, finishload: true, lat: navlat, lon: navlon});
              }
              else {
                this.setState({finishload: true, lat: navlat, lon: navlon});
              };
            });
            }, error => {
            backendRequest({mode: 3, lat: lat, lon: lon, units: units, lang: reqlang}).then((w) => {
              if (w && w.response === 200) {
                this.setState({weather: w.onecall, city: w.name, finishload: true});
              }
              else {
                this.setState({finishload: true});
              };
            });
          });
        };
      };
    }
    else {
      navigator.geolocation.getCurrentPosition(position => {
        let navlat = Math.round(position.coords.latitude * 1000) / 1000;
        let navlon = Math.round(position.coords.longitude * 1000) / 1000;
        backendRequest({mode: 3, lat: navlat, lon: navlon, units: units, lang: reqlang}).then((w) => {
            if (w && w.response === 200) {                
              this.setState({weather: w.onecall, city: w.name, finishload: true, lat: navlat, lon: navlon});
            }
            else {
              this.setState({finishload: true, lat: navlat, lon: navlon});
            };
        });
      }, error => {
          backendRequest({mode: 3, lat: lat, lon: lon, units: units, lang: reqlang}).then((w) => {
              if (w && w.response === 200) {
                this.setState({weather: w.onecall, city: w.name, finishload: true});
              }
              else {
                this.setState({finishload: true});
              };
          });
      });
    };
  };

  componentDidUpdate(){
    if (this.state.weather && this.state.city && this.state.lat && this.state.lon) {
      const cur_time = Date.now();
      const storage = JSON.stringify({create_time: cur_time, lat: this.state.lat, lon: this.state.lon, city: this.state.city, weather: this.state.weather});
      localStorage.setItem('storage', storage);
    }
  }

  onChangeLang(l){
    let lang = JSON.parse(l);
    this.setState({lang: lang.code, reqlang: lang.reqlang, finishload: false});
    let settings = localStorage.getItem('settings');
    if (settings) {
      settings = JSON.parse(settings);
      settings.lang = lang.code;
      settings.reqlang = lang.reqlang;
      settings = JSON.stringify(settings);
      localStorage.setItem('settings', settings);
    }
    else localStorage.setItem('settings', JSON.stringify({lang: lang.code, reqlang: lang.reqlang}));
    const lat = this.state.lat;
    const lon = this.state.lon;
    const units = this.state.units;
    backendRequest({mode: 3, lat: lat, lon: lon, units: units, lang: lang.reqlang}).then((w) => {
              if (w.response === 200) {
                this.setState({weather: w.onecall, city: w.name, finishload: true});
              }
              else {
                this.setState({finishload: true});
              }
    });
  }
  onChangeUnits(u){
    this.setState({units: u, finishload: false});
    let settings = localStorage.getItem('settings');
    if (settings) {
      settings = JSON.parse(settings);
      settings.units = u;
      settings = JSON.stringify(settings);
      localStorage.setItem('settings', settings);
    }
    else localStorage.setItem('settings', JSON.stringify({units: u}));
    const reqlang = this.state.reqlang;
    const lat = this.state.lat;
    const lon = this.state.lon;
    const units = u;
    backendRequest({mode: 4, lat: lat, lon: lon, units: units, lang: reqlang}).then((w) => {
              if (w.response === 200) {
                this.setState({weather: w.onecall, finishload: true});
              }
              else {
                this.setState({finishload: true});
              }
    });
  }
  onChangeCity(city){
    this.setState({finishload: false});
    const reqlang = this.state.reqlang;
    const lat = city.lat;
    const lon = city.lon;
    const units = this.state.units;
    backendRequest({mode: 4, lat: lat, lon: lon, units: units, lang: reqlang}).then((w) => {
              if (w.response === 200) {
                this.setState({weather: w.onecall, city: city.name, lat: lat, lon: lon, finishload: true});
              }
              else {
                this.setState({finishload: true});
              }
    });
  }
  onAddToFavourite(){//Добавляем текущий город в избранное
    let favourites = localStorage.getItem('favourites');//Определяем, есть ли объекты localstorage и читаем из них данные
    if (favourites) {
       favourites = JSON.parse(favourites);
       let result = favourites.findIndex((el, i, arr) => el.lat === this.state.lat && el.lon === this.state.lon || el.city === this.state.city);
       if (result < 0) {
         favourites.push({city: this.state.city, lat: this.state.lat, lon: this.state.lon});
         localStorage.setItem('favourites', JSON.stringify(favourites));
         this.setState({favourites: favourites, addtofav: 1});
       }
       else this.setState({addtofav: 2});
    }
    else {
      favourites = [{city: this.state.city, lat: this.state.lat, lon: this.state.lon}];
      this.setState({favourites: favourites, addtofav: 1});
      localStorage.setItem('favourites', JSON.stringify(favourites));
    };
  }
  onDelFromFavourite(i){//Удаляет город из избранного по индексу i
    let favourites = this.state.favourites;
    favourites.splice(i, 1);
    this.setState({favourites: favourites});
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }
    
  render() {
    let langpack = [{code: 'ru', reqlang: 'ru', name: 'Русский', feels_like: "ощущается как", clouds: "Облачность", wind: {units: {metric: "м/с", imperial: "миля/ч"}, direction: {N: "С", NE: "СВ", E: "В", SE: "ЮВ", S: "Ю", SW: "ЮЗ", W: "З", NW: "СЗ"}, 
                      desc: {name: "Ветер", bofortname: "Шкала Бофорта", points: "баллы", bofort: ["штиль", "тихий", "лёгкий", "слабый", "умеренный", "свежий", "сильный", "крепкий", "очень крепкий", "шторм", "сильный шторм", "жестокий шторм", "ураган"]}}, 
                      pressure: "гПа", date: {day: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"], day_short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                      month: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"], today: "Сегодня", tomorrow: "Завтра"}, 
                      uvi: {name: "УФ-индекс", val: {low: "низкий", mod: "средний", high: "высокий", vh: "очень высокий", ex: "экстримальный"}}, 
                      description: {day: "День", night: "Ночь", morning: "Утро", evening: "Вечер", precip_name: "Осадки", precip_unit: "мм", press_name: "Давление", hum: "Влажность", sunrise: "Восход", sunset: "Закат", searchfield: "Поиск", fav: "Избранное:", empty_list: "Список пуст", polar_d: "Полярный день", polar_n: "Полярная ночь"}, 
                      dailyfrc: "Краткий", hourlyfrc: "Подробный прогноз", addtofav: 'Добавлено в избранное', alreadyinfav: 'Уже в избранном', title: 'прогноз погоды на неделю',
                      weathercodes: {200: 'небольшой дождь, гроза', 201: 'дождь, гроза', 202: 'сильный дождь, гроза', 210: 'небольшая гроза', 211: 'гроза', 212: 'сильная гроза', 221: 'местами гроза', 230: 'слабая морось, гроза', 231: 'морось, гроза', 232: 'сильная морось, гроза',
                        300: 'небольшая морось', 301: 'морось', 302: 'сильная морось', 310: 'небольшой моросящий дождь', 311: 'моросящий дождь', 312: 'сильный моросящий дождь', 313: 'временами слабая морось', 314: 'временами морось', 321: 'сильная морось',
                        500: 'небольшой дождь', 501: 'дождь', 502: 'сильный дождь', 503: 'очень сильный дождь', 504: 'ливень', 511: 'ледяной дождь', 520: 'временами небольшой проливной дождь', 521: 'временами проливной дождь', 522: 'временами сильный проливной дождь', 531: 'местами проливной дождь',
                        600: 'небольшой снег', 601: 'снег', 602: 'сильный снег', 611: 'мокрый снег', 612: 'временами мокрый снег', 613: 'временами сильный мокрый снег', 615: 'небольшой дождь со снегом', 616: 'дождь со снегом', 620: 'временами небольшой снег', 621: 'временами снег', 622: 'временами сильный снег',
                        701: 'дымка', 711: 'слабый туман', 721: 'туман', 731: 'пыльные вихри', 741: 'сильный туман', 751: 'песчаная буря', 761: 'пыльная буря', 762: 'вулканический пепел', 771: 'шквалы', 781: 'торнадо',
                        800: 'ясно', 801: 'небольшая облачность', 802: 'переменная облачность', 803: 'облачно с прояснениями', 804: 'пасмурно'}}, 
                    {code: 'by', reqlang: 'en', name: 'Беларуская', feels_like: "адчуваецца як", clouds: "Воблачнасць", wind: {units: {metric: "м/с", imperial: "миля/г"}, direction: {N: "Пн", NE: "Пн-Ус", E: "Ус", SE: "Пд-Ус", S: "Пд", SW: "Пд-Зх", W: "Зх", NW: "Пн-Зх"}, 
                      desc: {name: "Вецер", bofortname: "Шкала Бофорта", points: "балы", bofort: ["штыль", "ціхі", "лёгкі", "слабы", "умераны", "свежы", "моцны", "крэпкі", "вельмі крэпкі", "шторм", "моцны шторм", "жорсткі шторм", "ураган"]}}, 
                      pressure: "гПа", date: {day: ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота"], day_short: ["Нд", "Пн", "Ат", "Ср", "Чц", "Пт", "Сб"], 
                      month: ["студзеня", "лютага", "сакавіка", "красавіка", "мая", "чэрвеня", "ліпеня", "жніўня", "верасня", "кастрычніка", "лістапада", "снежня"], today: "Сёння", tomorrow: "Заўтра"}, 
                      uvi: {name: "УФ-індэкс", val: {low: "нізкі", mod: "сярэдні", high: "высокі", vh: "вельмі высокі", ex: "экстрэмальны"}},
                      description: {day: "Дзень", night: "Ноч", morning: "Раніца", evening: "Вечар", precip_name: "Ападкі", precip_unit: "мм",  press_name: "Ціск", hum: "Вільготнасць", sunrise: "Узыход", sunset: "Закат", searchfield: "Пошук", fav: "Абранае:", empty_list: "Спіс пусты", polar_d: "Палярны дзень", polar_n: "Палярная ноч"}, 
                      dailyfrc: "Кароткі", hourlyfrc: "Падрабязны прагноз", addtofav: 'Дададзена у абранае', alreadyinfav: 'Ужо ў абраным', title: "прагноз надвор'я на тыдзень",
                      weathercodes: {200: 'невялікі дождж, навальніца', 201: 'дождж, навальніца', 202: 'моцны дождж, навальніца', 210: 'невялікая навальніца', 211: 'навальніца', 212: 'моцная навальніца', 221: 'месцамі навальніца', 230: 'слабая морось, навальніца', 231: 'морось, навальніца', 232: 'моцная морось, навальніца',
                        300: 'невялікая морось', 301: 'морось', 302: 'моцная морось', 310: 'невялікі дробны дождж', 311: 'дробны дождж', 312: 'моцны дробны дождж', 313: 'часам невялікі дробны дождж', 314: 'часам дробны дождж', 321: 'моцны дробны дождж',
                        500: 'невялікі дождж', 501: 'дождж', 502: 'моцны дождж', 503: 'вельмі моцны дождж', 504: 'лівень', 511: 'ледзяны дождж', 520: 'часам невялікі праліўны дождж', 521: 'часам праліўны дождж', 522: 'часам моцны праліўны дождж', 531: 'месцамі праліўны дождж',
                        600: 'невялікі снег', 601: 'снег', 602: 'моцны снег', 611: 'мокры снег', 612: 'часам мокры снег', 613: 'часам моцны мокры снег', 615: 'невялікі дождж са снегам', 616: 'дождж са снегам', 620: 'часам невялікі снег', 621: 'часам снег', 622: 'часам моцны снег',
                        701: 'смуга', 711: 'слабы туман', 721: 'туман', 731: 'пыльныя віхуры', 741: 'моцны туман', 751: 'пясчаная бура', 761: 'пыльная бура', 762: 'вулканічны попел', 771: 'шквал', 781: 'тарнада',
                        800: 'ясна', 801: 'невялікая воблачнасць', 802: 'пераменная воблачнасць', 803: 'воблачна з праясненнямі', 804: 'пахмурна'}},
                    {code: 'ua', reqlang: 'ua', name: 'Українська', feels_like: "відчувається як", clouds: "Хмарність", wind: {units: {metric: "м/с", imperial: "миля/г"}, direction: {N: "Пн", NE: "Пн-Сх", E: "Сх", SE: "Пд-Сх", S: "Пд", SW: "Пд-Зх", W: "Зх", NW: "Пн-Зх"}, 
                      desc: {name: "Вітер", bofortname: "Шкала Бофорта", points: "бали", bofort: ["штиль", "тихий", "легкий", "слабкий", "помірний", "свіжий", "сильний", "міцний", "дуже міцний", "шторм", "сильний шторм", "жорстокий шторм", "ураган"]}}, 
                      pressure: "гПа", date: {day: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"], day_short: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"], 
                      month: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"], today: "Сьогодні", tomorrow: "Завтра"}, 
                      uvi: {name: "УФ-індекс", val: {low: "низький", mod: "середній", high: "високий", vh: "дуже високий", ex: "екстримальний"}},
                      description: {day: "День", night: "Ніч", morning: "Ранок", evening: "Вечір", precip_name: "Опади", precip_unit: "мм",  press_name: "Тиск", hum: "Вологість", sunrise: "Схід", sunset: "Захід", searchfield: "Пошук", fav: "Обрані:", empty_list: "Список порожній", polar_d: "Полярний день", polar_n: "Полярна ніч"}, 
                      dailyfrc: "Короткий", hourlyfrc: "Докладний прогноз", addtofav: 'Додано в обране', alreadyinfav: 'Вже в обраному', title: 'прогноз погоди на тиждень',
                      weathercodes: {200: 'невеликий дощ, гроза', 201: 'дощ, гроза', 202: 'сильний дощ, гроза', 210: 'невелика гроза', 211: 'гроза', 212: 'сильна гроза', 221: 'місцями гроза', 230: 'слабка мряка, гроза', 231: 'мряка, гроза', 232: 'сильна мряка, гроза',
                        300: 'невелика мряка', 301: 'мряка', 302: 'сильна мряка', 310: 'невеликий дрібний дощ', 311: 'дрібний дощ', 312: 'сильний дрібний дощ', 313: 'часом слабка мряка', 314: 'часом мряка', 321: 'дуже сильна мряка',
                        500: 'невеликий дощ', 501: 'дощ', 502: 'сильний дощ', 503: 'дуже сильний дощ', 504: 'злива', 511: 'крижаний дощ', 520: 'часом невеликий проливний дощ', 521: 'часом проливний дощ', 522: 'часом сильний проливний дощ', 531: 'місцями проливний дощ',
                        600: 'невеликий сніг', 601: 'сніг', 602: 'сильний сніг', 611: 'мокрий сніг', 612: 'часом мокрий сніг', 613: 'часом сильний мокрий сніг', 615: 'невеликий дощ зі снігом', 616: 'дощ зі снігом', 620: 'часом невеликий сніг', 621: 'часом сніг', 622: 'часом сильний сніг',
                        701: 'серпанок', 711: 'слабкий туман', 721: 'туман', 731: 'пилові вихори', 741: 'сильний туман', 751: 'піщана буря', 761: 'пилова буря', 762: 'вулканічний попіл', 771: 'шквали', 781: 'торнадо',
                        800: 'ясно', 801: 'невелика хмарність', 802: 'мінлива хмарність', 803: 'хмарно з проясненнями', 804: 'хмарно'}},
                    {code: 'en', reqlang: 'en', name: 'English', feels_like: "feels like", clouds: "Cloudiness", wind: {units: {metric: "m/s", imperial: "mph"}, direction: {N: "N", NE: "NE", E: "E", SE: "SE", S: "S", SW: "SW", W: "W", NW: "NW"}, 
                      desc: {name: "Wind", bofortname: "Beaufort scale", points: "points", bofort: ["calm", "light air", "light breeze", "gentle breeze", "moderate breeze", "fresh breeze", "strong breeze", "high wind", "gale", "strong gale", "storm", "violent storm", "hurricane force"]}}, 
                      pressure: "hPa", date: {day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], day_short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], 
                      month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], today: "Today", tomorrow: "Tomorrow"}, 
                      uvi: {name: "UV index", val: {low: "low", mod: "moderate", high: "high", vh: "very high", ex: "extreme"}}, 
                      description: {day: "Day", night: "Night", morning: "Morning", evening: "Evening", precip_name: "Precipitation", precip_unit: "mm", press_name: "Pressure", hum: "Humidity", sunrise: "Sunrise", sunset: "Sunset", searchfield: "Search", fav: "Favourites:", empty_list: "The list is empty", polar_d: "Polar day", polar_n: "Polar night"}, 
                      dailyfrc: "Short", hourlyfrc: "Detailed forecast", addtofav: 'Added to favorites', alreadyinfav: 'Already in favorites',  title: 'weather forecast for a week',
                      weathercodes: {200: 'thunderstorm with light rain', 201: 'thunderstorm with rain', 202: 'thunderstorm with heavy rain', 210: 'light thunderstorm', 211: 'thunderstorm', 212: 'heavy thunderstorm', 221: 'ragged thunderstorm', 230: 'thunderstorm with light drizzle', 231: 'thunderstorm with drizzle', 232: 'thunderstorm with heavy drizzle',
                        300: 'light intensity drizzle', 301: 'drizzle', 302: 'heavy intensity drizzle', 310: 'light intensity drizzle rain', 311: 'drizzle rain', 312: 'heavy intensity drizzle rain', 313: 'shower rain and drizzle', 314: 'heavy shower rain and drizzle', 321: 'shower drizzle',
                        500: 'light rain', 501: 'moderate rain', 502: 'heavy intensity rain', 503: 'very heavy rain', 504: 'extreme rain', 511: 'freezing rain', 520: 'light intensity shower rain', 521: 'shower rain', 522: 'heavy intensity shower rain', 531: 'ragged shower rain',
                        600: 'light snow', 601: 'Snow', 602: 'Heavy snow', 611: 'Sleet', 612: 'Light shower sleet', 613: 'Shower sleet', 615: 'Light rain and snow', 616: 'Rain and snow', 620: 'Light shower snow', 621: 'Shower snow', 622: 'Heavy shower snow',
                        701: 'mist', 711: 'Smoke', 721: 'Haze', 731: 'dust whirls', 741: 'fog', 751: 'sand', 761: 'dust', 762: 'volcanic ash', 771: 'squalls', 781: 'tornado',
                        800: 'clear sky', 801: 'few clouds', 802: 'scattered clouds', 803: 'broken clouds', 804: 'overcast clouds'}}];
    const finishload = this.state.finishload;
    let screen = <div className="loadermainwrapper"><div className="loaderwrapper">
      <div></div><div></div><div></div>
      <div></div><div></div><div></div>
      <div></div><div></div><div></div>
    </div></div>;
    let city = this.state.city;
    let weather = this.state.weather;
    let lang = this.state.lang;
    let reqlang = this.state.reqlang;
    let units = this.state.units;
    let favourites = this.state.favourites;
    let addtofav = this.state.addtofav;
    if (finishload) screen = <WeatherScreen city={city} weather={weather} lang={lang} reqlang={reqlang} langpack={langpack} units={units} favourites={favourites} addtofav={addtofav} onChangeLang={this.onChangeLang} onChangeUnits={this.onChangeUnits} onChangeCity={this.onChangeCity} onAddToFavourite={this.onAddToFavourite} onDelFromFavourite={this.onDelFromFavourite}/>;
    return(
      <div>
        {screen}
      </div>
    ); 
    }
  }
    
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
