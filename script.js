let url = 'http://api.weatherunlocked.com/api/forecast/42.87,74.59?app_id=999207aa&app_key=1e1afdbf0250f7f24b35028b7a0b77cb'

function dated(date){
  if(date == 1 || date == 8){
    return 'Понедельник'
  }else if(date == 2 || date == 9){
    return 'Вторник'
  }
  else if(date == 3 || date == 10){
    return 'Среда'
  }
  else if(date == 4 || date == 11){
    return 'Четверг'
  }
  else if(date == 5 || date == 12){
    return 'Пятница'
  }
  else if(date == 6 || date == 13){
    return 'Суббота'
  }
  else if(date == 0 || date == 7){
    return 'Воскресенье'
  }
}


fetch(url)
   .then(resp =>{
     return resp.json()
   })
   .then(data =>{
     document.querySelector('.dateToDay').textContent = data.Days[0].date
     document.querySelector('.city').textContent = 'Бишкек'
     document.querySelector('.dayToDay').textContent = dated(new Date().getDay())
     document.querySelector('.wind p').textContent = 'Скорость ветра' + data.Days[0].windspd_max_kmh + 'км/ч'
     document.querySelector('.fallout span').textContent = Math.floor((data.Days[0].humid_max_pct + data.Days[0].humid_min_pct)/2)+ '%'
     let iconSrc = data.Days[0].Timeframes[0].wx_icon
     document.querySelector('.icon img').setAttribute('src',`set/${iconSrc.substring(0,iconSrc.length - 3)}png`)
     document.querySelector('.icon p').textContent = data.Days[0].Timeframes[0].wx_desc
     document.querySelector('.maxTemp').textContent = data.Days[0].temp_max_c
     document.querySelector('.minTemp').textContent = data.Days[0].temp_min_c
     document.querySelector('.temp p').innerHTML = Math.floor((data.Days[0].temp_max_c + data.Days[0].temp_min_c)/2)+ ' &deg'
     for(let i=1;i<6;i++){
       let pimax = data.Days[i].temp_max_c
       let pimin = data.Days[i].temp_min_c
       let averagepi = `<p>${Math.floor((pimax + pimin)/2)}</p>`
       let srcic = data.Days[i].Timeframes[0].wx_icon
       let imgx = `<img src="set/${srcic.substring(0,srcic.length - 3)}png">`
      document.querySelector('.week').insertAdjacentHTML('beforeend',`<div class="daysOf">${dated(new Date().getDay()+ i)}${imgx}${averagepi}</div>`)
      console.log(dated(5+i))
     }
     console.log(data)
     console.log(iconSrc)
   })