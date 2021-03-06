var food = require('./food.js');
var exercise = require('./exercise.js')

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
    if(diaries[i]['date'] == date){
      return true;
    }
  }
  return false;
}

Diary.findOrCreate = function(date){
  var currentDiaries = all();
  if(dateExists(currentDiaries, date)){
    var diary = find(date);
    var thisDiary = new Diary(diary['date'], diary['breakfast'], diary['lunch'], diary['dinner'], diary['snack'], diary['exercise'])
    return thisDiary;
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

Diary.prototype.update = function(attribute, id){
  var currentDiaries = all();
  for (var i = 0; i < currentDiaries.length; i++) {
    if(currentDiaries[i]['date'] === this.date){
      currentDiaries[i][attribute].push(id);
    }
  }
  localStorage.setItem('diaries', JSON.stringify(currentDiaries));
}

Diary.prototype.getMeal = function(meal){
  var foods = [];
  for (var i = 0; i < this[meal].length; i++) {
    foods.push(food.find(this[meal][i]));
  }
  return foods;
}

Diary.prototype.getExercises = function(){
  var exercises = [];
  for (var i = 0; i < this.exercise.length; i++) {
    exercises.push(exercise.find(this.exercise[i]));
  }
  return exercises;
}

Diary.prototype.remove = function(meal, id){
  var currentDiaries = all();
  for (var i = 0; i < currentDiaries.length; i++) {
    if(currentDiaries[i]['date'] === this.date){
      for (var j = 0; j < currentDiaries[i][meal].length; j++){
        if(currentDiaries[i][meal][j] == id){
          currentDiaries[i][meal].splice(j,1);
        }
      }
    }
  }
  localStorage.setItem('diaries', JSON.stringify(currentDiaries));
}

module.exports = Diary;
