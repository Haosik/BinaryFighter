//Изолируем игру в модуль
function game() {

    let gameEnd = false;

    // Создаём класс, которому передаём параметры:
    // string name, number power, number health
    class Fighter {
        constructor(name = "Fighter-XX", power = Math.floor(Math.random() * 10 + 1), health = 100) {
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
            let damage = (point * this.power);
            if (!gameEnd) {
                enemy.setDamage(damage)
            }
            if (enemy.health <= 0) {
                console.log(`%c ${this.name} won!`, 'color: #000; background-color: #fff')
                gameEnd = true;
            }
        }
    };

    // Создаём класс, который наследует Fighter
    class ImprovedFighter extends Fighter {
        doubleHit(enemy, point = Math.floor(Math.random() * 10 + 1)) {
            super.hit(enemy, point * 2)
        }
    }

    
    // Создаём бойца - сущность класса Fighter
    const fighter1 = new Fighter("Killer3000");
    // Создаём супербойца - сущность класса ImprovedFighter
    const fighter2 = new ImprovedFighter("Nagibator99");
    

    console.log(`%c In the red corner:`, 'background: #bb0000;');
    console.table({fighter1});
    console.log(`%c In the blue corner:`, 'background: #0000bb;');
    console.table({fighter2});
    console.log(`%c LET THE FIGHT BEGIN!!!`, 'color: #fb1;');

    function fight(fighter, improvedFighter, ...point) {
        let dmg = point[0];
        do {
            fighter.hit(improvedFighter, dmg);
            improvedFighter.hit(fighter, dmg);
        } while (!gameEnd);
    }

    return fight(fighter1, fighter2, 1, 88, 100, 50);

};

//Запускаем игру
game();