// Класс Персонаж
class Character {
  constructor(name, level, state = 'healthy') {
    this.name = name;
    this.level = level;
    this.state = state;
  }
}


// Класс Команда
class Team {
  constructor() {
    this.members = new Set();
  }

  // Метод добавления персонажа в команду
  add(character) {
    if (this.members.has(character)) {
      throw new Error('Персонаж уже добавлен в команду');
    }
    this.members.add(character);
  }

// Метод добавления нескольких персонажей в команду, исключая их дублирование и не генерируя ошибки
  addAll(...characters) {
    characters.forEach(character => {
      if (!this.members.has(character)) {
        this.members.add(character);
      }
    });
  }

// Конвертируем Set персонажей в массив
  toArray() {
    return Array.from(this.members);
  }
}

module.exports = { Team, Character };