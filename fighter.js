//Изолируем игру
function game() {

    let gameEnd = false;

    // Создаём класс, которому передаём параметры:
    // string name, number power, number health
    class Fighter {
        // power по умолчанию: рандом от 1 до 10
        constructor(name = "Fighter-XX", power = Math.floor((Math.random() * 10) + 1), health = 1000) {
            this.name = name,
            this.power = power,
            this.health = health
        }
        // Наносим урон этой сущности
        setDamage(damage) {
            this.health -= damage;
            console.log(`${this.name}'s health: ${this.health}`);
        }
        // Эта сущность наносит урон по enemy
        hit(enemy, point = 5) {
            let damage = (point * this.power)
            // Проверяем, не закончена ли игра, и тогда бьём по врагу
            if (!gameEnd) {
                enemy.setDamage(damage)
            }
            // Сразу после удара проверяем жизни врага, и опционально выводим сообщение о победе
            if (enemy.health <= 0) {
                console.log(`%c ${this.name} won!`, 'color: #000; background-color: #fff; font-weight: bold')
                gameEnd = true;
            }
        }
    };

    // Создаём класс, который наследует Fighter (health и power - по умолчанию)
    class ImprovedFighter extends Fighter {
        // TODO Добавить шанс двойного удара при fight
        doubleHit(enemy, point = 5) {
            super.hit(enemy, point * 2)
        }
    }
    
    // Создаём бойца - сущность класса Fighter (health и power - по умолчанию)
    const fighter1 = new Fighter("Killer3000");
    // Создаём супербойца - сущность класса ImprovedFighter
    const fighter2 = new ImprovedFighter("Nagibator99");
    
    // Начало матча
    console.log(`%c In the red corner:`, 'background: #bb0000;');
    console.table({fighter1});
    console.log(`%c In the blue corner:`, 'background: #0000bb;');
    console.table({fighter2});
    console.log(`%c LET THE FIGHT BEGIN!!!`, 'color: #fb1;font-weight: bold');

    let fight = (fighter, improvedFighter, ...point) => {
        // Счётчик текущего раунда
        let round = 1;
        let hitsCount = point.length;
        let dmg = 0;
        do { 
            console.log(`█ Round ${round} █`)
            // Выбираем рандомную цифру урона из переданных, при инициализации битвы
            dmg = point[Math.floor(Math.random() * (hitsCount))];
            fighter.hit(improvedFighter, dmg);
            // Выбираем рандомную цифру урона из переданных, при инициализации битвы
            dmg = point[Math.floor(Math.random() * (hitsCount))];
            improvedFighter.hit(fighter, dmg);
            round++;
        } while (!gameEnd);
    }

    // Инициализируем битву между двумя бойцами и передаём туда желаемые цифры урона
    return fight(fighter1, fighter2, 35, 88, 100, 53);

};

//Запускаем игру
game();


//Misc
let startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', function(e){
    e.preventDefault();
    console.clear();
    game();
});