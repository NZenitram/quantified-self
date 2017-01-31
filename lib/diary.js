var Diary = function(date, breakfast = [], lunch = [], dinner = [], snack = [], exercise = []){
  this.date = date;
  this.breakfast = breakfast;
  this.lunch = lunch;
  this.dinner = dinner;
  this.snack = snack;
  this.exercise = exercise;
}

function all(){
  var currentDiary = localStorage.getItem('diaries');
  if(currentDiary === null){currentDiary = '[]';}
  return JSON.parse(currentDiary)
}

function find(date){
  var currentDiaries = all();
  for (var i = 0; i < currentDiaries.length; i++) {
    if(currentDiaries[i]['date'] === date){
      return currentDiaries[i]
    }
  }
}

function dateExists(diaries, date){
  for (var i = 0; i < diaries.length; i++) {
    if(diaries[i]['date'] === date){
      return true;
    } else {
      return false;
    }
  }
}

Diary.findOrCreate = function(date){
  var currentDiaries = all();
  if(dateExists(currentDiaries, date)){
    var diary = find(date);
    return diary;
  } else {
    var diary = new Diary(date);
    diary.store();
    return diary;
  }
}

Diary.prototype.store = function(){
  var currentDiaries = all();
  currentDiaries.push({date: this.date, breakfast: this.breakfast, lunch: this.lunch, dinner: this.dinner, snack: this.snack, exercise: this.exercise});
  localStorage.setItem('diaries', JSON.stringify(currentDiaries));
}

module.exports = Diary;