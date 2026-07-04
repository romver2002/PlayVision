import russiaFlag from '@/assets/icons/russia.svg';
import zenitLogo from '@/assets/icons/zenit.svg';
import player1 from '@/assets/img/players/1.jpg';
import player2 from '@/assets/img/players/2.jpg';
import player3 from '@/assets/img/players/3.jpg';
import player4 from '@/assets/img/players/4.jpg';
import player5 from '@/assets/img/players/5.jpg';
import player6 from '@/assets/img/players/6.jpg';
import player7 from '@/assets/img/players/7.jpg';
import player8 from '@/assets/img/players/8.jpg';
import player9 from '@/assets/img/players/9.jpg';

// Не зависящие от языка данные карточек игроков.
// Переводимые поля (имя, фамилия, позиция) лежат в locales/*.json под ключом Players.<id>.
export const players = [
  { id: 1, stats: '15/54', age: 12, image: player1, teamLogo: zenitLogo, countryFlag: russiaFlag },
  { id: 2, stats: '33/54', age: 10, image: player2, teamLogo: zenitLogo, countryFlag: russiaFlag },
  { id: 3, stats: '7/54', age: 14, image: player3, teamLogo: zenitLogo, countryFlag: russiaFlag },
  { id: 4, stats: '22/54', age: 8, image: player4, teamLogo: zenitLogo, countryFlag: russiaFlag },
  { id: 5, stats: '41/54', age: 16, image: player5, teamLogo: zenitLogo, countryFlag: russiaFlag },
  { id: 6, stats: '9/54', age: 11, image: player6, teamLogo: zenitLogo, countryFlag: russiaFlag },
  { id: 7, stats: '18/54', age: 13, image: player7, teamLogo: zenitLogo, countryFlag: russiaFlag },
  { id: 8, stats: '27/54', age: 15, image: player8, teamLogo: zenitLogo, countryFlag: russiaFlag },
  { id: 9, stats: '5/54', age: 9, image: player9, teamLogo: zenitLogo, countryFlag: russiaFlag },
];
