const { Team, Character } = require('../team');

describe('класс Команда', () => {
  let team;
  let character1;
  let character2;
  let character3;

  beforeEach(() => {
    team = new Team();
    character1 = new Character('Warrior', 10);
    character2 = new Character('Mage', 8);
    character3 = new Character('Archer', 12);
  });

  test('создание пустой команды', () => {
    expect(team.members).toBeInstanceOf(Set);
    expect(team.members.size).toBe(0);
  });

  describe('метод add', () => {
    test('добавление персонажа в команду', () => {
      team.add(character1);
      expect(team.members.size).toBe(1);
      expect(team.members.has(character1)).toBe(true);
    });

    test('должна выдаваться ошибка при добавлении повторяющегося персонажа', () => {
      team.add(character1);
      expect(() => {
        team.add(character1);
      }).toThrow('Персонаж уже добавлен в команду');
    });

    test('ддолжно позволяться добавление разных персонажей ', () => {
      team.add(character1);
      team.add(character2);
      expect(team.members.size).toBe(2);
      expect(team.members.has(character1)).toBe(true);
      expect(team.members.has(character2)).toBe(true);
    });
  });

  describe('метод addAll', () => {
    test('должно добавляться несколько персонажей одновременно', () => {
      team.addAll(character1, character2, character3);
      expect(team.members.size).toBe(3);
      expect(team.members.has(character1)).toBe(true);
      expect(team.members.has(character2)).toBe(true);
      expect(team.members.has(character3)).toBe(true);
    });

    test('не должны добавляться дублирующиеся персонажи при использовании метода addAll', () => {
      team.add(character1);
      team.addAll(character1, character2, character3);
      expect(team.members.size).toBe(3);
    });

    test('должны обрабатываться пустые аргументы', () => {
      team.addAll();
      expect(team.members.size).toBe(0);
    });

    test('должно обрабатываться добавление одного и того же персонажа', () => {
      team.addAll(character1, character1, character1);
      expect(team.members.size).toBe(1);
    });
  });

  describe('метод toArray', () => {
    test('должен конвертировать пустой контейнер Set в пустой массив', () => {
      const result = team.toArray();
      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    test('должен конвертировать Set с персонажами в массив', () => {
      team.add(character1);
      team.add(character2);
      const result = team.toArray();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(result).toContain(character1);
      expect(result).toContain(character2);
    });
  });

  describe('тесты с операциями', () => {
    test('должен работать со смешанными операциями', () => {
      // Добавляем одного персонажа
      team.add(character1);
      expect(team.members.size).toBe(1);

      // Добавляем нескольких персонажей, включая дубликат
      team.addAll(character1, character2, character3);
      expect(team.members.size).toBe(3);

      // Пытаемся добавить дубликат - должна быть ошибка
      expect(() => team.add(character2)).toThrow();

      // Конвертируем в массив
      const array = team.toArray();
      expect(array.length).toBe(3);
      expect(array).toEqual([character1, character2, character3]);
    });

    test('должен обрабатывать персонажи с одинаковыми свойствами, но разными ссылками', () => {
      const character4 = new Character('Warrior', 10);
      const character5 = new Character('Warrior', 10);
      
      team.add(character4);
      team.add(character5);
      
      // Это разные объекты, поэтому оба должны добавиться
      expect(team.members.size).toBe(2);
    });
  });
});